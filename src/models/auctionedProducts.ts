import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Seller } from "./sellers";

@Entity()
export class AuctionedProduct {
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        length: 100,
    })
    title: string
    @Column()
    description: string
    @Column()
    price: number
    @Column({
        default: false
    })
    isBought: boolean
    @ManyToOne(() => Seller)
    seller: Seller
}