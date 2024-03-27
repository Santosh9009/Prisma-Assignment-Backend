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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodo = exports.CreateTodo = void 0;
const client_1 = require("@prisma/client");
const Prisma = new client_1.PrismaClient();
function CreateTodo(title, description, userid) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Prisma.todo.create({
            data: {
                title: title,
                description: description,
                userid: userid
            }
        });
    });
}
exports.CreateTodo = CreateTodo;
function UpdateTodo(id, title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Prisma.todo.update({
            where: {
                id: id
            },
            data: {
                title: title,
                description: description
            }
        });
    });
}
exports.UpdateTodo = UpdateTodo;
function GetTodo(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        const todos = yield Prisma.todo.findMany({
            where: {
                userid: userid
            }
        });
        return todos;
    });
}
