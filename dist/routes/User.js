"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const User_1 = require("../db/User");
const dotenv_1 = require("dotenv");
const router = express_1.default.Router();
exports.router = router;
(0, dotenv_1.config)();
const sercetkey = process.env.JWT_SECRET || '';
console.log(sercetkey);
const SignupSchema = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string(),
    firstname: zod_1.z.string(),
    lastname: zod_1.z.string().min(5),
});
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = SignupSchema.safeParse(req.body);
    if (!userData.success) {
        res.status(400).json({
            message: 'Invalid inputs'
        });
    }
    const ExistingUser = yield (0, User_1.GetUser)(req.body.username);
    if (ExistingUser) {
        res.status(403).json({
            message: 'User already exists'
        });
    }
    const user = yield (0, User_1.CreateUser)(req.body);
    const token = jsonwebtoken_1.default.sign(user.username, sercetkey);
    res.status(200).json({
        message: 'User created successfully',
        token: token
    });
}));
const SigninSchema = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = SigninSchema.safeParse(req.body);
    if (!userData.success) {
        res.status(400).json({
            message: 'Invalid inputs'
        });
    }
    const ExistingUser = yield (0, User_1.GetUser)(req.body.username);
    if (ExistingUser) {
        res.status(403).json({
            message: 'User already exists'
        });
    }
    const user = (0, User_1.GetUser)(req.body.username);
}));
