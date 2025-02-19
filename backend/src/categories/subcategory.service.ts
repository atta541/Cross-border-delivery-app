import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Subcategory, SubcategoryDocument } from './schemas/subcategory.schema';
import { Product, ProductDocument } from '../products/schemas/product.schema';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectModel(Subcategory.name) private readonly subcategoryModel: Model<SubcategoryDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createSubcategoryDto: CreateSubcategoryDto): Promise<Subcategory> {
    const createdSubcategory = await this.subcategoryModel.create(createSubcategoryDto);
    return createdSubcategory;
  }

  async findAll(): Promise<Subcategory[]> {
    return this.subcategoryModel.find().exec();
  }

  async findOne(id: string): Promise<Subcategory> {
    const subcategory = await this.subcategoryModel.findById(id).exec();
    if (!subcategory) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }
    return subcategory;
  }

  async update(id: string, updateSubcategoryDto: UpdateSubcategoryDto): Promise<Subcategory> {
    const updatedSubcategory = await this.subcategoryModel.findByIdAndUpdate(id, updateSubcategoryDto, { new: true });
    if (!updatedSubcategory) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }
    return updatedSubcategory;
  }

  async deleteSubcategory(subcategoryId: string): Promise<void> {
    const subcategory = await this.subcategoryModel.findById(subcategoryId);
    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }

    // Cascade delete associated products
    await this.productModel.deleteMany({ subcategoryId });

    // Now delete the subcategory
    await this.subcategoryModel.findByIdAndDelete(subcategoryId);
  }

  async findProductsBySubcategory(subcategoryId: string): Promise<Product[]> {
    // Fetch products by the given subcategory ID
    const products = await this.productModel.find({ subcategoryId }).exec();
    if (!products.length) {
      throw new NotFoundException(`No products found for subcategory ID ${subcategoryId}`);
    }
    return products;
  }
}
