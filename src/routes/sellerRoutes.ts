import express, { Request, Router, Response } from "express"
import statusCodes from "../statusCodes/statusCodes"
import { AppDataSource } from "../dataSource"
import { User } from "../models/users"
import getCustomUser from "../utils/customUser"
import { Seller } from "../models/sellers"

const router: Router = express.Router()
router.route("").get(async (req: Request, res: Response) => {
    try {
        const sellerRepository = AppDataSource.getRepository(Seller)
        const sellers = await sellerRepository.find(
            {
                relations: {
                    user: true
                }
            }
        )
        res.status(statusCodes.HTTP_200_OK).json(sellers)
    }
    catch (err) {
        console.log(err)
        res.status(statusCodes.HTTP_500_INTERNAL_SERVER_ERROR).json({ err: err })
    }
}
)
// create sellers
router.post("/create/:userId", async (req: Request, res: Response) => {
    const { userId } = req.params
    const { isSeller } = req.body
    // const user: User | null = await getCustomUser(Number(userId))
    const sellerRepository = AppDataSource.getRepository(Seller)
    try {
        if (req.session.user) {
            const sellerExists = await sellerRepository.findOne({
                where: {
                    user: req.session.user
                }
            })
            if (!sellerExists) {
                const seller = new Seller()
                seller.user = req.session.user
                seller.isSeller = isSeller
                sellerRepository.save(seller)
                res.status(statusCodes.HTTP_200_OK).json(
                    seller
                )
            }
            else {
                res.status(statusCodes.HTTP_400_BAD_REQUEST).json({ msg: "seller already exists" })
            }

        }
        else {
            res.status(statusCodes.HTTP_404_NOT_FOUND).json({ msg: `user with id ${userId} doesnt exist` })
        }
    }
    catch (err) {
        res.status(statusCodes.HTTP_500_INTERNAL_SERVER_ERROR).json({ err: err })

    }

})
export { router as sellerRoutes }