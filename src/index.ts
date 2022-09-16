import express from 'express'
import { createConnection } from '../models/connection'
import session from 'express-session'
import * as dotenv from 'dotenv'
import { Authentication, dumbUser } from '../config/CustomAuth'
import { userCreationRoute } from "../routes/userCreationRoutes"

dotenv.config()
const call = async () => {
    let user = await dumbUser()
    console.log(user)
}

const PORT = process.env.PORT || 8000
export const app = express()
createConnection() // create database connection and sync database
app.use(express.json())

// app.post("/", Authentication)
console.log("works here")
app.use("/signup", userCreationRoute)

app.listen(PORT, () => {
    console.log(`serving at port ${PORT}`)
})