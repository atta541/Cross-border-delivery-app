import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module'; 
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('Auth E2E Tests', () => {
  let app: INestApplication;
  const uniqueEmail = `test${Date.now()}@example.com`; 
  const uniquePhone = `+920300${Math.floor(Math.random() * 10000)}`; 

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

  describe('Manual Signup', () => {
    it('should successfully sign up a new user', async () => {
      const signUpDto = {
        first_name: 'Ata',
        last_name: 'Doe',
        email: uniqueEmail, 
        password: 'Atta123456$', 
        role: 'client',
        phone: uniquePhone, 
      };

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(signUpDto);

      console.log('SignUp Response:', response.body); // Log response for debugging

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
    });

    it('should throw an error if the user already exists', async () => {
      const signUpDto = {
        first_name: 'John',
        last_name: 'Doe',
        email: uniqueEmail, // Reuse the unique email from the previous test
        password: 'Password123$',
        phone: uniquePhone, // Reuse the unique phone from the previous test
        role: 'client',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(signUpDto)
        .expect(400);

      expect(response.body.message).toContain('User already exists');
    });
  });

  describe('Manual Login', () => {
    it('should successfully log in an existing user', async () => {
      const loginDto = {
        email: uniqueEmail, 
        password: 'Atta123456$', 
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto);

      console.log('Login Response:', response.body); 

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
    });

    it('should throw an error if the user is not found', async () => {
      const loginDto = {
        email: 'nonexistent@example.com',
        password: 'Atta123456$',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(401);

      expect(response.body.message).toBe('Invalid email or password');
    });

    it('should throw an error if the password is incorrect', async () => {
      const loginDto = {
        email: uniqueEmail, 
        password: 'wrongPassword123$', 
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(401);

      expect(response.body.message).toBe('Invalid email or password');
    });
  });describe('Google Authentication', () => {
    it('should return a token for a valid Google user', async () => {
      const googleUserDto = {
        email: 'google@example.com',
        first_name: 'John',
        last_name: 'Doe',
        phone_number: '+923004517080',
      };
  
      const response = await request(app.getHttpServer())
        .get('/auth/google')
        .query(googleUserDto)
        .expect(302); 
  
      expect(response.headers.location).toBeDefined(); 
  
      
    });
  
    it('should handle errors for an invalid Google user', async () => {
      const googleUserDto = {
        email: 'invalid@example.com',
        first_name: '',
        last_name: '',
        phone_number: '',
      };
  
      const response = await request(app.getHttpServer())
        .get('/auth/google')
        .query(googleUserDto)
        .expect(400); 
  
      expect(response.body.message).toBeDefined(); 
    });
  });
  
  describe('Facebook Authentication', () => {
    it('should return a token for a valid Facebook user', async () => {
      const facebookUserDto = {
        email: 'facebook@example.com',
        first_name: 'John',
        last_name: 'Doe',
      };
  
      const response = await request(app.getHttpServer())
        .get('/auth/facebook')
        .query(facebookUserDto)
        .expect(302); // Expecting a redirection
  
      expect(response.headers.location).toBeDefined(); // Check if redirection is present
  
    });
  
    it('should handle errors for an invalid Facebook user', async () => {
      const facebookUserDto = {
        email: 'invalid@example.com',
        first_name: '',
        last_name: '',
      };
  
      const response = await request(app.getHttpServer())
        .get('/auth/facebook')
        .query(facebookUserDto)
        .expect(400); 
  
      expect(response.body.message).toBeDefined(); 
    });
  });
  
});

