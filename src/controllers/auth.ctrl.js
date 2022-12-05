import { authService } from '../services';

export default {
  async register(req, res, next) {
    const { email, password, nickname } = req.body;
    try {
      await authService.register(email, password, nickname);
      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Successfully REGISTER a new user',
      });
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const foundUser = await authService.login(email, password);
      const accessToken = await authService.createAccessToken(foundUser.id);
      const refreshToken = await authService.createRefreshToken(foundUser.id);
      await authService.saveRefreshToken(foundUser.id, refreshToken);

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'LOGIN success',
        result: {
          ...foundUser,
          accessToken,
          refreshToken,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async reissueToken(req, res, next) {
    const existingAccessToken = req.headers.authorization.split('Bearer ')[1];
    const existingRefreshToken = req.headers['refresh-token'];

    try {
      const validAccessTokenId = await authService.verifyAccessToken(
        existingAccessToken,
      );
      const validRefreshTokenId = await authService.verifyRefreshToken(
        existingRefreshToken,
      );

      const newAccessToken = await authService.reissueToken(
        validAccessTokenId,
        validRefreshTokenId,
      );

      console.log(newAccessToken);

      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Successfully REISSUED tokens',
        result: newAccessToken,
      });
    } catch (err) {
      next(err);
    }
  },
};
