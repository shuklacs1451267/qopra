class InternalError extends Error {
  public statusCode: number;

  constructor(message = "Internal Server Error") {
    super(message);
    this.statusCode = 500;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default InternalError;
