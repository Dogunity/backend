import { postService } from '../services';

export default {
  async createComment(req, res, next) {
    const userId = req.userId;
    const { id } = req.params;
    const { description } = req.body;
    try {
      await postService.createComment(userId, id, description);

      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Successfully CREATE a comment on the post.',
      });
    } catch (err) {
      next(err);
    }
  },
};
