import express, { Request, Response, Router } from "express";
import statusCodes from "../../statusCodes/statusCodes";
import { AppDataSource } from "../dataSource";
import { Seller } from "../models/users";

const router: Router = express.Router()
router.route("/:sellerId").get(async (req: Request, res: Response) => {
    const { sellerId } = req.params
    const sellerRepository = AppDataSource.getRepository(Seller)
    try {
        const seller: Seller[] = await sellerRepository.find({
            relations: {
                user: true
            }, where: {
                id: Number(sellerId)
            }
        })
        res.status(200).json(seller)
    } catch (err) {
        res.status(statusCodes.HTTP_400_BAD_REQUEST).json({ err: "bad request" })

    }
}).put(async (req: Request, res: Response) => {
    const { sellerId } = req.params
    const sellerRepository = AppDataSource.getRepository(Seller)
    const { isSeller } = req.body
    try {
        const seller: Seller | null = await sellerRepository.findOne({
            where: {
                id: Number(sellerId)
            }
        })
        if (seller) {
            seller.isSeller = isSeller
            sellerRepository.save(seller)
            res.status(statusCodes.HTTP_200_OK).json(seller)
        } else {
            res.status(statusCodes.HTTP_404_NOT_FOUND).json({ msg: "seller doesn't exist" })

        }
    } catch (err) {
        res.status(statusCodes.HTTP_400_BAD_REQUEST).json({ err: "bad request" })

    }
}).delete(async (req: Request, res: Response) => {
    const { sellerId } = req.params
    const sellerRepository = AppDataSource.getRepository(Seller)
    const seller: Seller | null = await sellerRepository.findOne({
        where: {
            id: Number(sellerId)
        }
    })
    if (seller) {
        sellerRepository.delete(seller)
        res.status(statusCodes.HTTP_200_OK).json({ msg: "seller deleted successfully" })
    } else {
        res.status(statusCodes.HTTP_404_NOT_FOUND).json({ msg: "seller doesnt exist" })
    }

})

export { router as sellerDetailRoutes }