import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(@InjectModel('Message') private readonly messageModel: Model<Message>) {}



 // Create a new message and save it to MongoDB
 async createMessage(messageData: Partial<Message>): Promise<Message> {
  const message = new this.messageModel({
    ...messageData,
    createdAt: new Date(),
  });
  return await message.save();
}


  async getAllMessages(): Promise<Message[]> {
    return this.messageModel.find().sort({ createdAt: -1 }).exec();
  }
}

