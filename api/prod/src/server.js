"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
;
const user_1 = require("./handlers/user");
const Dao_1 = require("./database/Dao");
(async () => {
    try {
        await (0, Dao_1.initDB)();
        console.log("init");
    }
    catch (error) {
        throw error;
    }
})();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('hello');
});
app.post('/users/', user_1.addUser);
app.get('/users/:id', user_1.getUserById);
app.get('/users/', user_1.getAllUsers);
app.post('/tasks', (req, res) => {
    console.log(req.body);
    res.send('post');
});
app.all('*', (req, res) => {
    res.send('404');
});
app.listen(8090, () => {
    console.log("started 8090");
});
//# sourceMappingURL=server.js.map