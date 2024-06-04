"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.getUserById = exports.getAllUsers = void 0;
const Dao_1 = require("../database/Dao");
const getAllUsers = async (req, res) => {
    try {
        const result = await Dao_1.userDao.getAll();
        console.log('result', result);
        res.json(result);
    }
    catch (e) {
        res.send({ error: e });
        console.log('error', e);
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(req.params);
        const result = await Dao_1.userDao.getByParam('id', id);
        console.log('result one', result);
        res.json(result);
    }
    catch (e) {
        res.send({ error: e });
        console.log('error', e);
    }
};
exports.getUserById = getUserById;
const addUser = async (req, res) => {
    try {
        const result = null;
        res.json(result);
    }
    catch (e) {
        console.log(e);
    }
};
exports.addUser = addUser;
//# sourceMappingURL=user.js.map