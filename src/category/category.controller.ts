import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/dto/update-category.dto';


@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Get()
    findAll() {
        return this.categoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.categoryService.findOne(id);
    }

    @Post()
    addCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.addCategory(createCategoryDto)
    }

    @Patch(':id')
    updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.updateCategory(id, updateCategoryDto)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.categoryService.remove(id)
    }

}

