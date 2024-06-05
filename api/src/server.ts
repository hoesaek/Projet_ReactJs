import  express , {Request,Response, Express }  from "express";
import bodyParser from "body-parser";;
import {getAllUsers ,getUserById, addUser, countUsers, getListTasks , updateUser, deleteUser} from './handlers/user';
import {getAllTasks ,getTaskById, addTask, updateTask, countTasks, getUser, deleteTask} from './handlers/task';
import { initDB } from "./database/Dao";
import cors from 'cors';


(async ()=>{
    try {
        await initDB();
        console.log("init");
    } catch (error) {
        throw error;
    }
    
})();

const app : Express = express();

app.use(bodyParser.json());
app.use(cors());
// get base
app.get('/', (req : Request, res : Response) => {
    res.send('hello');
} );
app.post('/users/', addUser);
app.put('/users/:id', updateUser);
app.get('/users/count', countUsers );
app.get('/users/:id/tasks', getListTasks);
app.get('/users/:id', getUserById );
app.get('/users/', getAllUsers );
app.delete('/users/:id', deleteUser );

app.post('/tasks/', addTask);
app.get('/tasks/', getAllTasks);
app.get('/tasks/count', countTasks );
app.get('/tasks/:id', getTaskById );
app.put('/tasks/:id', updateTask);
app.delete('/tasks/:id', deleteTask );
app.get('/tasks/:id/user', getUser);

app.post('/tasks', (req : Request, res : Response) => {
    console.log(req.body);
    res.send('post');
} )

app.all('*',(req : Request, res : Response) => {
    res.send('404');
} );

app.listen(8090,() => {
    console.log ("started 8090");
})


