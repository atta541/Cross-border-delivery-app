import { Schema, Document } from 'mongoose';

export const MessageSchema = new Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: {
    _id: { type: String, required: true },
    name: { type: String, required: true },
  },
});

export interface Message extends Document {
  text: string;
  createdAt: Date;
  user: {
    _id: string;
    name: string;
  };
}

