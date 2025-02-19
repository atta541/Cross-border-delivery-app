import { Controller, Post, Body, Req, UseGuards, Get, BadRequestException, Query, HttpException, HttpStatus, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Request } from 'express';
import { Roles } from '../auth/decoraters/roles.decoraters';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/role.guards';
import { Role } from '../auth/enums/role.enum';
import Stripe from 'stripe';


interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    roles: string[];
  };
}

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentsService: PaymentService) { }

  @Post('create-customer')
  @UseGuards(AuthGuard('jwt'))
  async createCustomer(@Req() req: RequestWithUser) {
    const { id: userId, email } = req.user;
    const customer = await this.paymentsService.createCustomer(email, userId);
    return {
      customerId: customer.id,
    };
  }


  @Post('create-payment-intent')
  // @UseGuards(AuthGuard('jwt'))
  async createPaymentIntent(
    @Req() req: RequestWithUser,
    @Body('amount') amount: string,
    @Body('customerId') customerId: string,
    @Body('name') name: string,
    @Body('productName') productName: string // Fix the variable name to be consistent
  ) {
    // const userId = req.user.id;
    const userId = req.user.id;


    const currency = 'usd';
    const email = req.user.email;



    // Convert amount to number
    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount)) {
      throw new BadRequestException('Amount must be a valid number');
    }

    const paymentIntent = await this.paymentsService.createPaymentIntent(userId, parsedAmount, currency, email, name, customerId, productName);

    return {
      clientSecret: paymentIntent.clientSecret, // Return the clientSecret
    };
  }


  @Post('confirm-payment')
  async confirmPayment(@Body() body: { paymentIntentId: string; paymentMethodId: string; customerId: string }) {
    const { paymentIntentId, paymentMethodId, customerId } = body;


    try {

      // const paymentMethodId = "pm_1QhZEHKHug0ZiN85eXMRdBfS"
      const paymentIntent = await this.paymentsService.confirmPayment(paymentIntentId, paymentMethodId, customerId);
      return paymentIntent;
    } catch (error) {
      throw new Error(`Error confirming payment: ${error.message}`);
    }

  }



  // @Post('create-payment-method')
  // @UseGuards(AuthGuard('jwt'))
  // async createPaymentMethod(@Body() createPaymentDto) {
  //   const { customerId, token } = createPaymentDto;

  //   if (!customerId || !token) {
  //     throw new BadRequestException('Customer ID and token are required');
  //   }

  //   const paymentMethod = await this.paymentsService.attachPaymentMethodToCustomer(token, customerId);
  //   return { message: 'Payment method created and attached', paymentMethod };
  // }




  //   @Post('create-payment-method')
  // @UseGuards(AuthGuard('jwt'))
  // async createPaymentMethod(@Body() createPaymentDto) {
  //   const { customerId, token } = createPaymentDto;

  //   if (!customerId || !token) {
  //     throw new BadRequestException('Customer ID and token are required');
  //   }

  //   const paymentMethod = await this.paymentsService.attachPaymentMethodToCustomer(token, customerId);

  //   // Set the newly created payment method as the default
  //   await this.paymentsService.setDefaultPaymentMethod(customerId, paymentMethod.id);

  //   return { message: 'Payment method created, attached, and set as default', paymentMethod };
  // }



  @Post('create-payment-method')
  @UseGuards(AuthGuard('jwt'))
  async createPaymentMethod(@Body() createPaymentDto) {
    const { customerId, token, setAsDefault } = createPaymentDto;

    if (!customerId || !token) {
      throw new BadRequestException('Customer ID and token are required');
    }

    const paymentMethod = await this.paymentsService.attachPaymentMethodToCustomer(token, customerId);

    if (setAsDefault) {
      await this.paymentsService.setDefaultPaymentMethod(customerId, paymentMethod.id);
    }

    return { message: 'Payment method created and attached', paymentMethod };
  }

  // add bank account to customer
  @Post("attach-bank-account-to-customer")
  @UseGuards(AuthGuard('jwt'))
  async attachBankAccountToCustomer(@Body() createPaymentDto) {
    const { customerId, token, setAsDefault } = createPaymentDto;

    if (!customerId || !token) {
      throw new BadRequestException('Customer ID and token are required');
    }


    const bankAccount = await this.paymentsService.attachBankAccountToCustomer(token, customerId);

    // if (setAsDefault) {
    //   await this.paymentsService.setDefaultPaymentMethod(customerId, bankAccount.id);
    // }
    // console.log("External account attached successfully")


    return { message: 'Bank account created and attached', bankAccount };
  }







  // retrive customer payment methods/cards
  @Get('list-payment-methods/:customerId')
  async retriveCustomerPaymentMethod(@Param('customerId') customerId: string) {
    try {
      const paymentMethods = await this.paymentsService.retriveCustomerPaymentMethod(customerId); // Pass the customer ID dynamically
      return paymentMethods;
    } catch (error) {
      console.error('Error retrieving payment methods:', error);
      throw new BadRequestException('Failed to retrieve payment methods: ' + error.message);
    }
  }


  // to get the balance from stripe 
  @Get('balance')
  async getBalance() {
    try {
      const balance = await this.paymentsService.getAccountBalance();
      return balance;
    } catch (error) {
      return { error: error.message };
    }
  }

  // getting the transactions from stripe
  @Get('transactions')
  async getTransactions(@Query('limit') limit: string) {
    try {
      const transactions = await this.paymentsService.getTransactions(Number(limit) || 10);
      return transactions;
    } catch (error) {
      return { error: error.message };
    }
  }

  // to get the payments info from stripe
  @Get('stripe')
  async payments(
    @Query('limit') limit: string,
    @Query('page') page: string,
  ): Promise<Stripe.PaymentIntent[]> {
    try {
      const pageSize = parseInt(limit, 10) || 10; // Default limit to 10
      const pageNumber = parseInt(page, 10) || 1; // Default to first page

      return await this.paymentsService.getPayments(pageSize, pageNumber);
    } catch (error) {
      console.error('Error fetching payments:', error.message);
      throw new BadRequestException('Failed to fetch payments');
    }
  }


  @Get('orders')
  async getOrders(@Query('dateRange') dateRange: string) {
    try {
      const orders = await this.paymentsService.getOrdersByDateRange(dateRange);
      return { totalOrders: orders.length };
    } catch (error) {
      return { error: error.message };
    }
  }




  // to check the balance of the stripe connect account 
  // http://localhost:3001/payments/customer-account-balance?accountId=acct_1QDQBHGaGhPNTWKW
  @Get('customer-account-balance')
  async getCustomerAccountBalance(@Query('accountId') accountId: string) {
    try {
      if (!accountId) {
        throw new Error('Account ID is required');
      }
      const balance = await this.paymentsService.customerAccountBalance(accountId);
      return balance;
    } catch (error) {
      return { error: error.message };
    }
  }



  // Fetch all payouts from stripe connect account 
  // http://localhost:3001/payments/payout-details?accountId=acct_1QDQBHGaGhPNTWKW
  @Get('payout-details')
  async getPayoutDetails(@Query('accountId') accountId: string) {
    try {
      if (!accountId) {
        throw new Error('Account ID is required');
      }
      const payouts = await this.paymentsService.getPayoutDetails(accountId);
      return payouts;
    } catch (error) {
      return { error: error.message };
    }
  }

  // Fetch a specific payout by ID stripe connect account
  // http://localhost:3001/payments/payout?accountId=acct_1QDQBHGaGhPNTWKW&payoutId=po_1QDougGaGhPNTWKWntUB1YeH 
  @Get('payout')
  async getPayoutById(
    @Query('accountId') accountId: string,
    @Query('payoutId') payoutId: string
  ) {
    try {
      if (!accountId || !payoutId) {
        throw new Error('Account ID and Payout ID are required');
      }
      const payout = await this.paymentsService.getPayoutById(accountId, payoutId);
      return payout;
    } catch (error) {
      return { error: error.message };
    }
  }


  // transfer the funds to customer stripe connect account
  // http://localhost:3001/payments/transfer-to-customer   this also requires body
  @Post('transfer-to-customer')
  async transferToCustomer(@Body() transferDto: { accountId: string; amount: number; currency: string }) {
    try {
      const { accountId, amount, currency } = transferDto;
      const transfer = await this.paymentsService.transferToCustomer(accountId, amount, currency);
      return { message: 'Transfer successful', transfer };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }





  // this api charge the amount from the customer account in stripe connect accounts means deduct the amount from customer account 
  @Post('create-charge')
  async createCharge(@Body() chargeDto: { customerId: string; amount: number; currency: string; description?: string }) {
    try {
      const { customerId, amount, currency, description } = chargeDto;
      const charge = await this.paymentsService.createCharge(customerId, amount, currency, description);
      return { message: 'Charge created successfully', charge };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }




  // this end point list all the connect accounts
  @Get('list-connected-accounts')
  async listConnectedAccounts(
    @Query('limit') limit: string,
    @Query('starting_after') startingAfter?: string,
  ) {
    return this.paymentsService.listConnectedAccounts(Number(limit), startingAfter);
  }




}

