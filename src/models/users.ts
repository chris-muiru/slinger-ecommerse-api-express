import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Admin } from "./admins"
import { Customer } from "./customers"

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
    @OneToOne(() => Admin, (admin) => admin.user)
    customer: Customer
}




