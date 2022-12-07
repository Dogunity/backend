import { User, RefreshToken } from '../models';
import ApiError from '../utils/ApiError';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const apiError = new ApiError();

const passwordHashing = async (password) => {
  return bcrypt.hash(password, Number.parseInt(process.env.SALTROUNDS));
};

export default {
  async register(email, password, nickname) {
    if (!email || !password || !nickname)
      throw apiError.setBadRequest('All fields are required.');

    const foundUser = await User.findOne({ where: { email } });
    if (foundUser) throw apiError.setBadRequest('Email already exists.');

    const foundNickname = await User.findOne({ where: { nickname } });
    if (foundNickname) throw apiError.setBadRequest('Nickname already exists.');

    const hashedPassword = await passwordHashing(password);

    await User.create({
      email,
      password: hashedPassword,
      nickname,
    });
  },

  async login(email, password) {
    if (!email || !password)
      throw apiError.setBadRequest('All fields are required.');

    const foundUser = await User.findOne({
      where: { email },
      raw: true,
    });

    if (!foundUser) throw apiError.setBadRequest('Email does not exist.');

    const isCorrectPassword = await bcrypt.compare(
      password,
      foundUser.password,
    );

    if (!isCorrectPassword)
      throw apiError.setBadRequest('Wrong password. Please check again.');

    const accessToken = jwt.sign(
      { id: foundUser.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: Number.parseInt(process.env.ACCESS_TOKEN_EXPIRATION) },
    );

    const refreshToken = await this.createRefreshToken(foundUser.id);

    return { ...foundUser, accessToken, refreshToken };
  },

  async createRefreshToken(id) {
    const expiredAt = new Date();

    expiredAt.setSeconds(
      expiredAt.getSeconds() +
        Number.parseInt(process.env.REFRESH_TOKEN_EXPIRATION),
    );

    const token = uuidv4();

    const refreshToken = await RefreshToken.create({
      token,
      userId: id,
      expiryDate: expiredAt.getTime(),
    });

    return refreshToken.token;
  },

  async verifyRefreshTokenExpiration(refreshToken) {
    return refreshToken.getTime() < new Date().getTime();
  },

  async reissueToken(exRefreshToken) {
    if (!exRefreshToken)
      throw apiError.setBadRequest('Refresh token is required.');

    const refreshToken = await RefreshToken.findOne({
      where: { token: exRefreshToken },
    });

    if (!refreshToken)
      throw apiError.setForbidden('Refresh token is not in the database.');

    if (this.verifyRefreshTokenExpiration(refreshToken)) {
      await RefreshToken.destroy({ where: { id: refreshToken.id } });
      throw apiError.setForbidden(
        'Refresh token has expired. Please make a new login request.',
      );
    }

    const user = await refreshToken.getUser();
    const newAccessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: Number.parseInt(process.env.ACCESS_TOKEN_EXPIRATION),
      },
    );

    return { newAccessToken, refreshToken: refreshToken.token };
  },
};
