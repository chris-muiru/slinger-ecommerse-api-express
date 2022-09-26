import { AppDataSource } from "../dataSource"
import { User } from "../models/users"

const getCustomUser = async (userId: number) => {
    const userRepository = AppDataSource.getRepository(User)
    return await userRepository.findOneBy({
        id: userId
    })
}
export default getCustomUser