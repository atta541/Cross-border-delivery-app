import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { Payment } from './schemas/payments.schema';
import { Delivery } from './schemas/delivery.schema'; // Update the path to match your file structure


@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @InjectModel('Delivery') private readonly deliveryModel: Model<Delivery>, // Inject the Delivery model

  ) {
    const stripeSecretKey = process.env.STRIPE_TEST_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new BadRequestException('Stripe secret key not configured');
    }

    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-09-30.acacia',
    });
  }

  async createCustomer(email: string, userId: string) {
    try {
      const customer = await this.stripe.customers.create({
        email,
        metadata: {
          userId: String(userId),
        },
      });
      return customer;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new BadRequestException('Failed to create customer');
    }
  }



  async createPaymentIntent(userId: string, amount: number, currency: string, email: string, name: string, customerId: string, productName: string) {
    const paymentData = {
      userId,
      amount,
      email,
      name,
      productName,
      method: 'card',
      currency,
      customerId,
      paymentIntentId: '',
      status: 'pending',
      clientSecret: '', // Add clientSecret here
    };

    if (!paymentData.method || !paymentData.customerId) {
      throw new BadRequestException('Payment method and customer ID are required');
    }

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: paymentData.amount,
      currency: paymentData.currency,
      payment_method_types: ['card'],
    });

    // Set the clientSecret.
    paymentData.clientSecret = paymentIntent.client_secret;

    const newPayment = await this.paymentModel.create({
      ...paymentData,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      invoice: paymentIntent.invoice,
    });

    const paymentMethodId = "pm_1QXjk5KHug0ZiN85wrrvCZYM"
    const comfirmpayment = await this.confirmPayment(newPayment.paymentIntentId, paymentMethodId, customerId)

    console.log("comfirmiingggg the payment inside service", comfirmpayment);
    return newPayment;
  }



  

  // async confirmPayment(paymentIntentId: string, paymentMethodId: string, customerId: string) {
  //   try {
  //     // First, update the payment intent with the saved payment method
  //     const updatedPaymentIntent = await this.stripe.paymentIntents.update(paymentIntentId, {
  //       payment_method: paymentMethodId,
  //       customer: customerId, // Pass the customer ID here

  //     });

  //     // Confirm the payment intent
  //     const confirmedPaymentIntent = await this.stripe.paymentIntents.confirm(updatedPaymentIntent.id);

  //     // Update the payment status in your database
  //     await this.paymentModel.updateOne(
  //       { paymentIntentId: confirmedPaymentIntent.id },
  //       { status: confirmedPaymentIntent.status }
  //     );
  //     if (confirmedPaymentIntent.status === 'succeeded') {
       
  //       console.log("payment confirmed and going to saved in database for further delivery for riders ");
  //     }

  //     return confirmedPaymentIntent;
  //   } catch (error) {
  //     console.error('Error confirming payment:', error.message);
  //     throw new BadRequestException('Failed to confirm payment');
  //   }
  // }



  async confirmPayment(paymentIntentId: string, paymentMethodId: string, customerId: string) {
    try {
      // Step 1: Update the payment intent with the saved payment method
      const updatedPaymentIntent = await this.stripe.paymentIntents.update(paymentIntentId, {
        payment_method: paymentMethodId,
        customer: customerId, // Pass the customer ID here
      });
  
      // Step 2: Confirm the payment intent
      const confirmedPaymentIntent = await this.stripe.paymentIntents.confirm(updatedPaymentIntent.id);
  
      // Step 3: Update the payment status in your database
      await this.paymentModel.updateOne(
        { paymentIntentId: confirmedPaymentIntent.id },
        { status: confirmedPaymentIntent.status }
      );
  
      // Step 4: If payment is successful, save delivery information
      if (confirmedPaymentIntent.status === 'succeeded') {
        console.log("Payment confirmed and saving delivery details to the database.");
  
        // Retrieve necessary information for delivery
        const payment = await this.paymentModel.findOne({ paymentIntentId: confirmedPaymentIntent.id });
        if (!payment) {
          throw new NotFoundException('Payment record not found for delivery processing');
        }
  
        const deliveryData = {
          userId: payment.userId,
          productName: payment.productName,
          amount: payment.amount,
          email: payment.email,
          customerName: payment.name,
          deliverystatus: 'pending', // Initial delivery status
          address: 'Sample Address', // You need to fetch or pass the actual address from `checkoutDto`
          deliveryDate: new Date(), // Optional: Add a delivery date if applicable
        };
  
        // Save delivery details
        await this.deliveryModel.create(deliveryData);
  
        console.log("Delivery details saved successfully:", deliveryData);
      }
  
      return confirmedPaymentIntent;
    } catch (error) {
      console.error('Error confirming payment:', error.message);
      throw new BadRequestException('Failed to confirm payment');
    }
  }
  
  // PaymentService.ts

