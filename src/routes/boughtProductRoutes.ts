import express, { Request, Response, Router } from "express"
import { AppDataSource } from "../dataSource"
import { isSeller } from "../middlewares/isSeller"
import { AuctionedProduct } from "../models/auctionedProducts"
import statusCodes from "../statusCodes/statusCodes"
import customCustomer from "../utils/customCustomer"
import customSeller from "../utils/customSeller"
const router: Router = express.Router()

router.route("").get(async (req: Request, res: Response) => {
    const productRepo = AppDataSource.getRepository(AuctionedProduct)
    const products: AuctionedProduct[] = await productRepo.find()
    res.status(statusCodes.HTTP_200_OK).json(products)

}).post(isSeller, async (req: Request, res: Response) => {
    const { title, description, price } = req.body
    const productRepo = AppDataSource.getRepository(AuctionedProduct)
    const seller = await customSeller(req)
    if (seller) {
        const product = new AuctionedProduct()
        product.title = title
        product.description = description
        product.price = price
        product.seller = seller
        await productRepo.save(product)

        res.status(statusCodes.HTTP_200_OK).json({ msg: "product created" })
    }
    else {
        res.status(statusCodes.HTTP_404_NOT_FOUND).json({ msg: "seller not found" })

    }


})
export { router as boughtProductRoutes }