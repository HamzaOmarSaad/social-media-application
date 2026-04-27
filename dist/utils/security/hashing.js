"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHashService = exports.hashService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashService = async (text) => {
    return await bcrypt_1.default.hash(text, 10);
};
exports.hashService = hashService;
const verifyHashService = async (originalText, hashedText) => {
    return await bcrypt_1.default.compare(originalText, hashedText);
};
exports.verifyHashService = verifyHashService;
