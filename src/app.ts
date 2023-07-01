// ---3rd party modules
import express from 'express';

// ---middlewares
import errorHandler from './middlewares/errorHandler';
import reqLogger from './middlewares/reqLogger';
import resLogger from './middlewares/resLogger';

// ---route
import checkR from './routes/checkR'

const app = express()

// ---pre - middlewares
app.use(reqLogger)
// routers
app.use('/', checkR)

// ---post - middlewares

app.use(errorHandler)
// app.use(resLogger)

export default app