import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./users"
@Entity()
export class Seller {
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        default: false
    })
    isSeller: boolean
    @OneToOne(() => User)
    @JoinColumn({ name: "seller_id" })
    user: User
}
