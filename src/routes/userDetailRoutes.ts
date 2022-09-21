import express, { Request, Response, Router } from "express"
import { User } from "../models/users"
import { AppDataSource } from ".."
import hashPassword from "../utils/hashPassword"
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
        res.status(200).json(user || {})

    }
    catch (err) {
        res.status(400).json({ err: "bad request" })

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
            //todo: use repository.update() to update fields
            user.username = username || user.username
            user.email = email || user.email
            user.password = await hashPassword(password) || user.password

            userRepository.save(user)
            res.status(200).json({ msg: "updated successfully" })
        }
        else {
            res.status(400).json({ msg: `user with id:${userId} doesnt exist` })
        }
    } catch (err) {
        res.status(400).json({ err: "bad request" })
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
            res.status(200).json({ msg: "user removed successfully" })
        }
        else {
            res.status(400).json({ msg: `user with id:${userId} doesnt exist` })
        }
    } catch (err) {
        res.status(400).json({ err: "bad request" })

    }


})

export { router as userDetailRoutes }