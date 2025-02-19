import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './product.service';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

const mockProductModel = {
  create: jest.fn().mockImplementation((dto) => {
    return {
      ...dto,
      _id: 'aGeneratedProductId',
    };
  }),
  find: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([]),
  }),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue({ _id: 'someId', name: 'productName' }),
  }),
  findByIdAndUpdate: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue({ _id: 'someId', name: 'updatedProductName' }),
  }),
  findByIdAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue({ _id: 'someId', name: 'deletedProductName' }),
  }),
};

describe('ProductsService', () => {
  let service: ProductsService;
  let productModel: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productModel = module.get<Model<Product>>(getModelToken(Product.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const dto = {
      name: 'product1',
      subcategoryId: 'subcategoryId',
      productId: 'productId',
      description: 'Test product description',
      specification: 'Test specification',
      additionalInfo: 'Test additional information',
      price: 100,
      deliverableCities: ['City1', 'City2'],
    };

    const createdProduct = { _id: 'aGeneratedProductId', ...dto };

    mockProductModel.create.mockResolvedValue(createdProduct);

    const result = await service.create(dto);
    expect(result).toEqual(createdProduct);
    expect(mockProductModel.create).toHaveBeenCalledWith(dto);
  });

  it('should return all products', async () => {
    const products = [
      {
        id: 'someId',
        name: 'product1',
        subcategoryId: 'subcategoryId',
        productId: 'productId',
        description: 'Test product description',
        specification: 'Test specification',
        additionalInfo: 'Test additional information',
        price: 100,
        deliverableCities: ['City1', 'City2'],
      },
    ];

    mockProductModel.find.mockResolvedValue(products);

    const result = await service.findAll();
    expect(result).toEqual(products);
  });

  it('should find a product by ID', async () => {
    const product = {
      id: 'someId',
      name: 'product1',
      subcategoryId: 'subcategoryId',
      productId: 'productId',
      description: 'Test product description',
      specification: 'Test specification',
      additionalInfo: 'Test additional information',
      price: 100,
      deliverableCities: ['City1', 'City2'],
    };

    mockProductModel.findById.mockResolvedValue(product);

    const result = await service.findOne('someId');
    expect(result).toEqual(product);
  });

  it('should throw NotFoundException if product not found', async () => {
    mockProductModel.findById.mockResolvedValue(null);

    await expect(service.findOne('nonExistingId')).rejects.toThrow(NotFoundException);
  });

  it('should update a product', async () => {
    const updateDto = { name: 'updatedProductName' };

    mockProductModel.findByIdAndUpdate.mockResolvedValue({ ...updateDto, _id: 'someId' });

    const result = await service.update('someId', updateDto);
    expect(result).toEqual({ ...updateDto, _id: 'someId' });
  });

  it('should throw NotFoundException if updating non-existing product', async () => {
    mockProductModel.findByIdAndUpdate.mockResolvedValue(null);

    await expect(service.update('nonExistingId', {})).rejects.toThrow(NotFoundException);
  });

  it('should delete a product', async () => {
    mockProductModel.findByIdAndDelete.mockResolvedValue({ _id: 'someId' });

    await service.remove('someId');
    expect(mockProductModel.findByIdAndDelete).toHaveBeenCalledWith('someId');
  });

  it('should throw NotFoundException if deleting non-existing product', async () => {
    mockProductModel.findByIdAndDelete.mockResolvedValue(null);

    await expect(service.remove('nonExistingId')).rejects.toThrow(NotFoundException);
  });

  it('should find products by subcategory', async () => {
    const subcategoryId = 'someSubcategoryId';
    const products = [{ _id: 'someId', name: 'product1' }];

    mockProductModel.find.mockResolvedValue(products);

    const result = await service.findBySubcategory(subcategoryId);
    expect(result).toEqual(products);
    expect(mockProductModel.find).toHaveBeenCalledWith({ subcategoryId });
  });
});
