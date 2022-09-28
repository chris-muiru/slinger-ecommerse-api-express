import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./users"
@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        default: true
    })
    isCustomer: boolean
    @OneToOne(() => User, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "customer_id" })
    user: User
}
