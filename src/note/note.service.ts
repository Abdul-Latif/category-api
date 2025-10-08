import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteEntity } from 'src/entity/note.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from 'src/dto/create-note.dto';
import { UpdateNoteDto } from 'src/dto/update-note.dto';
import { CategoryEntity } from 'src/entity/category.entity';
import { CategoryModule } from 'src/category/category.module';

@Injectable()
export class NoteService {
    constructor(@InjectRepository(NoteEntity)
    private noteRepo: Repository<NoteEntity>,
        @InjectRepository(CategoryEntity)
        private categoryRepo: Repository<CategoryEntity>) { }

    findAll() {
        return this.noteRepo.find()
    }

    findOne(id: number) {
        return this.noteRepo.findOneBy({ id })
    }

    async createNote(id: number, createNoteDto: CreateNoteDto) {
        const category = await this.categoryRepo.findOneBy({ id })
        if (!category) throw new BadRequestException("there is no cateogory by this id")

        const note = this.noteRepo.create(createNoteDto)
        note.category = category
        return this.noteRepo.save(note)

    }

    async updateNote(id: number, updateNoteDto: UpdateNoteDto) {

        const category = await this.categoryRepo.findOneBy({ id: id });
        if (!category) throw new BadRequestException("Category not found");


        const note = await this.noteRepo.findOne({
            where: { category: { id: id } }
        });

        if (!note) throw new BadRequestException("No note found in this category");
        Object.assign(note, updateNoteDto);
        return await this.noteRepo.save(note);
    }


    remove(id: number) {
        return this.noteRepo.delete({ id })
    }
}
