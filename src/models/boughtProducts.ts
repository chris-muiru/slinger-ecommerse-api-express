import { Entity, OneToOne, ManyToOne, PrimaryGeneratedColumn, JoinColumn, Column } from "typeorm";
import { Customer } from "./customers";
import { AuctionedProduct } from "./auctionedProducts";

@Entity()
export class BoughtProducts {
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        default: 1
    })
    quantity: number
    @OneToOne(() => AuctionedProduct)
    @JoinColumn()
    product: AuctionedProduct
    @ManyToOne(() => Customer)
    customer: Customer

}