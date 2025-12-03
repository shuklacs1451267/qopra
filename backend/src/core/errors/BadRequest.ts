import ApiError from "./ApiError";

class BadRequest extends ApiError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

export default BadRequest;
