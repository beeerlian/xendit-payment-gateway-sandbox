class Exception<T extends string> extends Error {
  public status: number;
  public name: T;
  public message: string;
  public cause?: any;
  public data?: any;

  constructor({
    status,
    name,
    message,
    cause,
    data,
  }: {
    status: number;
    name: T;
    message: string;
    cause?: any;
    data?: any;
  }) {
    super(message);
    this.status = status;
    this.name = name;
    this.message = message;
    this.cause = cause;
    this.data = data;
  }
}

export default Exception;
