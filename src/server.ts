//  load env first of all
import dotenv from 'dotenv'
dotenv.config()

import app from './app'
const port = process.env.PORT || '3444'

app.listen(port, () => console.log(`App successfully launch : ${process.env.NODE_ENV}\nlistening on port: ${port}`))