"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successRes = void 0;
const successRes = ({ res, message, data = {}, statusCode = 200, }) => {
    return res.status(statusCode).json({
        message,
        statusCode,
        data,
    });
};
exports.successRes = successRes;
