import "reflect-metadata"
import { DataSource } from "../node_modules/typeorm/index";
import { Photo } from "../db/users";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "kris",
    password: "Cm@postgres",
    database: "ecommerseDb",
    entities: [Photo],
    synchronize: true,
    logging: false
})
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))
