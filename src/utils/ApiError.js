class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }

  setBadRequest(message) {
    throw new ApiError(400, message);
  }

  setUnauthorized(message) {
    throw new ApiError(401, message);
  }

  setForbidden(message) {
    throw new ApiError(403, message);
  }

  setNotFound(message) {
    throw new ApiError(404, message);
  }

  setInternalServerError(message) {
    throw new ApiError(500, message);
  }
}

Object.freeze(ApiError);
export default ApiError;
