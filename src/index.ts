import handleErrorMiddleware from './middlewares/handleErrorMiddleware.js';
import router from './routers/index.js';
import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';

const app = express();

app.use(json());
app.use(cors());
app.use(router); 
app.use(handleErrorMiddleware);

const PORT = +process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Working and running on port ${PORT}!`);

});