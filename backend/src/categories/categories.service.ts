import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema'; 
import { CreateCategoriesDto } from './dto/create-categories.dto'; 
import { UpdateCategoriesDto } from './dto/update-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  // Create a new category
  async create(createCategoriesDto: CreateCategoriesDto): Promise<Category> {
    const newCategory = await this.categoryModel.create(createCategoriesDto);
    // await newCategory.save();
    return newCategory;
  }

  // Get all categories
  async findAll(): Promise<Category[]> {
    return this.categoryModel.find();
  }

  // Get a category by ID
  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  // Update a category by ID
  async update(id: string, updateCategoriesDto: UpdateCategoriesDto): Promise<Category> {
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, updateCategoriesDto, { new: true });
    if (!updatedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return updatedCategory;
  }



  async remove(id: string): Promise<void> {
    const result = await this.categoryModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    // Optionally return a success message or nothing
    return; // or you can return undefined explicitly
  }
  
}
