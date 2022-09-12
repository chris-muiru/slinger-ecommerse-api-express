import { Column, Entity, PrimaryGeneratedColumn } from "../node_modules/typeorm/index"
@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    description: string
    @Column()
    filename: string
    @Column()
    views: number
    @Column()
    isPublished: boolean

}