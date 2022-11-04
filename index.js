import express from 'express';
import routerApi from './routes/index.js';
import {
  logErr,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} from './middlewares/error.handler.js';
import checkApiKey from './middlewares/auth.handler.js';
import "./utils/auth/index.js";

const app = express();
const PORT = process.env.PORT || 3001;
;

app.listen(PORT, () => {
  console.log('Servidor levantado en el puerto: ' + PORT);
});

app.use(express.json());
app.use(express.text());

app.get('/', (req, res) => {
  res.send('Hola');
});

routerApi(app);

app.use(logErr);
app.use(ormErrorHandler);
app.use(errorHandler);
app.use(boomErrorHandler);
