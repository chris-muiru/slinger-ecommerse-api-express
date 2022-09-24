import { join } from "path"
import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
dotenv.config()
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [join(__dirname, "./models/*.{ts,js}")],
    synchronize: true,
    logging: false,
})
