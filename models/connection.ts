import { Sequelize } from 'sequelize'
import { createOrderedProducts, createProduct } from './products';
import { createAdmin, createCustomer, createSeller, createUser } from './users';
export const sequelize = new Sequelize('postgres://kris:Cm@postgres@127.0.0.1:5432/ecommerseDb', {
    logging: false
})

export const User = createUser()
export const Customer = createCustomer()
export const Product = createProduct()
export const Admin = createAdmin()
export const Seller = createSeller()
export const OrderedProduct = createOrderedProducts()

// relationships
User.hasOne(Customer, {
    onDelete: 'CASCADE',
    foreignKey: {
        allowNull: false
    }

})
Customer.belongsTo(User)
User.hasOne(Admin, {
    onDelete: 'CASCADE',
    foreignKey: {
        allowNull: false
    }
})
Admin.belongsTo(User)

User.hasOne(Seller, {
    onDelete: 'CASCADE',
    foreignKey: {
        allowNull: false
    }
})
Seller.belongsTo(User)

Seller.hasOne(Product, {
    onDelete: 'CASCADE',
    foreignKey: {
        allowNull: false
    }
})
Product.belongsTo(Seller)

Customer.hasOne(OrderedProduct)
OrderedProduct.belongsTo(Customer)

Product.hasOne(OrderedProduct)
OrderedProduct.belongsTo(Product)

export const createConnection = async () => {
    try {
        await sequelize.authenticate();
        sequelize.sync({ alter: true })
        console.log('Database Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}