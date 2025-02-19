// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User, UserDocument } from './schemas/user.schema';
// import * as bcrypt from 'bcryptjs';
// import { Role } from './enums/role.enum';

// @Injectable()
// export class MigrationService {
//   constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

//   async createSuperAdmin() {
//     const superAdminEmail = process.env.SUPERADMIN_EMAIL;
//     const superAdminPassword = process.env.SUPERADMIN_PASSWORD;
//     const superAdminFirstName = process.env.SUPERADMIN_FIRST_NAME || 'Super';
//     const superAdminLastName = process.env.SUPERADMIN_LAST_NAME || 'Admin';

//     // Find if there's already a SuperAdmin in the database
//     const existingAdmin = await this.userModel.findOne({ role: Role.SuperAdmin });

//     if (existingAdmin) {
//       // Check if the existing super-admin has different details (email, password, etc.)
//       let updateRequired = false;

//       if (existingAdmin.email !== superAdminEmail) {
//         existingAdmin.email = superAdminEmail;
//         updateRequired = true;
//       }

//       if (existingAdmin.first_name !== superAdminFirstName) {
//         existingAdmin.first_name = superAdminFirstName;
//         updateRequired = true;
//       }

//       if (existingAdmin.last_name !== superAdminLastName) {
//         existingAdmin.last_name = superAdminLastName;
//         updateRequired = true;
//       }

//       // Only update the password if it's different (hashed)
//       const isPasswordMatch = await bcrypt.compare(superAdminPassword, existingAdmin.password);
//       if (!isPasswordMatch) {
//         const hashedPassword = await bcrypt.hash(superAdminPassword, 10);
//         existingAdmin.password = hashedPassword;
//         updateRequired = true;
//       }

//       if (updateRequired) {
//         // Save changes to the existing SuperAdmin without deleting
//         await existingAdmin.save();
//         console.log('SuperAdmin updated');
//       } else {
//         console.log('SuperAdmin details are up-to-date');
//       }
//     } else {
//       // Create a new SuperAdmin if no existing one found
//       const hashedPassword = await bcrypt.hash(superAdminPassword, 10);
//       const newSuperAdmin = new this.userModel({
//         email: superAdminEmail,
//         password: hashedPassword,
//         role: Role.SuperAdmin,
//         first_name: superAdminFirstName,
//         last_name: superAdminLastName,
//       });

//       await newSuperAdmin.save();
//       console.log('SuperAdmin created');
//     }
//   }
// }
