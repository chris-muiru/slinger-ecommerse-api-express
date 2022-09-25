import express, { Request, Response, Router } from "express";
import statusCodes from "../statusCodes/statusCodes";
import { AppDataSource } from "../dataSource";
import { Customer } from "../models/customers";

const router: Router = express.Router()
router.route("/:customerId").get(async (req: Request, res: Response) => {
    const { customerId } = req.params
    const customerRepository = AppDataSource.getRepository(Customer)
    try {
        const customer: Customer[] = await customerRepository.find({
            relations: {
                user: true
            }, where: {
                id: Number(customerId)
            }
        })
        res.status(200).json(customer)
    } catch (err) {
        res.status(statusCodes.HTTP_400_BAD_REQUEST).json({ err: "bad request" })

    }
}).put(async (req: Request, res: Response) => {
    const { customerId } = req.params
    const customerRepository = AppDataSource.getRepository(Customer)
    const { isCustomer } = req.body
    try {
        const customer: Customer | null = await customerRepository.findOne({
            where: {
                id: Number(customerId)
            }
        })
        if (customer) {
            customer.isCustomer = isCustomer
            customerRepository.save(customer)
            res.status(statusCodes.HTTP_200_OK).json(customer)
        } else {
            res.status(statusCodes.HTTP_404_NOT_FOUND).json({ msg: "customer doesnt exist" })

        }
    } catch (err) {
        res.status(statusCodes.HTTP_400_BAD_REQUEST).json({ err: "bad request" })

    }
}).delete(async (req: Request, res: Response) => {
    const { customerId } = req.params
    const customerRepository = AppDataSource.getRepository(Customer)
    const customer: Customer | null = await customerRepository.findOne({
        where: {
            id: Number(customerId)
        }
    })
    if (customer) {
        customerRepository.delete(customer)
        res.status(statusCodes.HTTP_200_OK).json({ msg: "customer deleted successfully" })
    } else {
        res.status(statusCodes.HTTP_404_NOT_FOUND).json({ msg: "customer doesnt exist" })
    }

})

export { router as customerDetailRoutes }