"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateTokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../env/config");
const error_handle_1 = require("../res/error.handle");
const tokenTypeEnum = {
    access: "access",
    refresh: "refresh",
};
const generateTokenService = ({ payload, options = {}, tokenType, }) => {
    const expiresIn = tokenType === "access" ? config_1.ACCESS_EXPIRES_IN : config_1.REFRESH_EXPIRES_IN;
    return jsonwebtoken_1.default.sign(payload, config_1.JWT_SECRET, {
        expiresIn,
        ...options,
    });
};
exports.generateTokenService = generateTokenService;
const verifyToken = ({ token, tokenType }) => {
    try {
        if (tokenType === "access") {
            return jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        }
        if (tokenType === "refresh") {
            return jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        }
    }
    catch (err) {
        throw new error_handle_1.badReqException("Token verification failed");
    }
};
exports.verifyToken = verifyToken;
