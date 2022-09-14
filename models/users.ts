import { sequelize } from "./connection"
import { DataTypes, Sequelize } from "sequelize"
export const createUser = () => {
    return sequelize.define("User", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
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