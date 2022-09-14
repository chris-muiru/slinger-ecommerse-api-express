import { DataTypes } from "sequelize"
import { sequelize } from "./connection"

export const createProduct = () => {
    return sequelize.define("Product", {
        title: {
            type: DataTypes.STRING(100)
        },
        image: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.FLOAT
    })

}
export const createOrderedProducts = () => {
    return sequelize.define("Ordered", {

    })
}