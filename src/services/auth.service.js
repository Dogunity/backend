import { User, RefreshToken } from '../models';
import ApiError from '../utils/ApiError';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const apiError = new ApiError();

const passwordHashing = (password) => {
  return bcrypt.hash(password, Number.parseInt(process.env.SALTROUNDS));
};

export default {
  async register(email, password, nickname) {
    if (!email || !password || !nickname)
      throw apiError.setBadRequest('All fields required');

    const foundUser = await User.findOne({ where: { email } });
    if (foundUser) throw apiError.setBadRequest('Email already exists');

    const foundNickname = await User.findOne({ where: { nickname } });
    if (foundNickname) throw apiError.setBadRequest('Nickname already exists');

    const hashedPassword = await passwordHashing(password);

    await User.create({
      email,
      password: hashedPassword,
      nickname,
    });
  },

  async login(email, password) {
    if (!email || !password)
      throw apiError.setBadRequest('All fields required');

    const foundUser = await User.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
      raw: true,
    });
    if (!foundUser) throw apiError.setBadRequest('Email does not exist');

    const hashedPassword = await passwordHashing(password);
    const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
    if (!isCorrectPassword) throw apiError.setBadRequest('Wrong password');

    return foundUser;
  },

  async createAccessToken(id) {
    const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    });
    return accessToken;
  },

  async createRefreshToken(id) {
    const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '2 days',
    });
    return refreshToken;
  },

  async saveRefreshToken(id, refreshToken) {
    const existingToken = await RefreshToken.findOne({ where: { userId: id } });
    if (!existingToken) await RefreshToken.create({ userId: id, refreshToken });
    else await RefreshToken.update({ refreshToken }, { where: { userId: id } });
  },

  async verifyAccessToken(accessToken) {
    if (!accessToken)
      throw apiError.setBadRequest('Access token does not exist');
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
    );
    return decodedToken.id;
  },

  async verifyRefreshToken(refreshToken) {
    if (!refreshToken)
      throw apiError.setBadRequest('Refresh token does not exist');
    const existingRefreshToken = await RefreshToken.findOne({
      where: { refreshToken },
    });

    if (!existingRefreshToken)
      throw apiError.setBadRequest('Please check the refresh token again');

    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    return decodedToken.id;
  },

  async reissueToken(accessToken, refreshToken) {
    if (!accessToken) {
      if (refreshToken) return this.createAccessToken(refreshToken);
      else
        throw apiError.setUnauthorized(
          'Access & Refresh tokens all expired. Please login again',
        );
    }
    return this.createAccessToken(accessToken);
  },
};
