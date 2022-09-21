import express, { Request, Response, Router } from "express"
import { AppDataSource } from ".."
import { Customer, User } from "../models/users"
import getCustomUser from "../utils/customUser"

// TODO: prevent duplicate query inserts in both user and customer creation functions
const router: Router = express.Router()
router.route("").get(async (req: Request, res: Response) => {
    try {
        const customerRepository = AppDataSource.getRepository(Customer)
        const customers = await customerRepository.find(
            {
                relations: {
                    user: true
                }
            }
        )
        res.status(200).json(customers)
    }
    catch (err) {
        console.log(err)
        res.status(404).json({ err: err })
    }
}
)
// create customers
router.post("/create/:userId", async (req: Request, res: Response) => {
    const { userId } = req.params
    const { isCustomer } = req.body
    const user: User | null = await getCustomUser(Number(userId))
    const customerRepository = AppDataSource.getRepository(Customer)
    try {
        if (user) {
            const customer = new Customer()
            customer.user = user
            customer.isCustomer = isCustomer
            customerRepository.save(customer)
            res.status(200).json(
                customer
            )
        }
        else {
            res.status(400).json({ msg: `user with id ${userId} doesnt exist` })
        }
    }
    catch (err) {
        res.status(404).json({ err: err })

    }

})

export { router as customerRoutes }