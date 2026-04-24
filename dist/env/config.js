"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_URI = exports.PORT = void 0;
const node_process_1 = require("node:process");
exports.PORT = node_process_1.env["PORT"];
exports.DB_URI = node_process_1.env["DB_URI"];
