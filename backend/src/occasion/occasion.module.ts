import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OccasionService } from './occasion.service';
import { OccasionController } from './occasion.controller';
import { Occasion, OccasionSchema } from './schemas/occasion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Occasion.name, schema: OccasionSchema }]), 
  ],
  providers: [OccasionService],
  controllers: [OccasionController],
  exports: [OccasionService], 
})
export class OccasionModule {}
