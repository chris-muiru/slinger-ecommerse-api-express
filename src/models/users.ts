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

    @Column()
    password: string

}

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number
    isAdmin: boolean
    @OneToOne(() => User)
    @JoinColumn()
    user: User
}
@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number
    isCustomer: boolean
    @OneToOne(() => User)
    @JoinColumn()
    user: User
}

@Entity()
export class Seller {
    @PrimaryGeneratedColumn()
    id: number
    isSeller: boolean
    @OneToOne(() => User)
    @JoinColumn()
    user: User
}

