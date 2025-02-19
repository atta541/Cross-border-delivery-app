// // user.decorator.ts
// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { IUser } from '../interfaces/user.interfaces'; // Updated import

// export const User = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext): IUser => {
//     const request = ctx.switchToHttp().getRequest();
//     return request.user; // Assumes user is set in the request
//   },
// );


// user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from '../interfaces/user.interfaces'; // Updated import

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // Assumes user is set in the request
  },
);