// async createPaymentMethod(token: string): Promise<string> {
//   try {
//       const paymentMethod = await this.stripe.paymentMethods.create({
//           type: 'card',
//           card: {
//               token,
//           },
//       });
//       return paymentMethod.id;
//   } catch (error) {
//       console.error('Error creating payment method:', error);
//       throw new BadRequestException('Failed to create payment method: ' + error.message);
//   }
// }

// async attachPaymentMethodToCustomer(token: string, customerId: string): Promise<void> {
//   try {
//       const paymentMethodId = await this.createPaymentMethod(token);
//       await this.stripe.paymentMethods.attach(paymentMethodId, {
//           customer: customerId,
//       });
//   } catch (error) {
//       console.error('Error attaching payment method to customer:', error);
//       throw new BadRequestException('Failed to attach payment method to customer: ' + error.message);
//   }
// }




// PaymentService.ts

async createPaymentMethod(token: string): Promise<string> {
  try {
      const paymentMethod = await this.stripe.paymentMethods.create({
          type: 'card',
          card: {
              token,
          },
      });
      return paymentMethod.id;
  } catch (error) {
      console.error('Error creating payment method:', error);
      throw new BadRequestException('Failed to create payment method: ' + error.message);
  }
}

async attachPaymentMethodToCustomer(token: string, customerId: string): Promise<any> {
  try {
      const paymentMethodId = await this.createPaymentMethod(token);
      const paymentMethod = await this.stripe.paymentMethods.attach(paymentMethodId, {
          customer: customerId,
      });
      return paymentMethod; // Return payment method instead of void
  } catch (error) {
      console.error('Error attaching payment method to customer:', error);
      throw new BadRequestException('Failed to attach payment method to customer: ' + error.message);
  }
}

async setDefaultPaymentMethod(customerId: string, paymentMethodId: string): Promise<void> {
  try {
      await this.stripe.customers.update(customerId, {
          invoice_settings: {
              default_payment_method: paymentMethodId,
          },
      });
  } catch (error) {
      console.error('Error setting default payment method:', error);
      throw new BadRequestException('Failed to set default payment method: ' + error.message);
  }
}


// to attach or add bank account to stripe customer account
async attachBankAccountToCustomer(token: string, customerId: string): Promise<any> {
  try {
      const bankAccount = await this.stripe.customers.createSource(customerId, {
          source: token,
      });
      return bankAccount;
  } catch (error) {
      console.error('Error attaching bank account to customer okkkk:', error);
      throw new BadRequestException('Failed to attach bank account to customer ok: ' + error.message);
  }
}



