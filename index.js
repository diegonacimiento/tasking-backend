import express from 'express';
import routerApi from './routes/index.js';
import {
  logErr,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} from './middlewares/error.handler.js';
import "./utils/auth/index.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
;

app.listen(PORT, () => {
  console.log('Servidor levantado en el puerto: ' + PORT);
});

app.use(express.json());
app.use(express.text());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Holaaaa');
});

routerApi(app);

app.use(logErr);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
