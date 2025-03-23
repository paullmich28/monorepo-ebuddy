import express from "express"
import bodyParser from "body-parser"
import cors from "cors";
import { router } from "../routes/userRoutes"
import { db } from "../config/firebaseConfig";

const app = express()
const PORT = 5000

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(router)

app.listen(PORT, () => {
  console.log(`Express app is running on port ${PORT}`)
})