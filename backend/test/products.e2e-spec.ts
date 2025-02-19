import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module'; // Adjust path as necessary
import { CreateProductDto } from '../src/products/dto/create-product.dto'; // Adjust path as necessary
import { UpdateProductDto } from '../src/products/dto/update-product.dto'; // Adjust path as necessary
import { Product } from '../src/products/schemas/product.schema'; // Adjust path as necessary

describe('ProductsController (E2E)', () => {
  let app: INestApplication;
  let productId: string;

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

  it('POST /products - create a new product', async () => {
    const createProductDto: CreateProductDto = {
        name: 'Test Product',
        productId: 'test-product-id',
        description: 'Test Description',
        price: 100,
        deliverableCities: ['City1', 'City2'],
        subcategoryId: '60d5ec49d1f4e915b8fbc8da',
        specification: '',
        additionalInfo: ''
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(createProductDto)
      .expect(201);

    expect(response.body).toMatchObject(createProductDto);
    productId = response.body._id; 
  });

  it('GET /products - retrieve all products', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /products/:id - retrieve a product by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/products/${productId}`)
      .expect(200);

    expect(response.body._id).toBe(productId);
    expect(response.body.name).toBe('Test Product');
  });

  it('PUT /products/:id - update a product', async () => {
    const updateProductDto: UpdateProductDto = {
      name: 'Updated Test Product',
      price: 150,
    };

    const response = await request(app.getHttpServer())
      .put(`/products/${productId}`)
      .send(updateProductDto)
      .expect(200);

    expect(response.body.name).toBe(updateProductDto.name);
    expect(response.body.price).toBe(updateProductDto.price);
  });

  it('DELETE /products/:id - remove a product', async () => {
    await request(app.getHttpServer())
      .delete(`/products/${productId}`)
      .expect(204); 
});


  it('GET /products/:id - fail to retrieve a non-existent product', async () => {
    await request(app.getHttpServer())
      .get(`/products/${productId}`)
      .expect(404);
  });
});
