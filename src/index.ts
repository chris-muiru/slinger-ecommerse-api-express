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
import { initializePassport } from "./config/passportLocal"
import passport from "passport"
import { checkisAuthenticated } from "./middlewares/isAuthenticatedMiddleware"
import { customAuthenticate } from "./config/customAuth"
dotenv.config()

export const app = express()
const PORT = process.env.PORT || 8000

// middlewares
app.use(express.json())
app.use(morgan("dev"))

app.use(
    //TODO: change secret to only read from SESSION_SECRET
    session({
        name: "slingerEccomerseAuth",
        secret: process.env.SESSION_SECRET || "bjgugfyr64676876875",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 3600000000 },
    })
)

app.use("/auth/login", customAuthenticate)
app.use(checkisAuthenticated)
// routes
app.use("/users", userRoutes)
app.use("/userDetail", userDetailRoutes)
app.use("/customers", customerRoutes)
app.use("/customerDetail", customerDetailRoutes)
app.use("/sellers", sellerRoutes)
app.use("/sellerDetail", sellerDetailRoutes)
app.use("/admins", adminRoutes)
app.use("/adminDetail", adminDetailRoutes)

// orm initialization
AppDataSource.initialize()
    .then(() => {
        AppDataSource.synchronize()
        app.listen(PORT, () => {
            console.log(`serving at port ${PORT}`)
            console.log('Connected to database successfully')
        })
    })
    .catch((error) => console.log(error))
