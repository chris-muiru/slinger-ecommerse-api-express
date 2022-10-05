import { AppDataSource } from "../dataSource"
import { Customer } from "../models/customers"
const customCustomer = async (customerId: number) => {
    const repo = AppDataSource.getRepository(Customer)
    return await repo.findOneBy({
        id: customerId
    })
}
export default customCustomer