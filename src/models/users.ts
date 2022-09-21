import bycrypt from "bcrypt"
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"

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
    @Column({
        select: false
    })
    password: string

}

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    isAdmin: boolean
    @OneToOne(() => User)
    @JoinColumn({ name: "admin_id" })
    user: User
}
@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    isCustomer: boolean
    @OneToOne(() => User)
    @JoinColumn({ name: "customer_id" })
    user: User
}

@Entity()
export class Seller {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    isSeller: boolean
    @OneToOne(() => User)
    @JoinColumn({ name: "seller_id" })
    user: User
}

