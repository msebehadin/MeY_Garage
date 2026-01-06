/**
 * Custom Application Error Class
 * 
 * System Design Reason: We use a custom error class instead of generic Error
 * to attach HTTP status codes. This allows our error handling middleware to
 * automatically return the correct status code without manual mapping.
 * 
 * This follows the "Real Engineer" standard by ensuring every error has a
 * proper status code (400, 404, 500, etc.) and clear error messages.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Maintains proper stack trace for where our error was thrown (only on V8)
    Error.captureStackTrace(this, this.constructor);
  }
}
