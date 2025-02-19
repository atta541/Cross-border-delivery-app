
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { getModelToken } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { NotFoundException } from '@nestjs/common';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let mockCategoryModel: any;

  beforeEach(async () => {
    const mockCategory = {
      save: jest.fn(),
      ...jest.fn(),
    };

    mockCategoryModel = {
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      create: jest.fn().mockResolvedValue(mockCategory), 
      find: jest.fn(), // Mocking the find method
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getModelToken(Category.name),
          useValue: mockCategoryModel,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should create a category', async () => {
    const createCategoriesDto = { name: 'New Category', description: 'Category description' };
    
    const createdCategory = { _id: 'someId', ...createCategoriesDto };
  
    mockCategoryModel.create.mockResolvedValue(createdCategory);
  
    const result = await service.create(createCategoriesDto);
    
    expect(result).toEqual(createdCategory);
    expect(mockCategoryModel.create).toHaveBeenCalledWith(createCategoriesDto);
  });

  it('should find a category by ID', async () => {
    const category = { _id: 'someId', name: 'categoryName' };
    mockCategoryModel.findById.mockResolvedValue(category);

    const result = await service.findOne('someId');
    expect(result).toEqual(category);
  });

  it('should throw NotFoundException if category not found', async () => {
    mockCategoryModel.findById.mockResolvedValue(null);

    await expect(service.findOne('unknownId')).rejects.toThrow(NotFoundException);
  });

  it('should update a category', async () => {
    const updateDto = { name: 'Updated Category', description: 'Updated description' };
    mockCategoryModel.findByIdAndUpdate.mockResolvedValue({ _id: 'someId', ...updateDto });

    const result = await service.update('someId', updateDto);
    expect(result).toEqual({ _id: 'someId', ...updateDto });
  });

  it('should throw NotFoundException when updating a non-existent category', async () => {
    const updateDto = { name: 'Updated Category', description: 'Updated description' };
    mockCategoryModel.findByIdAndUpdate.mockResolvedValue(null); // Simulating not found

    await expect(service.update('unknownId', updateDto)).rejects.toThrow(NotFoundException);
  });

  it('should delete a category', async () => {
    mockCategoryModel.findByIdAndDelete.mockResolvedValue({ _id: 'someId', name: 'Deleted Category' });

    await service.remove('someId');
    expect(mockCategoryModel.findByIdAndDelete).toHaveBeenCalledWith('someId');
  });

  it('should throw NotFoundException when deleting a non-existent category', async () => {
    mockCategoryModel.findByIdAndDelete.mockResolvedValue(null); // Simulating not found

    await expect(service.remove('unknownId')).rejects.toThrow(NotFoundException);
  });

  // Test for finding all categories
  it('should return all categories', async () => {
    const categories = [
      { _id: 'someId1', name: 'Category 1' },
      { _id: 'someId2', name: 'Category 2' },
    ];
    mockCategoryModel.find.mockResolvedValue(categories); // Mock the find method

    const result = await service.findAll();
    expect(result).toEqual(categories);
    expect(mockCategoryModel.find).toHaveBeenCalled();
  });
});
