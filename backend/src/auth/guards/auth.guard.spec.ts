import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService(null); // Mock JwtService without actual implementation
    authGuard = new AuthGuard(jwtService);
  });

  it('should throw UnauthorizedException if no token is present', async () => {
    const mockExecutionContext = createMockExecutionContext(undefined); // No token

    await expect(authGuard.canActivate(mockExecutionContext)).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if token verification fails', async () => {
    const mockExecutionContext = createMockExecutionContext('Bearer invalid-token');
    jest.spyOn(jwtService, 'verifyAsync').mockRejectedValueOnce(new Error('Invalid token'));

    await expect(authGuard.canActivate(mockExecutionContext)).rejects.toThrow(UnauthorizedException);
  });

  it('should return true and set user in request if token is valid', async () => {
    const mockExecutionContext = createMockExecutionContext('Bearer valid-token');
    const mockPayload = { userId: 1, email: 'test@example.com' };

    // Mock JwtService verifyAsync to return a valid payload
    jest.spyOn(jwtService, 'verifyAsync').mockResolvedValueOnce(mockPayload);

    const result = await authGuard.canActivate(mockExecutionContext);

    // Check if the user payload was set correctly
    const request = mockExecutionContext.switchToHttp().getRequest();
    expect(result).toBe(true);
    expect(request['user']).toEqual(mockPayload);
  });

  // Utility function to create a mock ExecutionContext
  function createMockExecutionContext(authHeader?: string): ExecutionContext {
    const request = {
      headers: {
        authorization: authHeader,
      },
    } as unknown as Request;

    return {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as unknown as ExecutionContext;
  }
});
