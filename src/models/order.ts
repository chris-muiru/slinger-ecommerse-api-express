import { Entity, OneToOne, ManyToOne, PrimaryGeneratedColumn, JoinColumn, Column } from "typeorm";
import { Customer } from "./customers";
import { AuctionedProduct } from "./auctionedProducts";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        default: 1
    })
    quantity: number
    @Column({
        default: "pending"
    })
    order_status: "pending" | "success" | "declined"
    @OneToOne(() => AuctionedProduct)
    @JoinColumn()
    product: AuctionedProduct
    @ManyToOne(() => Customer)
    customer: Customer

}