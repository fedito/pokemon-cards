import { ErrorCode } from "./errorCode";


export class ErrorException extends Error {
  public status: number;
  public metaData: any = null;
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
      case ErrorCode.UsernameAlreadyExists:
        this.status = 400;
        break;
      case ErrorCode.InvalidCardId:
        this.status = 400;
        break;
      default:
        this.status = 500;
        break;
    }
  }
}