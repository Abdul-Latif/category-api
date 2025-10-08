import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";

@Entity('note')
export class NoteEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    content: string;
    @Column()
    favourit: boolean;
    @ManyToOne(() => CategoryEntity, (category) => category.note)
    category: CategoryEntity
}