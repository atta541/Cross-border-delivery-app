import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesGateway } from './messages.gateway';
import { MessagesService } from './messages.service';
import { MessageSchema } from './schemas/message.schema';
import { MessagesController } from './messages.controller';



@Module({
  imports: [MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }])],
  controllers: [MessagesController],

  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