// Retrieve customer's payment method - listPaymentMethods
async retriveCustomerPaymentMethod(customerId: string) {
  try {
    const paymentMethods = await this.stripe.customers.listPaymentMethods(customerId, {
      type: 'card', 
      limit: 3,
    });
    return paymentMethods;
  } catch (error) {
    console.error('Error listing payment methods for customer:', error);
    throw new BadRequestException('Failed to retrieve payment methods for customer: ' + error.message);
  }
}







  // getting the stripe acc balance avable to payout
  async getAccountBalance() {
    try {
      const balance = await this.stripe.balance.retrieve();
      return balance;
    } catch (error) {
      throw new Error(`Failed to retrieve balance: ${error.message}`);
    }
  }



  //  get the transactions from stripe
  async getTransactions(limit: number = 10) {
    try {
      const transactions = await this.stripe.balanceTransactions.list({ limit });
      // const transactions = await this.stripe.paymentIntents.list({ limit });

      return transactions;
    } catch (error) {
      throw new Error(`Failed to retrieve transactions: ${error.message}`);
    }
  }



  async getPayments(limit: number, page: number): Promise<Stripe.PaymentIntent[]> {
    try {
      const paymentIntents = await this.stripe.paymentIntents.list({
        limit: limit,
        starting_after: page > 1 ? await this.getStartingAfter(limit, page) : undefined,
      });
      return paymentIntents.data;
    } catch (error) {
      console.error('Error fetching payments:', error.message);
      throw new Error('Error fetching payments from Stripe');
    }
  }

  private async getStartingAfter(limit: number, page: number): Promise<string | undefined> {
    const offset = (page - 1) * limit;

    const allPayments = await this.stripe.paymentIntents.list({ limit: offset + 1 });
    return allPayments.data[offset - 1]?.id;
  }




  async getOrdersByDateRange(dateRange: string) {
    try {
      const { startDate, endDate } = this.getDateRange(dateRange);

      // Fetch orders and filter by date range
      const orders = await this.stripe.climate.orders.list();
      const filteredOrders = orders.data.filter((order) => {
        const orderDate = new Date(order.created * 1000); // Stripe timestamps are in seconds
        return orderDate >= startDate && orderDate <= endDate;
      });

      return filteredOrders;
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      throw new Error('Error fetching orders from Stripe');
    }
  }

  private getDateRange(dateRange: string) {
    const today = new Date();
    let startDate, endDate;

    switch (dateRange) {
      case 'today':
        startDate = new Date(today.setHours(0, 0, 0, 0));
        endDate = new Date(today.setHours(23, 59, 59, 999));
        break;
      case 'yesterday':
        startDate = new Date(today.setDate(today.getDate() - 1));
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(today.setHours(23, 59, 59, 999));
        break;
      case 'thisWeek':
        startDate = new Date(today.setDate(today.getDate() - today.getDay()));
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(today.setDate(today.getDate() + 6));
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'lastWeek':
        startDate = new Date(today.setDate(today.getDate() - today.getDay() - 7));
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(today.setDate(today.getDate() + 6));
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'lastMonth':
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'last2Months':
        startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
        endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      default:
        throw new Error('Invalid date range');
    }

    return { startDate, endDate };
  }





  // to check the balance of the stripe connect account 
  async customerAccountBalance(accountId: string) {
    try {
      const accountBalance = await this.stripe.balance.retrieve({
        stripeAccount: accountId,
      });
      return accountBalance;
    } catch (error) {
      throw new Error(`Failed to retrieve balance: ${error.message}`);
    }
  }


  // Fetch all payouts for a stripe connected account
  async getPayoutDetails(accountId: string) {
    try {
      const payouts = await this.stripe.payouts.list(
        {}, // Optional filters, e.g., { limit: 5 }
        { stripeAccount: accountId } // Specify the connected account
      );
      return payouts;
    } catch (error) {
      throw new Error(`Failed to retrieve payout details: ${error.message}`);
    }
  }

  // Fetch a specific payout by its ID from a stripe connected account 
  async getPayoutById(accountId: string, payoutId: string) {
    try {
      const payout = await this.stripe.payouts.retrieve(payoutId, {
        stripeAccount: accountId,
      });
      return payout;
    } catch (error) {
      throw new Error(`Failed to retrieve payout: ${error.message}`);
    }
  }



  // transfer the funds to customer stripe connect account
  async transferToCustomer(accountId: string, amount: number, currency: string) {
    try {
      const transfer = await this.stripe.transfers.create({
        amount: amount,
        currency: currency,
        destination: accountId,
        description: 'Transfer for customer payout by atta',
      });
      return transfer;
    } catch (error) {
      throw new Error(`Transfer failed: ${error.message}`);
    }
  }



  // this api charge the amount from the customer account in stripe connect accounts means deduct the amount from customer account 

  async createCharge(customerId: string, amount: number, currency: string, description?: string) {
    try {
      const charge = await this.stripe.charges.create({
        amount: amount, // Amount in the smallest currency unit (e.g., pence for GBP)
        currency: currency, // Currency code (e.g., 'usd', 'gbp')
        customer: customerId, // Customer ID from Stripe
        description: description || 'Charge for customer',
      });
      return charge;
    } catch (error) {
      throw new Error(`Charge creation failed: ${error.message}`);
    }
  }


  async listConnectedAccounts(limit: number, startingAfter?: string) {
    const params: any = { limit };
    if (startingAfter) {
      params.starting_after = startingAfter;
    }
    return await this.stripe.accounts.list(params);
  }


  async findByUserId(userId: string): Promise<Payment[]> {
    return this.paymentModel.find({ userId }).exec();
  }







}