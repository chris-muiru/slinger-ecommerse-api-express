import express from 'express'
import { createConnection } from '../models/connection'
const app = express()
const PORT = 8000
// create database connection and sync database
createConnection()

app.listen(PORT, () => {
    console.log(`serving at port ${PORT}`)
})