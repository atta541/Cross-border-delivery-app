import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { SubcategoriesController } from './subcategory.controller';
import { SubcategoriesService } from './subcategory.service';
import { CategoriesService } from './categories.service';
import { CategorySchema } from './schemas/category.schema';
import { SubcategorySchema } from './schemas/subcategory.schema';
import { ProductsModule } from '@src/products/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: 'Subcategory', schema: SubcategorySchema }]),
    ProductsModule,
  ],
  controllers: [CategoriesController, SubcategoriesController],
  providers: [CategoriesService, SubcategoriesService],
  exports: [CategoriesService, SubcategoriesService],
})
export class CategoriesModule {}
