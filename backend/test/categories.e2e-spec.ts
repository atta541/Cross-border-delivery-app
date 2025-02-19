import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CategoriesModule } from '../src/categories/categories.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateCategoriesDto } from '../src/categories/dto/create-categories.dto';
import { UpdateCategoriesDto } from '../src/categories/dto/update-categories.dto';

describe('CategoriesController (e2e)', () => {
  let app: INestApplication;
  let createdCategoryId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CategoriesModule,
        MongooseModule.forRoot('mongodb://localhost:27017/test'), // Use a test DB
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close(); 
  });

  it('/POST categories (create category)', () => {
    const createCategoryDto: CreateCategoriesDto = {
      name: 'Test Category',
      description: 'Test Description',
    };

    
    return request(app.getHttpServer())
      .post('/categories')
      .send(createCategoryDto)
      .expect(201)
      .then((response) => {
        createdCategoryId = response.body._id; // Save the created ID for later use
        expect(response.body.name).toEqual('Test Category');
        expect(response.body.description).toEqual('Test Description');
      });
  });

  it('/GET categories (get all categories)', () => {
    return request(app.getHttpServer())
      .get('/categories')
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
      });
  });

  it('/GET categories/:id (get category by ID)', () => {
    return request(app.getHttpServer())
      .get(`/categories/${createdCategoryId}`)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toEqual(createdCategoryId);
        expect(response.body.name).toEqual('Test Category');
      });
  });

  it('/PUT categories/:id (update category)', () => {
    const updateCategoryDto: UpdateCategoriesDto = {
      name: 'Updated Category',
    };

    return request(app.getHttpServer())
      .put(`/categories/${createdCategoryId}`)
      .send(updateCategoryDto)
      .expect(200)
      .then((response) => {
        expect(response.body.name).toEqual('Updated Category');
      });
  });

  it('/DELETE categories/:id (delete category)', () => {
    return request(app.getHttpServer())
      .delete(`/categories/${createdCategoryId}`)
      .expect(200);
  });
});
