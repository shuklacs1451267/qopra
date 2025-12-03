import ApiError from "./ApiError";

class Unauthorized extends ApiError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

export default Unauthorized;
