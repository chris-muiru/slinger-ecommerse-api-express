import { User } from "../models/users";
import { Repository } from "typeorm";
import { AppDataSource } from "../dataSource";
// TODO: refactor all repo creation function to use just  one function

export const userRepository: Repository<User> = AppDataSource.getRepository(User)