import express, { Router } from "express"
import { Request, Response, NextFunction } from "express"
import { User } from "../models/users"
import { AppDataSource } from ".."
import * as bycrypt from "bcrypt"
import hashPassword from "../utils/hashPassword"
const router = express.Router()
router.route("").post(async (req: Request, res: Response, next: NextFunction) => {
    let data: { username: string, password: string, email: string } = req.body
    let { username, password, email } = data

    const user = new User()
    user.username = username
    user.password = await hashPassword(password)
    user.email = email
    try {


        const userRepository = AppDataSource.getRepository(User)
        const userExist = await userRepository.findOneBy({
            email: email,
        })

        if (!userExist) {
            await userRepository.save(user)
            res.status(200).json({ msg: `user created successfully` })
        }
        else {
            res.status(400).json({ msg: "user exists" })
        }
    }
    catch (err) {
        res.status(404).json({ msg: "bad Request" })
    }
}).get(async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.find({
            select: {
                id: true,
                username: true,
                email: true
            }
        })

        res.status(200).json(users)

    }
    catch (err) {
        res.status(400).json(err)

    }

})
export { router as userRoutes }