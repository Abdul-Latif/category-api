import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { CategoryModule } from './category/category.module';
import { NoteModule } from './note/note.module';
import { CacheModule } from '@nestjs/cache-manager';



@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), CacheModule.register({
    ttl: 10000,
    isGlobal: true,
    max: 100,
  }),
    CategoryModule, NoteModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
