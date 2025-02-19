import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';

const mockCategory = {
  id: '1',
  name: 'Test Category',
  description: 'Test Description',
};

const mockCategoriesService = {
  create: jest.fn().mockResolvedValue(mockCategory),
  findAll: jest.fn().mockResolvedValue([mockCategory]),
  findOne: jest.fn().mockResolvedValue(mockCategory),
  update: jest.fn().mockResolvedValue(mockCategory),
  remove: jest.fn().mockResolvedValue({ message: 'Category deleted successfully' }),
};

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [{ provide: CategoriesService, useValue: mockCategoriesService }],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCategory', () => {
    it('should create a new category', async () => {
      const createDto: CreateCategoriesDto = { name: 'New Category', description: 'New Description' };
      expect(await controller.createCategory(createDto)).toEqual(mockCategory);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAllCategories', () => {
    it('should return an array of categories', async () => {
      expect(await controller.findAllCategories()).toEqual([mockCategory]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findCategoryById', () => {
    it('should return a category by ID', async () => {
      expect(await controller.findCategoryById('1')).toEqual(mockCategory);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('updateCategory', () => {
    it('should update a category', async () => {
      const updateDto: UpdateCategoriesDto = { name: 'Updated Name' };
      expect(await controller.updateCategory('1', updateDto)).toEqual(mockCategory);
      expect(service.update).toHaveBeenCalledWith('1', updateDto);
    });
  });

  describe('removeCategory', () => {
    it('should remove a category', async () => {
      expect(await controller.removeCategory('1')).toEqual({ message: 'Category deleted successfully' });
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
