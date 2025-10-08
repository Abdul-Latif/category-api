import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/dto/update-category.dto';
import { CategoryEntity } from 'src/entity/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>) { }

    findAll() {
        return this.categoryRepo.find({ relations: ['note'] });
    }

    findOne(id: number) {
        return this.categoryRepo.findOneBy({ id });
    }

    addCategory(createCategoryDto: CreateCategoryDto) {
        const category = this.categoryRepo.create(createCategoryDto)
        return this.categoryRepo.save(category)
    }

    async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.categoryRepo.findOneBy({ id })
        if (!category) throw new BadRequestException("there is no category by this id")
        return this.categoryRepo.update(id, updateCategoryDto)
    }

    async remove(id: number) {
        return this.categoryRepo.delete({ id })
    }
}
