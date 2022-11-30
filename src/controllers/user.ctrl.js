class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async register(req, res, next) {
    try {
      const { nickname, email, password } = req.body;
      const newUser = await userService.createUser(nickname, email, password);
      if (!newUser) throw new Error('만들기 실패');
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
}

Object.freeze(UserController);
export default UserController;
