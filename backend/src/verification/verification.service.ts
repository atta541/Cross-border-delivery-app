import { Injectable, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

import { Express } from 'express';
import path from 'path';






@Injectable()
export class VerificationService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    
    const stripeSecretKey =
      process.env.STRIPE_TEST_SECRET_KEY || this.configService.get<string>('STRIPE_TEST_SECRET_KEY');
      

    if (!stripeSecretKey) {
      throw new BadRequestException('Stripe secret key not configured');
    }

    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-09-30.acacia',
    });
  }
  async createConnectAccount(data: any, ip: string) {
    try {
      const {
        email,
        first_name: firstName,
        last_name: lastName,
        phone,
        city,
        line1,
        postal_code: postalCode,
        dob_day: dobDay,
        dob_month: dobMonth,
        dob_year: dobYear,
      } = data;

      const account = await this.stripe.accounts.create({
        country: 'GB',
        email: email,
        business_type: 'individual',
        business_profile: {
          mcc: '7372',
          url: 'https://smr3.co.uk',
        },
        capabilities: {
          transfers: { requested: true },
          card_payments: { requested: true },

        },
        tos_acceptance: {
          date: Math.floor(Date.now() / 1000),
          ip: ip,
        },

        controller: {
          fees: {
            payer: 'application',
          },
          losses: {
            payments: 'application',
          },
          requirement_collection: 'application',
          stripe_dashboard: {
            type: 'none',
          },
        },
        individual: {
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          address: {
            city: city,
            line1: line1,
            postal_code: postalCode,
          },
          dob: {
            day: dobDay,
            month: dobMonth,
            year: dobYear,
          },
          email: email,
        },
      });

      return account;
    } catch (error) {
      throw new BadRequestException(`Stripe error: ${error.message}`);
    }
  }


  async deleteConnectAccount(accountId: string) {
    try {
      const deletedAccount = await this.stripe.accounts.del(accountId);
      return deletedAccount;
    } catch (error) {
      throw new BadRequestException(`Stripe error: ${error.message}`);
    }
  }

  // async createVerificationDocument(accountId: string, filePath: string) {
  //   try {
  //     const file = await this.stripe.files.create({
  //       purpose: 'identity_document',
  //       file: {
  //         data: fs.readFileSync(filePath),
  //         name: 'document.jpg',
  //         type: 'application/octet-stream',
  //       },
  //     });

  //     const updatedAccount = await this.stripe.accounts.update(accountId, {
  //       individual: {
  //         verification: {
  //           document: {
  //             front: file.id,
  //           },
  //         },
  //       },
  //     });

  //     return {
  //       message: 'Document uploaded and attached successfully.',
  //       status: updatedAccount.individual.verification.status,
  //     };
  //   } catch (error) {
  //     throw new BadRequestException(`Error uploading and attaching document: ${error.message}`);
  //   }
  // }



  // async createVerificationDocument(accountId: string, filePath: string) {
  //   try {
  //     const file = await this.stripe.files.create({
  //       purpose: 'identity_document',
  //       file: {
  //         data: fs.readFileSync(filePath),
  //         name: 'document.jpg',
  //         type: 'application/octet-stream',

  //       },
  //     });
  //     console.log("file id " + file.id);

  //     const updatedAccount = await this.stripe.accounts.update(accountId, {
  //       individual: {
  //         verification: {
  //           document: {
  //             front: file.id,
  //             // back: file.id,
  //           },
  //         },
  //       },
  //     });
  //     return {
  //       message: 'Document uploaded and attached successfully.',
  //       status: updatedAccount.individual.verification.status,
  //     };
  //   } catch (error) {
  //     throw new BadRequestException(`Error uploading and attaching document: ${error.message}`);
  //   }
  // }



  async createVerificationDocument(accountId: string, frontFilePath: string, backFilePath: string) {
    try {
      // Upload front and back files to Stripe
      const frontFile = await this.stripe.files.create({
        purpose: 'identity_document',
        file: {
          data: fs.readFileSync(frontFilePath),
          name: 'front.jpg',
          type: 'application/octet-stream',
        },
      });
  
      const backFile = await this.stripe.files.create({
        purpose: 'identity_document',
        file: {
          data: fs.readFileSync(backFilePath),
          name: 'back.jpg',
          type: 'application/octet-stream',
        },
      });
  
      console.log("Front file id: " + frontFile.id);
      console.log("Back file id: " + backFile.id);
  
      const updatedAccount = await this.stripe.accounts.update(accountId, {
        individual: {
          verification: {
            document: {
              front: frontFile.id,
              back: backFile.id,
            },
          },
        },
      });
  
      return {
        message: 'Document uploaded and attached successfully.',
        status: updatedAccount.individual.verification.status,
      };
    } catch (error) {
      throw new BadRequestException(`Error uploading and attaching document: ${error.message}`);
    }
  }

  

  async attachExternalAccount(
    accountId: string,
    token: string,
    // accountNumber: string,
    // country: string,
    // currency: string,
    // routing: string

  ) {
    try {
      const externalAccount = await this.stripe.accounts.createExternalAccount(accountId, {
        external_account: token,
        default_for_currency: true,
      });

      return {
        message: 'External account attached successfully.',
      };
    } catch (error) {
      throw new BadRequestException(`Error attaching external account: ${error.message}`);
    }
  }



  async checkVerificationStatus(accountId: string) {
    try {
      const account = await this.stripe.accounts.retrieve(accountId);
      return {
        status: account.individual.verification.status,
      };
    } catch (error) {
      throw new BadRequestException(`Error checking verification status: ${error.message}`);
    }
  }



  async payout(externalAccountId: string, amount: number) {
    const payout = await this.stripe.payouts.create(
      { amount: 100, currency: 'gbp', },
      {
        stripeAccount: 'acct_1QDQBHGaGhPNTWKW',
      });
    console.log(payout);
    return payout;
  }



  async listExternalAccounts(accountId: string) {
    const externalAccounts = await this.stripe.accounts.listExternalAccounts(
      'acct_1QCOEWGhhzHZCjGm',
      {
        object: 'bank_account',
      }
    );
    console.log(externalAccounts);
    return externalAccounts.data;
  }



  // async identityVerification(accountId: string) {
  //   try {
  //     // Create a new verification session
  //     const verification = await this.stripe.identity.verificationSessions.create({
  //       type: 'document',
  //     });

  //     // Update the verification session with additional parameters
  //     const updatedVerification = await this.stripe.identity.verificationSessions.update(verification.id, {
  //       type: 'id_number',
  //     });

  //     // Return the updated verification session's client secret
  //     return updatedVerification.client_secret;
  //   } catch (error) {
  //     console.error('Stripe Verification Error:', error);
  //     throw new Error(`Failed to create or update verification session: ${error.message}`);
  //   }
  // }



  // async createVerificationSession(accountId: string): Promise<{ clientSecret: string; verificationId: string }> {
  //   try {
  //     // Create a new verification session
  //     const verificationSession = await this.stripe.identity.verificationSessions.create({
  //       type: 'document', // Specify the type of verification session
  //       metadata: {
  //         account_id: accountId, // Attach account ID for tracking
  //       },
  //     });

  //     return {
  //       clientSecret: verificationSession.client_secret,
  //       verificationId: verificationSession.id,
  //     };
  //   } catch (error) {
  //     console.error('Stripe Identity Service Error:', error);
  //     throw new Error(`Failed to create verification session: ${error.message}`);
  //   }
  // }



  async updateAccountCapabilities(accountId: string): Promise<void> {
    try {
      const updatedAccount = await this.stripe.accounts.retrieve(accountId, {


      });
      console.log('Account capabilities updated:', updatedAccount);
    } catch (error) {
      console.error('Error updating account capabilities:', error);
      throw new Error(`Failed to update account capabilities: ${error.message}`);
    }
  }






  async createVerificationSession(accountId: string): Promise<{ clientSecret: string; verificationId: string } & { ephemeralKeySecret: string } & { verificationUrl: string }> {
    try {
      const verificationSession = await this.stripe.identity.verificationSessions.create({
        type: 'document',
        metadata: {
          user_Id: accountId,
        },

        options: {
          document: {
            allowed_types: ['driving_license', 'id_card', 'passport'],
            require_id_number: true,
            require_live_capture: true,
            require_matching_selfie: true
          },
        }
      });



      console.log("ephemeral key hitted")
      // Generate the ephemeral key for client-side verification
      const ephemeralKey = await this.stripe.ephemeralKeys.create(
        { verification_session: verificationSession.id },
        { apiVersion: '2024-09-30.acacia' }
      );

      console.log(" ephemeral key id " + ephemeralKey.secret)
      console.log("verification session id" + verificationSession.id,)


      return {
        clientSecret: verificationSession.client_secret,
        verificationId: verificationSession.id,

        ephemeralKeySecret: ephemeralKey.secret,
        verificationUrl: verificationSession.url

      };
    } catch (error) {
      console.error('Stripe Identity Service Error:', error);
      throw new Error(`Failed to create verification session: ${error.message}`);
    }
  }






  // async uploadDocument(verificationId: string, file: Express.Multer.File) {
  //   try {
  //     // Use the correct verification session ID
  //     console.log('Verification ID:', verificationId);
  //     // const verificationId = 'vs_1QZDaUKHug0ZiN85fo5YEHwe'
  //     const verificationSession = await this.stripe.identity.verificationSessions.update(verificationId, {
  //       options: {
  //         document: {
  //           allowed_types: ['passport', 'id_card', 'driving_license'],
  //           require_id_number: false,
  //           require_live_capture: true,
  //         },
  //       },
  //     });


  //     return verificationSession;
  //   } catch (error) {
  //     console.error('Error uploading document:', error);
  //     throw new Error(`Failed to upload document: ${error.message}`);
  //   }
  // }





  async getEvents() {
    try {
      const events = await this.stripe.events.list({ limit: 1});
      console.log(events);
      return events.data; // returning only the event data
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve events');
    }
  }


async getEvent(eventId: string) {
  try {
    const event = await this.stripe.events.retrieve(eventId);
    console.log(event);
    return event;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to retrieve event');
  }}











}












