import { Controller, Post, Get, Put, Delete, Param, Body, } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto/create-categories.dto'; 
import { UpdateCategoriesDto } from './dto/update-categories.dto'
import { Category } from './schemas/category.schema';



@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() createCategoriesDto: CreateCategoriesDto) {
    return this.categoriesService.create(createCategoriesDto);
  }

  @Get()
  async findAllCategories(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
async findCategoryById(@Param('id') id: string): Promise<Category | null> {
  return this.categoriesService.findOne(id);
}

  @Put(':id')
  async updateCategory(@Param('id') id: string,@Body() updateCategoriesDto: UpdateCategoriesDto
  ) {
    return this.categoriesService.update(id, updateCategoriesDto);
  }

  @Delete(':id')
  async removeCategory(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}


