import { User } from "../models/users";
import { AppDataSource } from "..";

export const userRepository = AppDataSource.getRepository(User)