import app from './app'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT || '3444'

app.listen(port, () =>
  console.log(`App successfully listening on port ${port}`))