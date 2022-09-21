import "reflect-metadata"
import express from 'express'
import session from 'express-session'
import * as dotenv from 'dotenv'
import { DataSource } from "typeorm"
import { User, Admin, Seller, Customer } from "./models/users"
import { userRoutes } from "./routes/userRoutes"
import { userDetailRoutes } from "./routes/userDetailRoutes"
dotenv.config()
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "kris",
    password: "Cm@postgres",
    database: "ecommerseDb",
    entities: [User, Admin, Seller, Customer,],
    synchronize: true,
    logging: false,
})


const PORT = process.env.PORT || 8000
export const app = express()
app.use(express.json())

// routes
app.use("/users", userRoutes)
app.use("/userDetail", userDetailRoutes)
AppDataSource.initialize()
    .then(() => {
        AppDataSource.synchronize()
        app.listen(PORT, () => {
            console.log(`serving at port ${PORT}`)
            console.log('Connected to database successfully')
        })
    })
    .catch((error) => console.log(error))
