// import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { InjectModel } from '@nestjs/mongoose'; // Add this import
// import { Model } from 'mongoose'; // Add this import
// import * as nodemailer from 'nodemailer';
// import { User, UserDocument } from '../auth/schemas/user.schema'; // Import the User schema
// import { v4 as uuidv4 } from 'uuid';



// @Injectable()
// export class EmailService {
//   private transporter;

//   constructor(
//     private configService: ConfigService,
//     @InjectModel(User.name) private userModel: Model<UserDocument> // Inject the User model here
//   ) {
//     const mailtrapUser = this.configService.get('MAILTRAP_USER');
//     const mailtrapPassword = this.configService.get('MAILTRAP_PASSWORD');
//     const mailtrapHost = this.configService.get('MAILTRAP_HOST');
//     const mailtrapPort = this.configService.get('MAILTRAP_PORT');

//     if (!mailtrapUser || !mailtrapPassword || !mailtrapHost || !mailtrapPort) {
//       throw new InternalServerErrorException('SMTP configuration is not set properly');
//     }

//     this.transporter = nodemailer.createTransport({
//       host: mailtrapHost,
//       port: Number(mailtrapPort),
//       auth: {
//         user: mailtrapUser,
//         pass: mailtrapPassword,
//       },
//     });
//   }

//   async sendVerificationEmail(email: string, verificationToken: string) {
//     const verificationUrl = `http://yourapp.com/verify?token=${verificationToken}`;
//     const mailOptions = {
//       from: '"Your App" <no-reply@yourapp.com>',
//       to: email,
//       subject: 'Email Verification',
//       text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
//     };

//     await this.transporter.sendMail(mailOptions);
//   }

//   async verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
//     const user = await this.userModel.findOne({ verificationToken: token });

//     if (!user) {
//       throw new BadRequestException('Invalid verification token');
//     }

//     user.isVerified = true; 
//     user.verificationToken = null; 
//     await user.save();

//     return { success: true, message: 'Email verified successfully' };
//   }

//   async resendEmailVerification(email: string): Promise<{ message: string }> {
//     const user = await this.userModel.findOne({ email });
  
//     if (!user) {
//       throw new BadRequestException('User not found');
//     }
  
//     if (user.isVerified) {
//       throw new BadRequestException('Email is already verified');
//     }
  
//     // Generate a new verification token
//     const newVerificationToken = uuidv4();
//     user.verificationToken = newVerificationToken;
//     await user.save();
  
//     // Send the verification email again
//     await this.sendVerificationEmail(email, newVerificationToken);
  
//     return { message: 'Verification email resent successfully' };
//   }
// }











import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../auth/schemas/user.schema'; 
import { Verification, VerificationDocument } from '../auth/schemas/verification.schema'; 
import * as nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EmailService {
  private transporter;

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Verification.name) private verificationModel: Model<VerificationDocument>,
  ) {
    const mailtrapUser = process.env.MAILTRAP_USER;
    const mailtrapPassword = process.env.MAILTRAP_PASSWORD;
    const mailtrapHost = process.env.MAILTRAP_HOST;
    const mailtrapPort = process.env.MAILTRAP_PORT;

    if (!mailtrapUser || !mailtrapPassword || !mailtrapHost || !mailtrapPort) {
      throw new Error('SMTP configuration is not set properly');
    }

    this.transporter = nodemailer.createTransport({
      host: mailtrapHost,
      port: Number(mailtrapPort),
      auth: {
        user: mailtrapUser,
        pass: mailtrapPassword,
      },
    });
  }


  async sendVerificationEmail(email: string, verificationToken: string) {
    const verificationUrl = `http://yourapp.com/verify?token=${verificationToken}`;
    const mailOptions = {
      from: '"Your App" <no-reply@yourapp.com>',
      to: email,
      subject: 'Email Verification',
      text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  


  // async verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
  //   console.log(`Received token: ${token}`);
    
  //   // Find the verification record and populate the 'user' field
  //   // const verification = await this.verificationModel.findOne({ verificationToken: token }).populate('user');  // Ensure user field is populated correctly
  //   // const user = await this.userModel.findOne({ phone }).populate('verification');
  //   const verification = await this.verificationModel.findOne({ verificationToken: token });


  //   console.log('veeeerifiiications' + verification)
  //   // Check if verification record exists and the user is populated
  //   // if (!verification || !verification.user) {
  //   //   console.log('Verification document or user not found');
  //   //   throw new BadRequestException('Invalid user associated with the verification token');
  //   // }
    
  //   // console.log(`Verification document found: ${JSON.stringify(verification)}`);
  //   // const user = verification.user;  // Now you can access the populated user
  
  //   // Ensure the user exists (this is somewhat redundant as we already populate 'user')
  //   // if (!user) {
  //   //   throw new BadRequestException('User not found');
  //   // }
  
  //   // Check if user is already verified (optional)
  //   if (verification.isVerified) {
  //     throw new BadRequestException('User already verified');
  //   }
  
  //   // Mark the verification as complete
  //   verification.isVerified = true;
  //   await verification.save();
    
  //   // Optionally: Mark the user as verified (if applicable)
  //   // user.isVerified = true; // If such a flag exists on the User schema
  //   // await user.save();
    
  //   return { success: true, message: 'Email verified successfully' };
  // }
  
  







  async verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
    console.log(`Received token: ${token}`);
    
    const verification = await this.verificationModel.findOne({ verificationToken: token });
  
    console.log('Verification record:', verification);
  
    if (!verification) {
      throw new BadRequestException('Verification record not found');
    }
  
    if (verification.isVerified) {
      throw new BadRequestException('User already verified');
    }
  
    verification.isVerified = true;
  
    verification.verificationToken = null;
  
    await verification.save();
    
    return { success: true, message: 'Email verified successfully' };
  }
  






  async resendEmailVerification(email: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ email }).populate('verification');
  
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const verification = await this.verificationModel.findById(user.verification);
    if (!verification) {
      throw new BadRequestException('Verification details not found');
    }

    if (verification.isVerified) {
      throw new BadRequestException('Email is already verified');
    }

    const newVerificationToken = uuidv4();
    verification.verificationToken = newVerificationToken;
    await verification.save();

    await this.sendVerificationEmail(email, newVerificationToken);

    return { message: 'Verification email resent successfully' };
  }
}
