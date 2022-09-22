import { join } from "path"
import { DataSource } from "typeorm"
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "kris",
    password: "Cm@postgres",
    database: "ecommerseDb",
    entities: [join(__dirname, "./models/*.{ts,js}")],
    synchronize: true,
    logging: false,
})