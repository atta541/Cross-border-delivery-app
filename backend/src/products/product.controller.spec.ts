import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findBySubcategory: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const dto: CreateProductDto = {
      name: 'product1',
      subcategoryId: 'subcategoryId',
      productId: 'productId',
      description: 'Test product description',
      specification: 'Test specification',
      additionalInfo: 'Test additional information',
      price: 100,
      deliverableCities: ['City1', 'City2'],
      quantity: 0
    };

    mockProductsService.create.mockResolvedValue(dto);

    const result = await controller.createProduct(dto);
    expect(result).toEqual(dto);
    expect(mockProductsService.create).toHaveBeenCalledWith(dto);
  });

  it('should find all products', async () => {
    const result = [{ name: 'product1' }, { name: 'product2' }];
    mockProductsService.findAll.mockResolvedValue(result);

    expect(await controller.findAllProducts()).toBe(result);
  });

  it('should find a product by ID', async () => {
    const result = { name: 'product1' };
    mockProductsService.findOne.mockResolvedValue(result);

    expect(await controller.findProductById('someId')).toBe(result);
  });

  it('should update a product', async () => {
    const updateDto: UpdateProductDto = {
      name: 'updatedProductName',
      quantity: 0
    };
    const result = { ...updateDto, _id: 'someId' };

    mockProductsService.update.mockResolvedValue(result);

    expect(await controller.updateProduct('someId', updateDto)).toBe(result);
  });

  it('should delete a product', async () => {
    await controller.removeProduct('someId');
    expect(mockProductsService.remove).toHaveBeenCalledWith('someId');
  });

  it('should find products by subcategory', async () => {
    const result = [{ name: 'product1' }];
    mockProductsService.findBySubcategory.mockResolvedValue(result);

    expect(await controller.findBySubcategory('someSubcategoryId')).toBe(result);
  });
});
