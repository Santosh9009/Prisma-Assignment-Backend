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
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const User_1 = require("../db/User");
const middleware_1 = require("../middleware");
const dotenv_1 = require("dotenv");
const router = (0, express_1.Router)();
exports.router = router;
(0, dotenv_1.config)();
const sercetkey = process.env.JWT_SECRET || '';
// signup 
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
        return;
    }
    const existingUser = yield (0, User_1.GetUser)(req.body.username);
    if (existingUser) {
        res.status(403).json({
            message: 'User already exists'
        });
        return;
    }
    const user = yield (0, User_1.CreateUser)(req.body);
    const token = jsonwebtoken_1.default.sign({ id: user.id }, sercetkey);
    res.status(200).json({
        message: 'User created successfully',
        token: token
    });
}));
// signin
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
        return;
    }
    const existingUser = yield (0, User_1.GetUser)(req.body.username);
    if (!existingUser) {
        res.status(403).json({
            message: 'No user already exists'
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: existingUser.id }, sercetkey);
    res.status(200).json({
        token: token
    });
}));
// update user
const UpdateSchema = zod_1.z.object({
    firstname: zod_1.z.string().optional(),
    lastname: zod_1.z.string().optional(),
    password: zod_1.z.string().optional(),
});
router.put('/update', middleware_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = UpdateSchema.safeParse(req.body);
    if (!userData.success) {
        res.status(400).json({
            message: 'Invalid inputs'
        });
        return;
    }
    const user = yield (0, User_1.UpdateUser)(res.locals.id, req.body);
    res.status(200).json({
        message: 'Updated successfully',
    });
}));
