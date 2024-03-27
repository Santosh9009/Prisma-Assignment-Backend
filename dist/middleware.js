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
exports.authmiddleware = void 0;
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
(0, dotenv_1.config)();
const sercetkey = process.env.JWT_SECRET || '';
function authmiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authheader = req.headers.authorization;
        if (!authheader || !authheader.startsWith('Bearer ')) {
            res.status(403).json({});
        }
        const token = (authheader === null || authheader === void 0 ? void 0 : authheader.split(' ')[1]) || "";
        try {
            const decoded = jsonwebtoken_1.default.verify(token, sercetkey);
            if (decoded.id) {
                res.locals.id = decoded.id;
            }
            next();
        }
        catch (_a) {
        }
    });
}
exports.authmiddleware = authmiddleware;
