import express from 'express'
import { PORT } from './config.js';
import indexRoutes from './routes/index.routes.js'
import taskRoutes from './routes/task.router.js'
import cors from 'cors';

const app=express();
/* app.use(cors( 
   { origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']}
)); */
app.use(cors());
app.use(express.json())
app.use(indexRoutes)
app.use(taskRoutes)
app.listen(PORT);
console.log("port ",PORT);