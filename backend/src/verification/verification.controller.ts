import { Controller, Post, Body, Request, BadRequestException, Delete, Param, Get, HttpStatus, HttpException, UploadedFiles } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { CreateAccountDto } from './dto/create-account.dto'; // Import the DTO

import { Multer } from 'multer';


import { Req, Res, Headers, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';  // Make sure you import Request and Response from express
import * as fs from 'fs';
import { existsSync } from 'fs';
import * as path from 'path';


@Controller('verification')
export class VerificationController {
  stripe: any;
  constructor(private readonly verificationService: VerificationService) { }
  // this endpoint for creating a new connect account
  @Post('create-account')
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
    @Request() req: any,
  ) {
    const ip = req.ip;

    try {
      const account = await this.verificationService.createConnectAccount(
        createAccountDto,
        ip,
      );
      return { success: true, account };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  //  to delete the connect account
  @Delete('accounts/:accountId')
  async deleteAccount(@Param('accountId') accountId: string) {
    return await this.verificationService.deleteConnectAccount(accountId);
  }

  //  to check the verification status
  @Post('check-verification-status')
  async checkVerificationStatus(@Body('account_id') accountId: string) {
    try {
      const result = await this.verificationService.checkVerificationStatus(accountId);
      return result;
    } catch (error) {
      throw new BadRequestException(`Error checking verification status: ${error.message}`);
    }
  }




  




  // this end point for uploading the document for indentity verification
  // @Post('upload-verification-document')

  // async uploadVerificationDocument(@Body('account_id') accountId: string, @Body('file_path') filePath: string) {
  //   console.log('verification called');

  //   try {
  //     // Call the service to upload document and update the account
  //     const result = await this.verificationService.createVerificationDocument(accountId, filePath);

  //     // Return the result containing the message and verification status
  //     return result;
  //   } catch (error) {
  //     throw new BadRequestException(`Error uploading verification document: ${error.message}`);
  //   }
  // }


  // @Post('upload-verification-document')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadVerificationDocument(
  //   @Body('account_id') accountId: string,
  //   @UploadedFile() file: Express.Multer.File,

  // ) {
  //   console.log('Verification endpoint called');

  //   try {
  //     if (!file) {
  //       throw new BadRequestException('No file provided');
  //     }

  //     // Define the uploads directory
  //     const uploadsDir = path.join(__dirname, '..', 'uploads');

  //     // Ensure the uploads directory exists
  //     if (!fs.existsSync(uploadsDir)) {
  //       fs.mkdirSync(uploadsDir, { recursive: true });
  //     }

  //     // Define the file path
  //     const filePath = path.join(uploadsDir, file.originalname);

  //     // Save the file
  //     fs.writeFileSync(filePath, file.buffer);

  //     // Call the service to upload the document
  //     const result = await this.verificationService.createVerificationDocument(accountId, filePath,);

  //     return {
  //       success: true,
  //       data: result,
  //     };
  //   } catch (error) {
  //     throw new BadRequestException(`Error uploading verification document: ${error.message}`);
  //   }
  // }



  @Post('upload-verification-document')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file_front', maxCount: 1 },
        { name: 'file_back', maxCount: 1 },
      ],
    ),
  )
  async uploadVerificationDocument(
    @Body('account_id') accountId: string,
    @UploadedFiles() files: { file_front?: Express.Multer.File[], file_back?: Express.Multer.File[] },
  ) {
    console.log('Verification endpoint called');

    try {
      const frontFile = files.file_front ? files.file_front[0] : null;
      const backFile = files.file_back ? files.file_back[0] : null;

      if (!frontFile || !backFile) {
        throw new BadRequestException('Both front and back files must be provided');
      }

      // Define the uploads directory
      const uploadsDir = path.join(__dirname, '..', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Define the file paths
      const frontFilePath = path.join(uploadsDir, frontFile.originalname);
      const backFilePath = path.join(uploadsDir, backFile.originalname);

      // Save the files
      fs.writeFileSync(frontFilePath, frontFile.buffer);
      fs.writeFileSync(backFilePath, backFile.buffer);

      // Call the service to upload the documents
      const result = await this.verificationService.createVerificationDocument(accountId, frontFilePath, backFilePath);

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      throw new BadRequestException(`Error uploading verification document: ${error.message}`);
    }
  }

  // this endpoint for attach the bank account to the connect account in stripe
  @Post('attach-external-bank-account')
  async attachExternalAccount(
    @Body('account_id') accountId: string,
    @Body('token') token: string
  ) {
    try {

      const result = await this.verificationService.attachExternalAccount(
        accountId,
        token

      );
      return result;
    } catch (error) {
      throw new BadRequestException(`Error attaching external account: ${error.message}`);
    }
  }


  //  end-point to create the payout
  @Post('create-payout')
  async payout(@Body('external_account_id') externalAccountId: string, @Body('amount') amount: number) {
    try {
      const result = await this.verificationService.payout(externalAccountId, amount);
      return result;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`Error creating payout: ${error.message}`);
    }
  }




  @Post('check-external-accounts')
  async checkExtralaccounts(@Body('account_id') accountId: string) {
    console.log('Received accountId:', accountId);
    try {
      const result = await this.verificationService.listExternalAccounts(accountId);
      return result;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`Error retrieving external accounts: ${error.message}`);
    }
  }




  // @Post("identity-verification")
  // async identityVerification(@Body('account_id') accountId: string) {
  //   try {
  //     const result = await this.verificationService.identityVerification(accountId);
  //     return result;
  //   } catch (error) {
  //     console.error(error);
  //     throw new BadRequestException(`Error checking verification status: ${error.message}`);
  //   }
  // }




  // @Post('identity-verification')
  // async identityVerification(@Body('account_id') accountId: string) {
  //   console.log('Identity verification called');
  //   try {
  //     const verificationSession = await this.verificationService.createVerificationSession(accountId);
  //     return {
  //       message: 'Verification session created successfully',
  //       clientSecret: verificationSession.clientSecret,
  //       verificationId: verificationSession.verificationId,
  //     };
  //   } catch (error) {
  //     console.error('Error in identity verification:', error);
  //     throw new BadRequestException(`Error creating verification session: ${error.message}`);
  //   }
  // }




  // @Post('identity-verification')
  // async identityVerification() {
  //   const accountId = "acct_1QDQBHGaGhPNTWKW";
  //   console.log('Identity verification called with account ID:', accountId);
  //   try {
  //     const verificationSession = await this.verificationService.createVerificationSession(accountId);
  //     return {
  //       message: 'Verification session created successfully',
  //       clientSecret: verificationSession.clientSecret,
  //       verificationId: verificationSession.verificationId,
  //       ephemeralKeySecret: verificationSession.ephemeralKeySecret,
  //     };
  //   } catch (error) {
  //     console.error('Error in identity verification:', error);
  //     throw new BadRequestException(`Error creating verification session: ${error.message}`);
  //   }
  // }



  @Post('identity-verification')
  async identityVerification() {
    const accountId = "acct_1Qbk2C2e0fwmW2KL";
    console.log('Identity verification called with account ID:', accountId);
    try {
      // Step 1: Update the account capabilities
      // await this.verificationService.updateAccountCapabilities(accountId);


      // Step 2: Create the verification session
      const verificationSession = await this.verificationService.createVerificationSession(accountId);
      console.log("verification session clientSecret", verificationSession.clientSecret, "verificationId" + verificationSession.verificationId, "verificationsecret" + verificationSession.ephemeralKeySecret);

      return {
        message: 'Verification session created successfully',
        clientSecret: verificationSession.clientSecret,
        verificationId: verificationSession.verificationId,
        ephemeralKeySecret: verificationSession.ephemeralKeySecret,
        verificationUrl: verificationSession.verificationUrl
      };
    } catch (error) {
      console.error('Error in identity verification:', error);
      throw new BadRequestException(`Error creating verification session: ${error.message}`);
    }
  }





  //   @Post('identity-verification')
  // async identityVerification(@Body('account_id') accountId: string) {
  //   console.log('Identity verification called');
  //   try {
  //     const verificationSession = await this.verificationService.createVerificationSession(accountId);
  //     return {
  //       message: 'Verification session created successfully',
  //       clientSecret: verificationSession.clientSecret,
  //       verificationId: verificationSession.verificationId, // Return the verification session ID as well
  //     };
  //   } catch (error) {
  //     console.error('Error in identity verification:', error);
  //     throw new BadRequestException(`Error creating verification session: ${error.message}`);
  //   }
  // }

  // @Post('upload-document')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadDocument(
  //   @Headers('Authorization') clientSecret: string,
  //   @Body('verificationId') verificationId: string, // Expect verification ID in the request
  //   @UploadedFile() file: Express.Multer.File,
  //   @Res() res: Response
  // ) {
  //   console.log('Upload document called');
  //   if (!file) {
  //     return res.status(400).json({ message: 'file not uploaded' });
  //   }

  //   try {
  //     const verificationSession = await this.verificationService.uploadDocument(verificationId, file); // Pass verification ID
  //     return res.json({
  //       message: 'Document uploaded successfully and attached!',
  //       verificationSession,
  //     });
  //   } catch (error) {
  //     console.error('Error uploading document:', error);
  //     return res.status(500).json({
  //       message: 'Failed to upload document',
  //       error: error.message,
  //     });
  //   }
  // }



  
  @Get("get-events")
  async events() {
    try {
      const events = await this.verificationService.getEvents();
      return { success: true, events }; // return a structured response
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error fetching events', error }; // structured error response
    }
  }


  @Get("get-event/:eventId")
  async getEvent(@Param("eventId") eventId: string) {
    try {
      const event = await this.verificationService.getEvent(eventId);
      return { success: true, event }; // return a structured response
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error fetching event', error }; // structured error response
    }
  }
  











}
