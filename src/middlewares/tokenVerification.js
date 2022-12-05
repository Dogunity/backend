import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError';

export default (req, res, next) => {
  const token = req.headers['authorization'].split('Bearer ')[1];

  if (!token) next(ApiError.setBadRequest('Token required'));

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.userId = decodedToken.id;

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError')
      next(ApiError.setUnauthorized('Token expired'));
    next(ApiError.setUnauthorized('Invalid token'));
  }
};
