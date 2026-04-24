"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./modules/userModule/user.controller"));
const config_1 = require("./env/config");
const error_handle_1 = require("./utils/res/error.handle");
const connection_1 = require("./DB/config/connection");
const app = (0, express_1.default)();
const bootstrap = async () => {
    app.use(express_1.default.json());
    await (0, connection_1.connectDB)();
    app.use("/users", user_controller_1.default);
    // unknown path
    app.all("{/*dummy}", (req, res, next) => {
        throw new error_handle_1.NotFoundException("invalid URL");
    });
    // error handler
    app.use((err, req, res, next) => {
        const errorData = {
            errMsg: err.message,
            statusCode: err.statusCode || 500,
        };
        res.status(err.statusCode || 500).json({ err: JSON.parse(err.message) });
        if (err.validationError?.length) {
            Object.assign(errorData, { validationError: err.validationError });
        }
    });
    app.listen(config_1.PORT, () => {
        console.log("server runnug on port ", config_1.PORT);
    });
};
exports.default = bootstrap;
