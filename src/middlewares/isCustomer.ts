import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../dataSource";
import { Customer } from "../models/customers";
import statusCodes from "../statusCodes/statusCodes"


export const isCustomer = async (req: Request, res: Response, next: NextFunction) => {
    const customerRepo = AppDataSource.getRepository(Customer)
    const customer = await customerRepo.findOneBy({
        user: req.session.user
    })
    if (customer || req.session.isSuperUser) {
        next()
    } else {
        res.status(statusCodes.HTTP_401_UNAUTHORISED).json({ message: "not authenticated" })
    }

}