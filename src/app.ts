// 3rd party modules
import express from 'express';

// internal
import checkR from './routes/checkR'
const app = express()

// middlewares

// routers
app.use('/', checkR)

export default app