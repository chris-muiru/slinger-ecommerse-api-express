import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Admin } from "./admins"
import { Customer } from "./customers"
import { Seller } from "./sellers"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 50
    })
    username: string

    @Column()
    email: string
    @Column()
    password: string
    @OneToOne(() => Admin, (admin) => admin.user)
    admin: Admin
    @OneToOne(() => Customer, (customer) => customer.user)
    customer: Customer
    @OneToOne(() => Seller, (seller) => seller.user)
    seller: Seller
}




