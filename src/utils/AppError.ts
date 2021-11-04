class AppError {
	public readonly statusCode: number;

	public readonly errorCode: string;

	constructor(statusCode = 400, errorCode: string) {
		this.statusCode = statusCode;
		this.errorCode = errorCode;
	}
}

export default AppError;
