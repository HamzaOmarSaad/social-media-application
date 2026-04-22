"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./modules/userModule/user.controller"));
const config_1 = require("./env/config");
const error_handle_1 = require("./utils/res/error.handle");
const app = (0, express_1.default)();
const bootstrap = async () => {
    app.use(express_1.default.json());
    app.use("/users", user_controller_1.default);
    app.all("{/*dummy}", (req, res, next) => {
        throw new error_handle_1.NotFoundException("invalid URL");
    });
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).json({ err: err.message });
    });
    app.listen(config_1.PORT, () => {
        console.log("server runnug on port ", config_1.PORT);
    });
};
exports.default = bootstrap;
