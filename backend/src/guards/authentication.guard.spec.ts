import { AuthenticationGuards } from './authentication.guard';
import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuthenticationGuards', () => {
  let guard: AuthenticationGuards;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationGuards],
    }).compile();

    guard = module.get<AuthenticationGuards>(AuthenticationGuards);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow access', async () => {
    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({}),
        getResponse: () => ({}),
      }),
      switchToWs: () => ({
        getClient: () => ({}),
        getData: () => ({}),
      }),
      getType: () => 'http',
      getClass: () => ({}),
      getHandler: () => ({}),
    } as ExecutionContext;

    const result = guard.canActivate(context);
    expect(result).toBe(true);
  });
});
