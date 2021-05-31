import express from 'express';
import cors from 'cors';
import client from './src/database/db.js';
import {getUsers, getUserById, addUser, removeUser, updateUser} from './src/queries.js';

//To start up our server
const app=express();
const port =process.env.Port || 3000

app.use(cors());
app.use(express.json());


app.get('/users', getUsers);
app.get('/users/:id', getUserById);
app.post('/user', addUser);
app.delete('/user/:id', removeUser);
app.patch('/user/:id', updateUser);

client.connect(); //to connect to pg database

app.get('/', (req, res)=>{
    res.json({
        status: 'success',
        message: 'hello world!'
    })
})

app.listen(port, ()=>{
    console.log(`Server running at http://localhost: ${port}`)
});