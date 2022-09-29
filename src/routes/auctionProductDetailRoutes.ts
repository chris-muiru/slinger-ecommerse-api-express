import express, { Request, Response } from "express"
import { AppDataSource } from "../dataSource"
import { AuctionedProduct } from "../models/auctionedProducts"
import statusCodes from "../statusCodes/statusCodes"
const router = express.Router()

router.route("/:productId").get(async (req: Request, res: Response) => {
    const { productId } = req.params
    const productRepo = AppDataSource.getRepository(AuctionedProduct)
    const product = await productRepo.findOneBy({
        id: Number(productId)
    }) || {}
    res.status(statusCodes.HTTP_200_OK).json(product)
}).put(async (req: Request, res: Response) => {
    const { productId } = req.params
    const { description, price, title } = req.body
    const productRepo = AppDataSource.getRepository(AuctionedProduct)

    const product = await productRepo.findOneBy({
        id: Number(productId)
    })
    if (product) {
        product.description = description || product.description
        product.price = price || product.price
        product.title = title || product.title

        await productRepo.save(product)
        res.status(statusCodes.HTTP_200_OK).json({ msg: "product updated " })
    }
    else {
        res.status(statusCodes.HTTP_404_NOT_FOUND).json({ msg: "product not found" })
    }
}).delete(async (req: Request, res: Response) => {
    const { productId } = req.params
    const productRepo = AppDataSource.getRepository(AuctionedProduct)
    const product = await productRepo.findOneBy({
        id: Number(productId)
    })
    if (product) {
        productRepo.delete(product)
        res.status(statusCodes.HTTP_200_OK).json({ msg: "product deleted successfully" })
    }
    else {
        res.status(statusCodes.HTTP_404_NOT_FOUND).json({ msg: "product not found" })
    }

})
export { router as auctionProductDetailRoutes }