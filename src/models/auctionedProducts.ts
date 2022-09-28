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
    // @Column()
    // image: string
    @Column()
    description: string
    @Column()
    price: number
    @ManyToOne(() => Seller)
    seller: Seller
}