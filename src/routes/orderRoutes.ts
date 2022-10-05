import express, { Request, Response, Router } from "express"
import { AppDataSource } from "../dataSource"
import { isSeller } from "../middlewares/isSeller"
import { AuctionedProduct } from "../models/auctionedProducts"
import { Order } from "../models/order"
import { Customer } from "../models/customers"
import statusCodes from "../statusCodes/statusCodes"
import customCustomer from "../utils/customCustomer"
import customSeller from "../utils/customSeller"
const router: Router = express.Router()

router.get("", async (req: Request, res: Response) => {
    const orderRepo = AppDataSource.getRepository(Order)
    const products: Order[] = await orderRepo.find({
        relations: {
            product: true,
            customer: true
        }
    })
    res.status(statusCodes.HTTP_200_OK).json(products)

})

router.post("/:customerId/:auctionProductId", isSeller, async (req: Request, res: Response) => {
    interface orderInterface {
        quantity: number
    }
    const { quantity }: orderInterface = req.body
    const { customerId, auctionProductId } = req.params
    const orderRepo = AppDataSource.getRepository(Order)
    const productRepo = AppDataSource.getRepository(AuctionedProduct)
    const product = await productRepo.findOneBy({
        id: Number(auctionProductId)
    })
    const customer = await customCustomer(Number(customerId))

    if (customer) {
        if (product) {
            const orderExist = await orderRepo.findOneBy({
                product: product
            })
            if (orderExist) {
                res.status(statusCodes.HTTP_400_BAD_REQUEST).json({ msg: "order already exists" })
            } else {
                product.isBought = true
                productRepo.save(product)
                const order = new Order()
                order.customer = customer
                order.quantity = quantity
                order.product = product
                orderRepo.save(order)
                res.status(statusCodes.HTTP_200_OK).json({ msg: "order created" })
            }
        } else {
            res.status(statusCodes.HTTP_400_BAD_REQUEST).json({ msg: "auction product doesnt not exist" })

        }

    }
    else {
        res.status(statusCodes.HTTP_404_NOT_FOUND).json({ msg: "customer not found" })

    }


})
export { router as orderRoutes }