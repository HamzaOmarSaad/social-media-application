"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sucessRes = void 0;
const sucessRes = ({ res, message, data = {}, statusCode = 200, }) => {
    return res.status(statusCode).json({
        message,
        statusCode,
        data,
    });
};
exports.sucessRes = sucessRes;
