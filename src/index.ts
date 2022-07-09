import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Working and running on port ${PORT}!`);
});