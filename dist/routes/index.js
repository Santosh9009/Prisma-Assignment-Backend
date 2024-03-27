"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const User_1 = require("./User");
const Todo_1 = require("./Todo");
const router = express_1.default.Router();
exports.router = router;
router.use('/user', User_1.router);
router.use('/todo', Todo_1.router);
