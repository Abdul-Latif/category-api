import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NoteEntity } from "./note.entity";

@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => NoteEntity, (note) => note.category)
    note: NoteEntity[]
}