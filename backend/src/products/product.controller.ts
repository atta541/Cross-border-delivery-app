import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode } from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAllProducts() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findProductById(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }


  @Delete(':id')
  @HttpCode(204)
  async removeProduct(@Param('id') id: string): Promise<void> {
    await this.productsService.remove(id);
    return;
  }


  @Get('/subcategory/:subcategoryId')
  async findBySubcategory(@Param('subcategoryId') subcategoryId: string): Promise<Product[]> {
    return this.productsService.findBySubcategory(subcategoryId);
  }
}




// import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode } from '@nestjs/common';
// import { ProductsService } from './product.service';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
// import { Product } from './schemas/product.schema';
// import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

// @ApiTags('products')  // Group all endpoints under 'products' in Swagger
// @Controller('products')
// export class ProductsController {
//   constructor(private readonly productsService: ProductsService) {}

//   @Post()
//   @ApiOperation({ summary: 'Create a new product' })
//   @ApiResponse({ status: 201, description: 'Product successfully created.' })
//   @ApiResponse({ status: 400, description: 'Invalid data.' })
//   async createProduct(@Body() createProductDto: CreateProductDto) {
//     return this.productsService.create(createProductDto);
//   }

//   @Get()
//   @ApiOperation({ summary: 'Retrieve all products' })
//   @ApiResponse({ status: 200, description: 'Products retrieved successfully.' })
//   async findAllProducts() {
//     return this.productsService.findAll();
//   }

  // @Get(':id')
  // @ApiOperation({ summary: 'Retrieve a product by ID' })
  // @ApiParam({ name: 'id', description: 'The ID of the product to retrieve' })
  // @ApiResponse({ status: 200, description: 'Product retrieved successfully.' })
  // @ApiResponse({ status: 404, description: 'Product not found.' })
  // async findProductById(@Param('id') id: string) {
  //   return this.productsService.findOne(id);
  // }

  // @Put(':id')
  // @ApiOperation({ summary: 'Update a product by ID' })
  // @ApiParam({ name: 'id', description: 'The ID of the product to update' })
  // @ApiResponse({ status: 200, description: 'Product successfully updated.' })
  // @ApiResponse({ status: 404, description: 'Product not found.' })
  // async updateProduct(
  //   @Param('id') id: string,
  //   @Body() updateProductDto: UpdateProductDto,
  // ) {
  //   return this.productsService.update(id, updateProductDto);
  // }

  // @Delete(':id')
  // @HttpCode(204)
  // @ApiOperation({ summary: 'Delete a product by ID' })
  // @ApiParam({ name: 'id', description: 'The ID of the product to delete' })
  // @ApiResponse({ status: 204, description: 'Product successfully deleted.' })
  // @ApiResponse({ status: 404, description: 'Product not found.' })
  // async removeProduct(@Param('id') id: string): Promise<void> {
  //   await this.productsService.remove(id);
  //   return;
  // }

  // @Get('/subcategory/:subcategoryId')
  // @ApiOperation({ summary: 'Retrieve products by subcategory ID' })
  // @ApiParam({ name: 'subcategoryId', description: 'The subcategory ID to filter products' })
  // @ApiResponse({ status: 200, description: 'Products retrieved successfully.' })
  // async findBySubcategory(@Param('subcategoryId') subcategoryId: string): Promise<Product[]> {
  //   return this.productsService.findBySubcategory(subcategoryId);
  // }
// }
