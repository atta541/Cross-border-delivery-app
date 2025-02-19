import { Test, TestingModule } from '@nestjs/testing';
import { SubcategoriesController } from './subcategory.controller';
import { SubcategoriesService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

describe('SubcategoriesController', () => {
  let controller: SubcategoriesController;
  let service: SubcategoriesService;

  const mockSubcategory = {
    id: '1',
    name: 'Test Subcategory',
    description: 'Test Description',
    categoryId: '123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubcategoriesController],
      providers: [
        {
          provide: SubcategoriesService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockSubcategory),
            findAll: jest.fn().mockResolvedValue([mockSubcategory]),
            findOne: jest.fn().mockResolvedValue(mockSubcategory),
            update: jest.fn().mockResolvedValue(mockSubcategory),
            deleteSubcategory: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<SubcategoriesController>(SubcategoriesController);
    service = module.get<SubcategoriesService>(SubcategoriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createSubcategory', () => {
    it('should create a new subcategory', async () => {
      const createSubcategoryDto: CreateSubcategoryDto = {
        name: 'New Subcategory',
        description: 'New Description',
        categoryId: '123',
      };
      const result = await controller.createSubcategory(createSubcategoryDto);
      expect(result).toEqual(mockSubcategory);
      expect(service.create).toHaveBeenCalledWith(createSubcategoryDto);
    });
  });

  describe('findAllSubcategories', () => {
    it('should return an array of subcategories', async () => {
      const result = await controller.findAllSubcategories();
      expect(result).toEqual([mockSubcategory]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findSubcategoryById', () => {
    it('should return a subcategory by ID', async () => {
      const result = await controller.findSubcategoryById('1');
      expect(result).toEqual(mockSubcategory);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('updateSubcategory', () => {
    it('should update a subcategory', async () => {
      const updateSubcategoryDto: UpdateSubcategoryDto = { name: 'Updated Name' };
      const result = await controller.updateSubcategory('1', updateSubcategoryDto);
      expect(result).toEqual(mockSubcategory);
      expect(service.update).toHaveBeenCalledWith('1', updateSubcategoryDto);
    });
  });

  describe('deleteSubcategory', () => {
    it('should delete a subcategory', async () => {
      await controller.deleteSubcategory('1');
      expect(service.deleteSubcategory).toHaveBeenCalledWith('1');
    });
  });
});