import { AppDataSource } from "../dataSource"
import { Customer } from "../models/customers"
import { Request } from "express"
const customCustomer = async (req: Request) => {
    const repo = AppDataSource.getRepository(Customer)
    return await repo.findOneBy({
        user: req.session.user
    })
}
export default customCustomer