import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/dto/update-category.dto';
import { CategoryEntity } from 'src/entity/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async findAll() {
        const cached = await this.cacheManager.get('all-category')
        if (cached) {
            console.log('returninig data from cache');
            return cached;
        }

        const category = await this.categoryRepo.find({ relations: ['note'] })
        console.log("returringii data from db")
        await this.cacheManager.set('all-category', category, 1000000)
        return category;

    }

    findOne(id: number) {
        return this.categoryRepo.findOneBy({ id });
    }

    async addCategory(createCategoryDto: CreateCategoryDto) {
        const category = this.categoryRepo.create(createCategoryDto)
        await this.cacheManager.del('all-category')
        return this.categoryRepo.save(category)
    }

    async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.categoryRepo.findOneBy({ id })
        if (!category) throw new BadRequestException("there is no category by this id")
        await this.cacheManager.del('all-category')
        return this.categoryRepo.update(id, updateCategoryDto)
    }

    async remove(id: number) {
        await this.cacheManager.del('all-category')
        return this.categoryRepo.delete({ id })
    }
}
