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
const router = express_1.default.Router();
exports.router = router;
const zod_1 = require("zod");
const middleware_1 = require("../middleware");
const Todo_1 = require("../db/Todo");
// add todo
const todoSchema = zod_1.z.object({
    title: (0, zod_1.string)(),
    description: (0, zod_1.string)(),
});
router.post("/add", middleware_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = todoSchema.safeParse(req.body);
    if (!todo.success) {
        res.status(400).json({
            message: 'Invalid inputs'
        });
    }
    yield (0, Todo_1.CreateTodo)(res.locals.id, req.body);
    res.status(200).json({
        message: "Todo created successfully"
    });
}));
// update todo
const UpdateSchema = zod_1.z.object({
    title: (0, zod_1.string)().optional(),
    description: (0, zod_1.string)().optional(),
});
router.put("/update/:id", middleware_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = UpdateSchema.safeParse(req.body);
    const id = parseInt(req.params.id);
    if (!todo.success) {
        res.status(400).json({
            message: 'Invalid inputs'
        });
    }
    yield (0, Todo_1.UpdateTodo)(id, req.body);
    res.status(200).json({
        message: "Todo Updated successfully"
    });
}));
// get all todos
router.get("/get", middleware_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield (0, Todo_1.GetTodo)(res.locals.id);
    res.status(200).json({
        Todo: todos
    });
}));
// delete todo
router.delete("/delete/:id", middleware_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    yield (0, Todo_1.DeleteTodo)(id);
    res.status(200).json({
        message: "Todo deleted successfully"
    });
}));
