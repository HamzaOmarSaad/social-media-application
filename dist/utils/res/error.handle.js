"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationException = exports.conflictException = exports.badReqException = exports.NotFoundException = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    constructor(message, statusCode, options) {
        super(message, options);
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
class NotFoundException extends AppError {
    constructor(message) {
        super(message || "not found ", 404);
    }
}
exports.NotFoundException = NotFoundException;
class badReqException extends AppError {
    constructor(message) {
        super(message, 400);
    }
}
exports.badReqException = badReqException;
class conflictException extends AppError {
    constructor(message) {
        super(message, 409);
    }
}
exports.conflictException = conflictException;
class validationException extends AppError {
    constructor(message) {
        super(message, 400);
    }
}
exports.validationException = validationException;
