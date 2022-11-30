class ErrorCheck extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

class ApiError {
  constructor() {}

  setBadRequest(message) {
    return new ErrorCheck(400, message);
  }

  setUnauthorized(message) {
    return new ErrorCheck(401, message);
  }

  setForbidden(message) {
    return new ErrorCheck(403, message);
  }

  setNotFound(message) {
    return new ErrorCheck(404, message);
  }

  setInternalServerError(message) {
    return new ErrorCheck(500, message);
  }
}

Object.freeze(ApiError);
export default ApiError;
