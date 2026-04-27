"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptService = exports.encryptService = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const config_1 = require("../../env/config");
const encryptService = (text) => {
    return crypto_js_1.default.AES.encrypt(text, config_1.ENCRYPTION_KEY).toString();
};
exports.encryptService = encryptService;
const decryptService = (encryptedtext) => {
    return crypto_js_1.default.AES.decrypt(encryptedtext, config_1.ENCRYPTION_KEY).toString(crypto_js_1.default.enc.Utf8);
};
exports.decryptService = decryptService;
