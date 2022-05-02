import { ErrorCode } from "./errorCode";

export class ErrorException extends Error {
  public status: number;
  public metaData: any;
  constructor(code: string = ErrorCode.UnknownError, metaData: any = null) {
    super(code);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = code;
    this.status = 500;
    this.metaData = metaData;
    switch (code) {
      case ErrorCode.Unauthenticated:
        this.status = 401;
        break;
      case ErrorCode.UsernameUnavailable:
        this.status = 400;
        break;
      case ErrorCode.NotFound:
        this.status = 404;
        break;
      case ErrorCode.DatabateError:
        this.status = 500;
        break;
      default:
        this.status = 500;
        break;
    }
  }
}
