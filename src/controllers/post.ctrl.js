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

  async getComments(req, res, next) {
    const { id } = req.params;
    try {
      const foundComments = await postService.getComments(id);

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Successfully GET comments.',
        result: foundComments,
      });
    } catch (err) {
      next(err);
    }
  },

  async deleteComment(req, res, next) {
    const userId = req.userId;
    const { id } = req.params;
    const { commentId } = req.query;
    try {
      await postService.deleteComment(userId, id, commentId);

      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Successfully DELETE the comment.',
      });
    } catch (err) {
      next(err);
    }
  },
};
