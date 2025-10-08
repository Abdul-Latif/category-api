import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { CategoryModule } from './category/category.module';
import { NoteController } from './note/note.controller';
import { NoteService } from './note/note.service';
import { NoteModule } from './note/note.module';


@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), CategoryModule, NoteModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
