import * as bycrypt from "bcrypt"
const hashPassword = async (password: string) => {
    return await bycrypt.hash(password, 10)
}
export default hashPassword