import { authService } from '../services';

export default {
  async register(req, res, next) {
    const { email, password, nickname } = req.body;
    try {
      await authService.register(email, password, nickname);
      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Successfully REGISTER a new user.',
      });
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const foundUser = await authService.login(email, password);

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'LOGIN success.',
        result: foundUser,
      });
    } catch (err) {
      next(err);
    }
  },

  async reissueToken(req, res, next) {
    const exRefreshToken = req.headers['refresh-token'];

    try {
      const { newAccessToken, refreshToken } = await authService.reissueToken(
        exRefreshToken,
      );

      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Successfully REISSUED tokens.',
        result: {
          accessToken: newAccessToken,
          refreshToken,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
