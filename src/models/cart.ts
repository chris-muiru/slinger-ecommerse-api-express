import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order";
import { Customer } from "./customers";

@Entity()
export class cart {
    @PrimaryGeneratedColumn()
    id: number

    @UpdateDateColumn()
    boughtAt: Date
    @OneToOne(() => Customer)
    customer: Customer
    @ManyToOne(() => Order)
    order: Order
}