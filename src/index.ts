import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userFeed from './route/userFeed'
import uploadProfilePhoto from './route/uploadProfilePhoto'
import { apiKeyAuth } from './middleware/apiKeyAuth'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', apiKeyAuth, userFeed)
app.use('/', apiKeyAuth, uploadProfilePhoto)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
