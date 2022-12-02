import { User } from '../models';
import ApiError from '../utils/ApiError';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const passwordHashing = (password) => {
  return bcrypt.hash(password, Number.parseInt(process.env.SALTROUNDS));
};

export default {
  async register(email, password, nickname) {
    if (!email || !password || !nickname)
      throw ApiError.setBadRequest('All fields required');

    const foundUser = await User.findOne({ where: { email } });
    if (foundUser) throw ApiError.setBadRequest('Email already exists');

    const foundNickname = await User.findOne({ where: { nickname } });
    if (foundNickname) throw ApiError.setBadRequest('Nickname already exists');

    const hashedPassword = await passwordHashing(password);

    await User.create({
      email,
      password: hashedPassword,
      nickname,
    });
  },

  async login(email, password) {
    if (!email || !password)
      throw ApiError.setBadRequest('All fields required');

    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) throw ApiError.setBadRequest('Email does not exist');

    const hashedPassword = await passwordHashing(password);

    const isCorrectPassword = await bcrypt.compare(password, hashedPassword);

    if (!isCorrectPassword) throw ApiError.setBadRequest('Wrong password');
  },

  async createAccessToken(id) {
    const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
      expireIn: '1h',
    });
    return accessToken;
  },
};
