"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const routes = {
    signup: "/signup",
};
router.post(routes.signup, (req, res) => { });
exports.default = router;
