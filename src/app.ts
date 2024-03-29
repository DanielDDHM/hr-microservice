import 'make-promises-safe';
import express from 'express';
import cors from 'cors';

import helmetMiddleware from './middlewares/helmet';
import morganMiddleware from './middlewares/morgan';
import healthMiddleware from './middlewares/health';

import modules from './routes';

const app = express();

app.use(cors());

// own express modules
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middlewares
morganMiddleware.setup(app);
helmetMiddleware.setup(app);
healthMiddleware.setup(app);

// modules
app.use(modules);

export default app;
