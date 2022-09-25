import express, { Request, Response, Router } from "express"
import { User } from "../models/users"
import hashPassword from "../utils/hashPassword"
import statusCodes from "../statusCodes/statusCodes"
import { AppDataSource } from "../dataSource"
const router: Router = express.Router()
router.route("/:userId").get(async (req: Request, res: Response) => {
    try {
        const { userId } = req.params

        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({
            where: {
                id: Number(userId)
            },
            select: {
                id: true,
                username: true,
                email: true
            }

        })
        res.status(statusCodes.HTTP_200_OK).json(user || {})

    }
    catch (err) {
        res.status(statusCodes.HTTP_404_NOT_FOUND).json({ err: "bad request" })

    }

}).put(async (req: Request, res: Response) => {
    const { userId } = req.params
    const { username, email, password } = req.body
    try {
        const userRepository = AppDataSource.getRepository(User)
        const user: User | null = await userRepository.findOneBy({
            id: Number(userId)
        })
        if (user) {
            // TODO: use repository.update() to update fields
            user.username = username || user.username
            user.email = email || user.email
            user.password = await hashPassword(password) || user.password

            userRepository.save(user)
            res.status(statusCodes.HTTP_200_OK).json({ msg: "updated successfully" })
        }
        else {
            res.status(statusCodes.HTTP_404_NOT_FOUND).json({ msg: `user with id:${userId} doesnt exist` })
        }
    } catch (err) {
        res.status(statusCodes.HTTP_500_INTERNAL_SERVER_ERROR).json({ err: "bad request" })
    }

}).delete(async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const userRepository = AppDataSource.getRepository(User)
        const user: User | null = await userRepository.findOneBy({
            id: Number(userId)
        })
        if (user) {
            await userRepository.remove(user)
            res.status(statusCodes.HTTP_200_OK).json({ msg: "user removed successfully" })
        }
        else {
            res.status(statusCodes.HTTP_404_NOT_FOUND).json({ msg: `user with id:${userId} doesnt exist` })
        }
    } catch (err) {
        res.status(statusCodes.HTTP_500_INTERNAL_SERVER_ERROR).json({ err: "bad request" })

    }


})

export { router as userDetailRoutes }