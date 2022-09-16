import { Request, Response, NextFunction } from "express";
import { User } from "../models/connection";

type Auth = {
    username: string,
    password: string
}
export const Authentication = async (req: Request, res: Response, next: NextFunction) => {
    let data: Auth = req.body
    let user = await User.findOne({
        where: {
            username: data.username
        }
    })
    res.status(200).json(data)

}
export const dumbUser = async () => {
    let user = User.findOne({
        where: {
            username: "kris"
        }
    })
    return user
}

