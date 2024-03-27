import express from 'express';
import cors from 'cors';
import {router as RootUser} from './routes/index'
const app = express();
const port: number = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1',RootUser)

app.listen(port, ()=>{
  console.log('Listening on port '+port);
})