import express, { Router } from "express"
import { Request, Response, NextFunction } from "express"
import { User } from "../models/users"
import hashPassword from "../utils/hashPassword"
import statusCodes from "../../statusCodes/statusCodes"
import { AppDataSource } from "../dataSource"
const router = express.Router()
router.route("").post(async (req: Request, res: Response, next: NextFunction) => {
    let { username, password, email } = req.body

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
            res.status(statusCodes.HTTP_200_OK).json({ msg: `user created successfully` })
        }
        else {
            res.status(statusCodes.HTTP_400_BAD_REQUEST).json({ msg: "user exists" })
        }
    }
    catch (err) {
        res.status(statusCodes.HTTP_500_INTERNAL_SERVER_ERROR).json({ msg: "bad Request" })
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

        res.status(statusCodes.HTTP_200_OK).json(users)

    }
    catch (err) {
        res.status(statusCodes.HTTP_500_INTERNAL_SERVER_ERROR).json(err)

    }

})
export { router as userRoutes }