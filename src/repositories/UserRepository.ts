import { User } from "../models/users";
import { AppDataSource } from "..";
import { Repository } from "typeorm";
// TODO: refactor all repo creation function to use just  one function
// export const userRepository = (model) => {
//     return AppDataSource.getRepository(User)
// }