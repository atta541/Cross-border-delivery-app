import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Occasion, OccasionDocument } from './schemas/occasion.schema';

@Injectable()
export class OccasionService {
  constructor(
    @InjectModel(Occasion.name) private occasionModel: Model<OccasionDocument>,
  ) {}

  // Method to add a new occasion with userId
  async addOccasion(
    userId: string,
    person: string,
    occasionType: string,
    date: Date,
  ): Promise<Occasion> {
    const newOccasion = new this.occasionModel({
      userId,
      person,
      occasionType,
      date,
    });
    return newOccasion.save();
  }

  // Method to get all occasions for a user
  async getOccasions(userId: string, person: string): Promise<Occasion[]> {
    return this.occasionModel.find({ userId, person }).exec();
  }

  // Method to get all occasions for a user (without filtering by person)
  async getAllOccasionsForUser(userId: string): Promise<Occasion[]> {
    return this.occasionModel.find({ userId }).exec();
  }

  // Method to update an existing occasion
  async updateOccasion(
    id: string,
    userId: string,
    person: string,
    occasionType: string,
    date: Date,
  ): Promise<Occasion> {
    const occasion = await this.occasionModel.findOne({ _id: id, userId }).exec();
    if (!occasion) {
      throw new NotFoundException(`Occasion with ID ${id} not found`);
    }
    if (occasion.userId !== userId) {
      throw new ForbiddenException('You are not authorized to update this occasion');
    }
    occasion.person = person;
    occasion.occasionType = occasionType;
    occasion.date = date;
    return occasion.save();
  }

  // Method to delete an occasion
  async deleteOccasion(id: string, userId: string): Promise<void> {
    const occasion = await this.occasionModel.findOne({ _id: id, userId }).exec();
    if (!occasion) {
      throw new NotFoundException(`Occasion with ID ${id} not found`);
    }
    if (occasion.userId !== userId) {
      throw new ForbiddenException('You are not authorized to delete this occasion');
    }
    await this.occasionModel.deleteOne({ _id: id });
  }
}
