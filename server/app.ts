import express from 'express';
import router from './router.ts';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
  res.send('Hello World');
});

export default app;