import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = await this.productModel.create(createProductDto);
    return createdProduct;
  }

  async findAll(): Promise<Product[]> {
    
    return this.productModel.find();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }


  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true });
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    console.log(`Deleting product: ${deletedProduct}`); // Add logging here
    if (!deletedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async findBySubcategory(subcategoryId: string): Promise<Product[]> {
    return this.productModel.find({ subcategoryId });
  }
}



// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { CreateProductDto } from './dto/create-product.dto';
// import { Product, ProductDocument } from './schemas/product.schema';
// import { UpdateProductDto } from './dto/update-product.dto';

// @Injectable()
// export class ProductsService {
//   constructor(
//     @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
//   ) {}

//   async create(createProductDto: CreateProductDto): Promise<Product> {
//     const createdProduct = await this.productModel.create(createProductDto);
//     return createdProduct;
//   }

//   async findByProductUrlOrName(name: string, productUrl: string): Promise<Product | null> {
//     return this.productModel.findOne({ $or: [{ name }, { productUrl }] }).exec();
//   }

//   async createOrUpdate(productData: Partial<Product>): Promise<Product> {
//     const existingProduct = await this.findByProductUrlOrName(productData.name, productData.productUrl);
//     if (existingProduct) {
//       console.log(`✅ Product already exists: ${productData.name}`);
//       return existingProduct;
//     }
//     const newProduct = new this.productModel(productData);
//     return newProduct.save();
//   }



//     async findAll(): Promise<Product[]> {
//     return this.productModel.find();
//   }




//     // Delete all products
//     async deleteAll(): Promise<{ deletedCount: number }> {
//       const result = await this.productModel.deleteMany();
//       return result;
//     }


// }
