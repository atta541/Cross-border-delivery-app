import { Controller, Post, Get, Put, Delete, Param, Body ,  HttpCode, HttpStatus} from '@nestjs/common';
import { SubcategoriesService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Post()
  async createSubcategory(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.subcategoriesService.create(createSubcategoryDto);
  }

  @Get()
  async findAllSubcategories() {
    return this.subcategoriesService.findAll();
  }

  @Get(':id')
  async findSubcategoryById(@Param('id') id: string) {
    return this.subcategoriesService.findOne(id);
  }

  @Put(':id')
  async updateSubcategory(@Param('id') id: string, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.subcategoriesService.update(id, updateSubcategoryDto);
  }


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) 
  async deleteSubcategory(@Param('id') id: string): Promise<void> {
    return this.subcategoriesService.deleteSubcategory(id);
  }

  
}
