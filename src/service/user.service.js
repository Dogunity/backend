import bcrypt from 'bcrypt';
import { User } from '../models';

class UserService {
  constructor(apiError) {
    this.apiError = apiError;
  }

  async createUser(nickname, email, password) {
    if (!email || !nickname || !password) this.apiError.setBadRequest('틀림');
    const foundUser = await User.findOne({ where: { email: email } });
    if (foundUser) this.apiError.setBadRequest('이미 사용중임');
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdNewUser = await User.create({
      nickname: nickname,
      email: email,
      password: hashedPassword,
    });
    return createdNewUser;
  }
}

Object.freeze(UserService);
export default UserService;
