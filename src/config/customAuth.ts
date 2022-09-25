import express, { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../dataSource"
import { User } from "../models/users"
import * as bcrypt from "bcrypt"
import statusCodes from "../statusCodes/statusCodes"
import { Session } from "express-session";
// import { ISession } from "../types"



export const customAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body

    const userRepo = AppDataSource.getRepository(User)
    let user = await userRepo.findOneBy({
        username: username
    })

    if (user) {
        // TODO: override req.session... of express-session to use the Isession i created
        if (await bcrypt.compare(password, user.password)) {
            req.session.user = user
            req.session.isAuthenticated = true
            res.status(statusCodes.HTTP_200_OK).json({ msg: "authenticated" })
        }
        else {
            res.status(statusCodes.HTTP_401_UNAUTHORISED).json({ msg: "incorrect password" })
        }
    }
    else {
        res.status(statusCodes.HTTP_404_NOT_FOUND).json({ msg: "user not found" })
    }
}