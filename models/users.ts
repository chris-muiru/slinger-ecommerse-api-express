import { sequelize } from "./connection"
import bycrypt from "bcrypt"
import { DataTypes, Sequelize } from "sequelize"
export const createUser = () => {
    return sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        }
    }, {
        hooks: {
            beforeCreate: (user) => {
                const password = user.get("password")
                if (typeof password === "string") {
                    const salt = bycrypt.genSaltSync(10, "a")
                    const hash = bycrypt.hashSync(password, salt)
                    console.log(hash)
                    user.setDataValue("password", hash)
                }


            },
            beforeUpdate: (user) => {
                const password = user.get("password")
                if (typeof password === "string") {
                    const salt = bycrypt.genSaltSync(10, "a")
                    const hash = bycrypt.hashSync(password, salt)
                    console.log(hash)
                    user.setDataValue("password", hash)
                }


            }
        }
    })
}

export const createAdmin = () => {
    return sequelize.define("Admin", {
        isAdmin: DataTypes.BOOLEAN
    })
}
export const createCustomer = () => {
    return sequelize.define('Customer', {
        isCustomer: {
            type: DataTypes.BOOLEAN,
        }
    })

}
export const createSeller = () => {
    return sequelize.define("Seller", {
        isSeller: {
            type: DataTypes.BOOLEAN
        }
    })
}