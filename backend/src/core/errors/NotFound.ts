import ApiError from "./ApiError";

class NotFound extends ApiError {
  constructor(message = "Resource Not Found") {
    super(404, message);
  }
}

export default NotFound;
