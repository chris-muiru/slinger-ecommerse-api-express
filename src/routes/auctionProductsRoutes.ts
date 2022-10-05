import express, { Request, Response, Router } from "express"
import { AppDataSource } from "../dataSource"
import { isSeller } from "../middlewares/isSeller"
import { AuctionedProduct } from "../models/auctionedProducts"
import statusCodes from "../statusCodes/statusCodes"
import customSeller from "../utils/customSeller"
const router: Router = express.Router()

router.get("", async (req: Request, res: Response) => {
    const productRepo = AppDataSource.getRepository(AuctionedProduct)
    const products: AuctionedProduct[] = await productRepo.find()
    res.status(statusCodes.HTTP_200_OK).json(products)

})

router.post("/:sellerId", isSeller, async (req: Request, res: Response) => {
    const { sellerId } = req.params
    const { title, description, price } = req.body
    const productRepo = AppDataSource.getRepository(AuctionedProduct)
    const seller = await customSeller(Number(sellerId))

    const productExist = await productRepo.findOneBy({
        title: title
    })
    if (seller) {
        if (productExist) {
            res.status(statusCodes.HTTP_403_FORBIDDEN).json({ msg: "product exists" })
        }
        else {
            const product = new AuctionedProduct()
            product.title = title
            product.description = description
            product.price = price
            product.seller = seller
            await productRepo.save(product)
            res.status(statusCodes.HTTP_200_OK).json({ msg: "product auctioned" })
        }
    }
    else {
        res.status(statusCodes.HTTP_404_NOT_FOUND).json({ msg: "seller not found" })

    }


})

export { router as auctionProductRoutes }