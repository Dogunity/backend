import { userService } from '../services';

export default {
  async register(req, res, next) {
    const { email, password, nickname } = req.body;
    try {
      await userService.register(email, password, nickname);
      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Successfully REGISTER a new user',
      });
    } catch (err) {
      next(err);
    }
  },
};
