// ---3rd party modules
import express from 'express';
import path from 'path';

// ---middlewares
import errorHandler from './middlewares/errorHandler';
import reqLogger from './middlewares/reqLogger';
import resLogger from './middlewares/resLogger';

// ---route
import checkR from './routes/universalR'
import lineR from './routes/lineR'

const app = express()

// ---pre - middlewares
app.use(express.json())
app.use(reqLogger)
// routers
app.use('/', checkR)
app.use('/line', lineR)
app.get('/page/:page', function (req, res) {
    res.sendFile(path.join(String(process.env.WORKING_DIR), `/static/html/${req.params.page}.html`));
});

// ---post - middlewares

app.use(errorHandler)
app.use(resLogger)

export default app