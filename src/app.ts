// ---3rd party modules
import express from 'express';

// ---middlewares
import errorHandler from './middlewares/errorHandler';
import reqLogger from './middlewares/reqLogger';
import resLogger from './middlewares/resLogger';

// ---route
import checkR from './routes/checkR'
import lineR from './routes/lineR'

const app = express()

// ---pre - middlewares
app.use(express.json())
app.use(reqLogger)
// routers
app.use('/', checkR)
app.use('/line', lineR)

// ---post - middlewares

app.use(errorHandler)
app.use(resLogger)

export default app