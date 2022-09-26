import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../dataSource";
import { Seller } from "../models/sellers";
import statusCodes from "../statusCodes/statusCodes"


export const isSeller = async (req: Request, res: Response, next: NextFunction) => {
    const sellerRepo = AppDataSource.getRepository(Seller)
    const seller = await sellerRepo.findOneBy({
        user: req.session.user
    })
    if (seller || req.session.isSuperUser) {
        next()
    } else {
        res.status(statusCodes.HTTP_401_UNAUTHORISED).json({ message: "not authenticated" })
    }

}