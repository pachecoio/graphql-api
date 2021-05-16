const mongoErrorMap = {
  "11000": {
    status: 409,
    message: "Duplicate key error",
  },
};

export class HttpRequestError {
  status: number;
  message: string;
  constructor(status: number = 500, message: string = "", error: Error = null) {
    this.status = status;
    this.message = message;

    if (error) this.setError(error);
  }

  setError(error) {
    if (error.name === "MongoError") {
      const errorMap = mongoErrorMap[error.code];
      if (errorMap) {
        this.status = errorMap.status || this.status;
        this.message = error.message || errorMap.message || this.message;
      }
    }
  }
}
