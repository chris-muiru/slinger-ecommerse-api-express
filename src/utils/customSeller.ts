import { AppDataSource } from "../dataSource"
import { Request } from "express"
import { Seller } from "../models/sellers"
const customSeller = async (req: Request) => {
    const repo = AppDataSource.getRepository(Seller)
    return repo.findOneBy({
        user: req.session.user
    })
}
export default customSeller