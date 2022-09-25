import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// export const createOrderedProducts = () => {
//     return sequelize.define("Ordered", {
// 
//     })
// }
@Entity()
export class product {
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        length: 100,
    })
    title: string
    @Column()
    image: string
    @Column()
    description: string
    @Column()
    price: number
    // @ManyToOne(() => Seller, (seller) => seller.product)

}