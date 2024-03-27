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
exports.UpdateUser = exports.GetUser = exports.CreateUser = void 0;
const client_1 = require("@prisma/client");
const Prisma = new client_1.PrismaClient();
function CreateUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield Prisma.user.create({
            data: {
                username: data.username,
                password: data.password,
                firstname: data.firstname,
                lastname: data.lastname
            }
        });
        return user;
    });
}
exports.CreateUser = CreateUser;
function GetUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield Prisma.user.findUnique({
            where: {
                username: username
            }
        });
        return user;
    });
}
exports.GetUser = GetUser;
function UpdateUser(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield Prisma.user.update({
            where: {
                id: id
            },
            data: Object.assign({}, data)
        });
        return user;
    });
}
exports.UpdateUser = UpdateUser;
