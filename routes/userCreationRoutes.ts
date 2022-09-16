import express, { Router } from "express"
import { Request, Response, NextFunction } from "express"
import { User } from "../models/connection"

const router = express.Router()

router.route("").post(async (req: Request, res: Response, next: NextFunction) => {
    console.log("works")
    try {
        let instance = await User.create(req.body)
        res.status(200).json({ msg: "user created" })
    }
    catch (err) {
        res.status(404).json(err)

    }


})

export { router as userCreationRoute }