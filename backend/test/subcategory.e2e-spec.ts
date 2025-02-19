import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { CreateSubcategoryDto } from '../src/categories/dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from '../src/categories/dto/update-subcategory.dto';
import { Types } from 'mongoose';

describe('SubcategoriesController (e2e)', () => {
  let app: INestApplication;
  let createdSubcategoryId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST subcategories (create subcategory)', async () => {
    const createSubcategoryDto: CreateSubcategoryDto = {
      name: 'Electronics',
      description: 'Devices and gadgets',
      categoryId: new Types.ObjectId().toHexString(), // Use a valid category ID if needed
    };

    const response = await request(app.getHttpServer())
      .post('/subcategories')
      .send(createSubcategoryDto)
      .expect(201);

    createdSubcategoryId = response.body._id; // Store the created subcategory ID for further tests
    expect(response.body.name).toBe(createSubcategoryDto.name);
    expect(response.body.description).toBe(createSubcategoryDto.description);
    expect(response.body.categoryId).toBe(createSubcategoryDto.categoryId); // Ensure categoryId is returned
  });

  it('/GET subcategories (get all subcategories)', async () => {
    const response = await request(app.getHttpServer())
      .get('/subcategories')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0); // Check that there's at least one subcategory
  });

  it('/GET subcategories/:id (get subcategory by ID)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/subcategories/${createdSubcategoryId}`)
      .expect(200);

    expect(response.body._id).toBe(createdSubcategoryId);
    expect(response.body.name).toBe('Electronics'); // Ensure the name matches
  });

  it('/PUT subcategories/:id (update subcategory)', async () => {
    const updateSubcategoryDto: UpdateSubcategoryDto = {
      name: 'Updated Electronics',
      description: 'Updated description',
    };

    const response = await request(app.getHttpServer())
      .put(`/subcategories/${createdSubcategoryId}`)
      .send(updateSubcategoryDto)
      .expect(200);

    expect(response.body.name).toBe(updateSubcategoryDto.name);
    expect(response.body.description).toBe(updateSubcategoryDto.description);
    expect(response.body._id).toBe(createdSubcategoryId); // Ensure the ID remains unchanged
  });

  it('/DELETE subcategories/:id (delete subcategory)', async () => {
    await request(app.getHttpServer())
      .delete(`/subcategories/${createdSubcategoryId}`)
      .expect(204);
  });

  // Optionally: test to ensure the subcategory has been deleted
  it('/GET subcategories/:id (should return 404 after delete)', async () => {
    await request(app.getHttpServer())
      .get(`/subcategories/${createdSubcategoryId}`)
      .expect(404);
  });
});
