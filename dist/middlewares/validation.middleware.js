"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const error_handle_1 = require("../utils/res/error.handle");
const validationMiddleware = async (schema) => {
    return (req, res, next) => {
        const keys = Object.keys(schema);
        const issues = [];
        keys.forEach((key) => {
            if (schema[key]) {
                const validationRes = schema[key].safeParse(req.body);
                if (!validationRes.success) {
                    issues.push(...validationRes.error.issues);
                }
            }
        });
        if (issues.length) {
            throw new error_handle_1.validationException(issues);
        }
    };
};
exports.validationMiddleware = validationMiddleware;
