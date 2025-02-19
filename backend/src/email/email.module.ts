
// import { Module } from '@nestjs/common';
// import { EmailService } from './email.service';
// import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule
// import { User, UserSchema } from '../auth/schemas/user.schema'; // Import User schema

// @Module({
//   imports: [
//     ConfigModule,
//     MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register User schema
//   ],
//   providers: [EmailService],
//   exports: [EmailService],
// })
// export class EmailModule {}




import { Module, forwardRef } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../auth/schemas/user.schema';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),  
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
