import "reflect-metadata"
import express from 'express'
import session from 'express-session'
import * as dotenv from 'dotenv'
import { AppDataSource } from "./dataSource"
import { userRoutes } from "./routes/userRoutes"
import { userDetailRoutes } from "./routes/userDetailRoutes"
import { customerRoutes } from "./routes/customerRoutes"
import { customerDetailRoutes } from "./routes/customerDetail"
import morgan from "morgan"
import { sellerRoutes } from "./routes/sellerRoutes"
import { sellerDetailRoutes } from "./routes/sellerDetailRoutes"
import { adminRoutes } from "./routes/adminRoutes"
import { adminDetailRoutes } from "./routes/adminDetailRoutes"
import { checkisAuthenticated } from "./middlewares/isAuthenticatedMiddleware"
import { customAuthenticate } from "./config/customAuth"
import { isAdmin } from "./middlewares/isAdmin"
import { isCustomer } from "./middlewares/isCustomer"
import { isSeller } from "./middlewares/isSeller"
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
//TODO: create a signup route to signup user
app.use("/auth/login", customAuthenticate)
app.use(checkisAuthenticated)

// routes
app.use("/users", isAdmin, userRoutes)
app.use("/userDetail", isAdmin, userDetailRoutes)
app.use("/customers", isCustomer, customerRoutes)
app.use("/customerDetail", isCustomer, customerDetailRoutes)
app.use("/sellers", isSeller, sellerRoutes)
app.use("/sellerDetail", isSeller, sellerDetailRoutes)
app.use("/admins", isAdmin, adminRoutes)
app.use("/adminDetail", isAdmin, adminDetailRoutes)

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
