import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { Admin } from "../models/admins";
import { User } from "../models/users";
import statusCodes from "../statusCodes/statusCodes";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user: User | undefined = req.session.user
    const adminRepo = AppDataSource.getRepository(Admin)
    if (user) {

        const adminQuery = await adminRepo.findOne({
            where: {
                user: user
            },
            select: {
                id: true,
                isAdmin: true
            }
        })
        console.log(adminQuery)
        if (adminQuery && adminQuery.isAdmin) {
            console.log(req.session.user?.admin)
            console.log("is admin")
            next()
        }
        else {
            console.log("not admin")
            res.status(statusCodes.HTTP_401_UNAUTHORISED).json({ msg: "not authorized" })
        }
    }
}