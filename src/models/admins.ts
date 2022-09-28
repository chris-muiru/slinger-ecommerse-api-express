import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./users"
@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        default: false
    })
    isAdmin: boolean
    @OneToOne(() => User, (user) => user.admin)
    @JoinColumn({ name: "admin_id" })
    user: User
}