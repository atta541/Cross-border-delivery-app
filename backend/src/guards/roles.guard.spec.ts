import { RolesGuard } from './role.guards';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    rolesGuard = new RolesGuard(reflector);
  });

  describe('canActivate', () => {
    it('should allow access if no roles are required', () => {
      const context = {
        getHandler: jest.fn(),
        getClass: jest.fn(),
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({ user: {} }),
        }),
      } as unknown as ExecutionContext;

      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      expect(rolesGuard.canActivate(context)).toBe(true);
    });

    it('should allow access if user has required roles', () => {
      const context = {
        getHandler: jest.fn(),
        getClass: jest.fn(),
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({ user: { roles: ['admin', 'user'] } }),
        }),
      } as unknown as ExecutionContext;

      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['user']);

      expect(rolesGuard.canActivate(context)).toBe(true);
    });

    it('should deny access if user does not have required roles', () => {
      const context = {
        getHandler: jest.fn(),
        getClass: jest.fn(),
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({ user: { roles: ['guest'] } }),
        }),
      } as unknown as ExecutionContext;

      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);

      expect(rolesGuard.canActivate(context)).toBe(false);
    });
  });
});
