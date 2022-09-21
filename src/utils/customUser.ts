import { AppDataSource } from ".."
import { User } from "../models/users"

const getCustomUser = async (userId: number) => {
    const dumbUserRepository = AppDataSource.getRepository(User)
    return await dumbUserRepository.findOneBy({
        id: userId
    })
}
export default getCustomUser