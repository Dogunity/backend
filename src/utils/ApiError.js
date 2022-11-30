class ErrorCheck extends Error {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

class ApiError {
  constructor() {}

  setBadRequest(message) {
    throw new ErrorCheck(400, message);
  }

  setUnauthorized(message) {
    throw new ErrorCheck(401, message);
  }

  setForbidden(message) {
    throw new ErrorCheck(403, message);
  }

  setNotFound(message) {
    throw new ErrorCheck(404, message);
  }

  setInternalServerError(message) {
    throw new ErrorCheck(500, message);
  }
}

Object.freeze(ApiError);
export default ApiError;
