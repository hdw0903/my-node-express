import express from 'express';
import bodyParser from 'body-parser';
import apiRouter from './routes/index';
import cors from 'cors';
import detenv from 'dotenv';

const PORT = 5000;
const app = express();

detenv.config();
app.use(bodyParser.json());
if (process.env.NODE_ENV === 'development') {
  app.use(cors());
} else {
  const whitelist = ['http://hdw0903.github.io', 'https://hdw0903.github.io'];
  const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
  app.use(cors(corsOptions));
}
app.use('/api', apiRouter);
app.get('/', (req, res) => {
  res.send('hello world ');
});
app.get('/posts', (req, res) => {
  res.send('hello posts');
});
app.get('/posts/:id', (req, res, next) => {
  if (isNaN(+req.params.id)) {
    throw new Error('숫자만 돼요.');
    // next(new Error('숫자만 돼요.'));
  }
  res.send(`path : ${req.params.id}`);
});
app.use((req, res) => {
  throw new Error('Not Found');
});
app.use((err, req, res, next) => {
  res
    .status(500)
    .json({ ...err, message: err.message || 'INTERVAL_SERVER_ERROR' });
});
app.listen(PORT);
console.log(`Server is Running on Port: ${PORT}`);
