"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = exports.userDao = void 0;
const sqlite_pro_wrapper_1 = __importDefault(require("@triaxio/sqlite-pro-wrapper"));
const sqlPath = __dirname + "/sql";
const dbPath = process.env.DATABASE_NAME
    ? process.env.DATABASE_NAME
    : "test.db";
let db;
const initDB = async () => {
    try {
        const result = await sqlite_pro_wrapper_1.default.connect(dbPath, sqlPath);
        db = result;
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.initDB = initDB;
const userDao = {
    async create(data) {
        try {
            const result = await sqlite_pro_wrapper_1.default.create("users", data, db);
            return result;
        }
        catch (error) {
            throw error;
        }
    },
    async updateById(updatedUser, id) {
        try {
            const result = await sqlite_pro_wrapper_1.default.update("users", updatedUser, "id", id, db);
            return result;
        }
        catch (error) {
            throw error;
        }
    },
    async getAll() {
        try {
            const result = await sqlite_pro_wrapper_1.default.getAll("users", db);
            return result;
        }
        catch (e) {
            throw e;
        }
    },
    async getByParam(paramName, paramValue) {
        try {
            const result = await sqlite_pro_wrapper_1.default.get("users", db, paramName, paramValue);
            return result;
        }
        catch (e) {
            throw e;
        }
    },
};
exports.userDao = userDao;
//# sourceMappingURL=Dao.js.map