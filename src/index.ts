import "reflect-metadata"
import express from 'express'
import session from 'express-session'
import * as dotenv from 'dotenv'
import { AppDataSource } from "./dataSource"
import { User, Admin, Seller, Customer } from "./models/users"
import { userRoutes } from "./routes/userRoutes"
import { userDetailRoutes } from "./routes/userDetailRoutes"
import { customerRoutes } from "./routes/customerRoutes"
import { customerDetailRoutes } from "./routes/customerDetail"
import morgan from "morgan"
import { sellerRoutes } from "./routes/sellerRoutes"
import { sellerDetailRoutes } from "./routes/sellerDetailRoutes"
import { adminRoutes } from "./routes/adminRoutes"
import { adminDetailRoutes } from "./routes/adminDetailRoutes"
dotenv.config()

export const app = express()
const PORT = process.env.PORT || 8000

// middlewares
app.use(express.json())
app.use(morgan("dev"))

// routes
app.use("/users", userRoutes)
app.use("/userDetail", userDetailRoutes)
app.use("/customers", customerRoutes)
app.use("/customerDetail", customerDetailRoutes)
app.use("/sellers", sellerRoutes)
app.use("/sellerDetail", sellerDetailRoutes)
app.use("/admins", adminRoutes)
app.use("/adminDetail", adminDetailRoutes)


AppDataSource.initialize()
    .then(() => {
        AppDataSource.synchronize()
        app.listen(PORT, () => {
            console.log(`serving at port ${PORT}`)
            console.log('Connected to database successfully')
        })
    })
    .catch((error) => console.log(error))
