import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Purchase } from './schemas/purchases.schema'

@Injectable()
export class PurchasesService {
  constructor(@InjectModel(Purchase.name) private purchaseModel: Model<Purchase>) {}

  async createPurchase(customerId: string, productId: string, quantity: number, price: number) {
    const totalPrice = quantity * price;

    const purchase = new this.purchaseModel({
      customerId,
      productId,
      quantity,
      totalPrice,
      status: 'Pending',
    });
    return purchase.save();
  }

  async assignRider(purchaseId: string, riderId: string) {
    return this.purchaseModel.findByIdAndUpdate(
      purchaseId,
      { assignedRiderId: riderId, status: 'Assigned' },
      { new: true },
    );
  }

  async getCustomerPurchases(customerId: string) {
    return this.purchaseModel.find({ customerId });
  }

  async getRiderAssignedPurchases(riderId: string) {
    return this.purchaseModel.find({ assignedRiderId: riderId });
  }
}
