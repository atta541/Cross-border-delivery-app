// import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";

// import { Roles_KEY } from '../auth/decoraters/roles.decoraters'; // Adjust the path as necessary

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<string[]>(Roles_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     if (!requiredRoles) return true;

//     const request = context.switchToHttp().getRequest();
//     const user = request.user;


//     console.log('User Roles:', user?.roles); 
//     console.log('Required Roles:', requiredRoles); 
//     return this.matchRoles(requiredRoles, user?.roles);
//   }

//   private matchRoles(requiredRoles: string[], userRoles: string[]): boolean {
//     return requiredRoles.some(role => userRoles?.includes(role));
//   }
// }






import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles_KEY } from '../auth/decoraters/roles.decoraters'; // Adjust the path as necessary

export interface User {
  roles: string[];
  // add other properties as necessary
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(Roles_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    console.log('User Roles:', user?.roles);
    console.log('Required Roles:', requiredRoles);
    return this.matchRoles(requiredRoles, user?.roles || []);
  }

  private matchRoles(requiredRoles: string[], userRoles: string[]): boolean {
    return requiredRoles.some(role => userRoles.includes(role));
  }
}
