import express, { Request, Response, Router } from "express"
import statusCodes from "../../statusCodes/statusCodes"
import { AppDataSource } from "../dataSource"
import { Customer, User } from "../models/users"
import getCustomUser from "../utils/customUser"

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
        res.status(statusCodes.HTTP_200_OK).json(customers)
    }
    catch (err) {
        console.log(err)
        res.status(statusCodes.HTTP_500_INTERNAL_SERVER_ERROR).json({ err: err })
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
            const customerExists = await customerRepository.findOne({
                where: {
                    user: user
                }
            })
            if (!customerExists) {
                const customer = new Customer()
                customer.user = user
                customer.isCustomer = isCustomer
                customerRepository.save(customer)
                res.status(statusCodes.HTTP_200_OK).json(
                    customer
                )
            }
            else {
                res.status(statusCodes.HTTP_400_BAD_REQUEST).json({ msg: "user already exists" })
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
export { router as customerRoutes }