import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { Admin } from "../models/admins";
import { User } from "../models/users";
import statusCodes from "../statusCodes/statusCodes";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user: User | undefined = req.session.user
    const adminRepo = AppDataSource.getRepository(Admin)
    if (user) {
        //TODO: think if i need to check the isAdmin field in Admin entity
        const adminQuery = await adminRepo.findOne({
            where: {
                user: user
            },
        })

        if (adminQuery) {
            next()
        }
        else {
            res.status(statusCodes.HTTP_401_UNAUTHORISED).json({ msg: "not authorized" })
        }
    }
}