import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteEntity } from 'src/entity/note.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from 'src/dto/create-note.dto';
import { UpdateNoteDto } from 'src/dto/update-note.dto';
import { CategoryEntity } from 'src/entity/category.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';



@Injectable()
export class NoteService {
    constructor(@InjectRepository(NoteEntity)
    private noteRepo: Repository<NoteEntity>,
        @InjectRepository(CategoryEntity)
        private categoryRepo: Repository<CategoryEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async findAll() {
        const cached = this.cacheManager.get('all-notes')
        if (cached) return cached;

        const note = this.noteRepo.find()
        await this.cacheManager.set('all-notes', note, 100000)
    }

    findOne(id: number) {
        return this.noteRepo.findOneBy({ id })
    }

    async createNote(id: number, createNoteDto: CreateNoteDto) {
        const category = await this.categoryRepo.findOneBy({ id })
        if (!category) throw new BadRequestException("there is no cateogory by this id")

        const note = this.noteRepo.create(createNoteDto)
        note.category = category
        await this.cacheManager.del('all-notes')
        return this.noteRepo.save(note)

    }

    async updateNoteByCategory(id: number, updateNoteDto: UpdateNoteDto) {

        const category = await this.categoryRepo.findOneBy({ id });
        if (!category) throw new BadRequestException("Category not found");


        const note = await this.noteRepo.findOne({
            where: { category: { id: id } }
        });

        await this.cacheManager.del('all-notes')

        if (!note) throw new BadRequestException("No note found in this category");
        category.note = [note];
        Object.assign(note, updateNoteDto)
        return this.categoryRepo.save(category)

    }

    async updateNote(id: number, updateNoteDto: UpdateNoteDto) {
        const note = this.noteRepo.findOneBy({ id })
        if (!note) throw new BadRequestException("no note by this id")
        await this.cacheManager.del('all-notes')
        return this.noteRepo.update(id, updateNoteDto)
    }


    async remove(id: number) {
        await this.cacheManager.del('all-notes')
        return this.noteRepo.delete({ id })
    }
}
