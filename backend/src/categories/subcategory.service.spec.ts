import { Test, TestingModule } from '@nestjs/testing';
import { SubcategoriesService } from './subcategory.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { NotFoundException } from '@nestjs/common';

describe('SubcategoriesService', () => {
  let service: SubcategoriesService;

  const mockSubcategory = {
    _id: '1',
    name: 'Test Subcategory',
    description: 'Test Description',
    categoryId: '123',
    save: jest.fn().mockResolvedValue(this),
  };

  const mockProduct = {
    _id: 'p1',
    name: 'Test Product',
    subcategoryId: '1',
  };

  const mockSubcategoryModel = {
    create: jest.fn().mockResolvedValue(mockSubcategory),
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockSubcategory]),
    }),
    findById: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockSubcategory),
    }),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockSubcategory),
    findByIdAndDelete: jest.fn().mockResolvedValue(mockSubcategory),
    deleteMany: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  };

  const mockProductModel = {
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockProduct]), // Return products for a specific subcategory
    }),
    deleteMany: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubcategoriesService,
        {
          provide: getModelToken('Subcategory'),
          useValue: mockSubcategoryModel,
        },
        {
          provide: getModelToken('Product'),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<SubcategoriesService>(SubcategoriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new subcategory', async () => {
      const createSubcategoryDto: CreateSubcategoryDto = {
        name: 'New Subcategory',
        description: 'New Description',
        categoryId: '123',
      };

      const mockCreatedSubcategory = { _id: 'someId', ...createSubcategoryDto };
      mockSubcategoryModel.create.mockResolvedValue(mockCreatedSubcategory);

      const result = await service.create(createSubcategoryDto);

      expect(result).toEqual(mockCreatedSubcategory);
      expect(mockSubcategoryModel.create).toHaveBeenCalledWith(createSubcategoryDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of subcategories', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockSubcategory]);
      expect(mockSubcategoryModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a subcategory by ID', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockSubcategory);
      expect(mockSubcategoryModel.findById).toHaveBeenCalledWith('1');
    });

    it('should throw a NotFoundException if subcategory not found', async () => {
      mockSubcategoryModel.findById.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a subcategory', async () => {
      const updateSubcategoryDto: UpdateSubcategoryDto = { name: 'Updated Name' };
      const updatedSubcategory = { _id: '1', ...updateSubcategoryDto };

      mockSubcategoryModel.findByIdAndUpdate.mockResolvedValue(updatedSubcategory);

      const result = await service.update('1', updateSubcategoryDto);

      expect(result).toEqual(updatedSubcategory);
      expect(mockSubcategoryModel.findByIdAndUpdate).toHaveBeenCalledWith('1', updateSubcategoryDto, { new: true });
    });

    it('should throw a NotFoundException if subcategory not found', async () => {
      mockSubcategoryModel.findByIdAndUpdate.mockResolvedValueOnce(null);

      await expect(service.update('999', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteSubcategory', () => {
    it('should delete a subcategory and associated products', async () => {
      const result = await service.deleteSubcategory('1');

      expect(result).toBeUndefined(); // Since the method returns void
      expect(mockSubcategoryModel.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(mockProductModel.deleteMany).toHaveBeenCalledWith({ subcategoryId: '1' });
    });

    it('should throw a NotFoundException if subcategory not found', async () => {
      mockSubcategoryModel.findById.mockResolvedValueOnce(null);

      await expect(service.deleteSubcategory('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findProductsBySubcategory', () => {
    it('should return an array of products for the given subcategory', async () => {
      const result = await service.findProductsBySubcategory('1');
      expect(result).toEqual([mockProduct]);
      expect(mockProductModel.find).toHaveBeenCalledWith({ subcategoryId: '1' });
    });

    it('should throw a NotFoundException if no products are found for the subcategory', async () => {
      mockProductModel.find.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue([]), // No products found
      });

      await expect(service.findProductsBySubcategory('999')).rejects.toThrow(NotFoundException);
    });
  });
});
