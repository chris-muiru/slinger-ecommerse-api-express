import { AppDataSource } from "../dataSource"
import { Request } from "express"
import { Seller } from "../models/sellers"
const customSeller = async (sellerId: number) => {
    const repo = AppDataSource.getRepository(Seller)
    return repo.findOneBy({
        id: sellerId
    })
}
export default customSeller