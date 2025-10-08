import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entity/category.entity';
import { NoteEntity } from 'src/entity/note.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity, NoteEntity])],
    controllers: [CategoryController],
    providers: [CategoryService]
})
export class CategoryModule { }
