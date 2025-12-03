import ApiError from "./ApiError";

class Forbidden extends ApiError {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

export default Forbidden;
