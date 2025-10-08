import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from 'src/dto/create-note.dto';
import { UpdateNoteDto } from 'src/dto/update-note.dto';

@Controller('note')
export class NoteController {
    constructor(private noteService: NoteService) { }

    @Get()
    findAll() {
        return this.noteService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.noteService.findOne(id)
    }

    @Post(":id")
    createNote(@Param('id') id: number, @Body() createNoteDto: CreateNoteDto) {
        return this.noteService.createNote(id, createNoteDto)
    }

    @Patch(':id')
    updateNoteByCategory(@Param('id') id: number, @Body() updateNoteDto: UpdateNoteDto) {
        return this.noteService.updateNoteByCategory(id, updateNoteDto)
    }

    @Patch("update/:id")
    updateNote(@Param('id') id: number, @Body() updateNoteDto: UpdateNoteDto) {
        return this.noteService.updateNote(id, updateNoteDto)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.noteService.remove(id)
    }
}
