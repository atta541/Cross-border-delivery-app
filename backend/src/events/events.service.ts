// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Event } from './schemas/event.schema';
// import { CreateEventDto } from './dto/create-event.dto';
// import { UpdateEventDto } from './dto/update-event.dto';

// @Injectable()
// export class EventsService {
//   constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

//   // Create a new event
//   async create(createEventDto: CreateEventDto): Promise<Event> {
//     const newEvent = new this.eventModel(createEventDto);
//     return newEvent.save();
//   }

//   // Get all events
//   async findAll(): Promise<Event[]> {
//     return this.eventModel.find().exec();
//   }

//   // Get a specific event by ID
//   async findOne(id: string): Promise<Event> {
//     const event = await this.eventModel.findById(id).exec();
//     if (!event) {
//       throw new NotFoundException(`Event with ID ${id} not found`);
//     }
//     return event;
//   }

//   // Update an event
//   async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
//     const updatedEvent = await this.eventModel.findByIdAndUpdate(
//       id,
//       updateEventDto,
//       { new: true },
//     ).exec();
//     if (!updatedEvent) {
//       throw new NotFoundException(`Event with ID ${id} not found`);
//     }
//     return updatedEvent;
//   }

//   // Delete an event
//   async remove(id: string): Promise<void> {
//     const result = await this.eventModel.findByIdAndDelete(id).exec();
//     if (!result) {
//       throw new NotFoundException(`Event with ID ${id} not found`);
//     }
//   }
// }





// import { Injectable, NotFoundException, Logger } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Event } from './schemas/event.schema';
// import { CreateEventDto } from './dto/create-event.dto';
// import { UpdateEventDto } from './dto/update-event.dto';
// import axios from 'axios';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class EventsService {
//   private readonly logger = new Logger(EventsService.name);

//   // Get current year dynamically
//   private get currentYear(): number {
//     return new Date().getFullYear();
//   }

//   // Get the API key from the environment variables
//   private readonly apiKey: string;

//   private readonly calendarApiUrlBase =
//     'https://calendarific.com/api/v2/holidays?&api_key=';

//   constructor(
//     @InjectModel(Event.name) private eventModel: Model<Event>,
//     private configService: ConfigService, // Inject ConfigService
//   ) {
//     // Get the API key from the .env file
//     this.apiKey = this.configService.get<string>('CALENDAR_API_KEY');
//   }

//   // Create a new event
//   async create(createEventDto: CreateEventDto): Promise<Event> {
//     const newEvent = new this.eventModel(createEventDto);
//     return newEvent.save();
//   }

//   // Get all events
//   async findAll(): Promise<Event[]> {
//     return this.eventModel.find().exec();
//   }

//   // Get a specific event by ID
//   async findOne(id: string): Promise<Event> {
//     const event = await this.eventModel.findById(id).exec();
//     if (!event) {
//       throw new NotFoundException(`Event with ID ${id} not found`);
//     }
//     return event;
//   }

//   // Update an event
//   async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
//     const updatedEvent = await this.eventModel
//       .findByIdAndUpdate(id, updateEventDto, { new: true })
//       .exec();
//     if (!updatedEvent) {
//       throw new NotFoundException(`Event with ID ${id} not found`);
//     }
//     return updatedEvent;
//   }

//   // Delete an event
//   async remove(id: string): Promise<void> {
//     const result = await this.eventModel.findByIdAndDelete(id).exec();
//     if (!result) {
//       throw new NotFoundException(`Event with ID ${id} not found`);
//     }
//   }

//   // Fetch events from Calendarific API and store them in the database
//   private async fetchHolidaysFromApi(): Promise<void> {
//     const calendarApiUrl = `${this.calendarApiUrlBase}${this.apiKey}&country=PK&year=${this.currentYear}`; // Use the dynamic API key

//     try {
//       const response = await axios.get(calendarApiUrl);
//       const holidays = response.data.response.holidays;

//       // Iterate over the holidays and save them to the database
//       for (const holiday of holidays) {
//         // Prepare the event data to store
//         const eventDto: CreateEventDto = {
//           eventName: holiday.name,
//           eventType: 'National', // Set to 'National' as an example, you can change this logic
//           date: new Date(holiday.date.iso),
//           description: holiday.description,
//           recurring: false, // Assuming holidays don't recur, adjust as needed
//           religion: 'None', // You can adjust this as needed
//           country: holiday.country.name, // Use the country from the API
//         };

//         // Check if the event already exists by name and date to avoid duplicates
//         const existingEvent = await this.eventModel
//           .findOne({ eventName: holiday.name, date: new Date(holiday.date.iso) })
//           .exec();

//         if (!existingEvent) {
//           // Create the event if it doesn't already exist
//           await this.create(eventDto);
//         } else {
//           // Optionally update the existing event if necessary
//           // For now, we are not updating, just skipping existing events
//           this.logger.log(`Event "${holiday.name}" already exists, skipping...`);
//         }
//       }
//     } catch (error) {
//       this.logger.error('Failed to fetch holidays from Calendarific API', error);
//     }
//   }

//   // Run the fetchHolidaysFromApi method once a year using a cron job
//   @Cron(CronExpression.EVERY_YEAR) // This runs once a year (January 1st)
//   async handleCron() {
//     this.logger.log('Fetching holidays from Calendarific API...');
//     await this.fetchHolidaysFromApi();
//     this.logger.log('Holiday data fetching completed.');
//   }
// }





import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  // Get current year dynamically
  private get currentYear(): number {
    return new Date().getFullYear();
  }

  // Get the API key from the environment variables
  private readonly apiKey: string;

  private readonly calendarApiUrlBase =
    'https://calendarific.com/api/v2/holidays?&api_key=';

  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    private configService: ConfigService, // Inject ConfigService
  ) {
    // Get the API key from the .env file
    this.apiKey = this.configService.get<string>('CALENDAR_API_KEY');
  }

  // Create a new event
  async create(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = new this.eventModel(createEventDto);
    return newEvent.save();
  }

  // Get all events
  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  // Get a specific event by ID
  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  // Update an event
  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const updatedEvent = await this.eventModel
      .findByIdAndUpdate(id, updateEventDto, { new: true })
      .exec();
    if (!updatedEvent) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return updatedEvent;
  }

  // Delete an event
  async remove(id: string): Promise<void> {
    const result = await this.eventModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }



// Fetch events from Calendarific API and store or update them in the database
private async fetchHolidaysFromApi(): Promise<void> {
  const calendarApiUrl = `${this.calendarApiUrlBase}${this.apiKey}&country=PK&year=${this.currentYear}`; // Use the dynamic API key

  try {
    const response = await axios.get(calendarApiUrl);
    const holidays = response.data.response.holidays;

    // Iterate over the holidays and save or update them in the database
    for (const holiday of holidays) {
      // Prepare the event data to store or update
      const eventDto: CreateEventDto = {
        eventName: holiday.name,
        eventType: 'National', // Set to 'National' as an example, you can change this logic
        date: new Date(holiday.date.iso),
        description: holiday.description,
        recurring: false, // Assuming holidays don't recur, adjust as needed
        religion: 'None', // You can adjust this as needed
        country: holiday.country.name, // Use the country from the API
      };

      // Check if the event already exists by name and date to avoid duplicates
      const existingEvent = await this.eventModel
        .findOne({ eventName: holiday.name, date: new Date(holiday.date.iso) })
        .exec();

      if (!existingEvent) {
        // Create the event if it doesn't already exist
        await this.create(eventDto);
        this.logger.log(`Event "${holiday.name}" created.`);
      } else {
        // Forcefully update all fields of the existing event
        existingEvent.eventType = eventDto.eventType;
        existingEvent.description = eventDto.description;
        existingEvent.recurring = eventDto.recurring;
        existingEvent.religion = eventDto.religion;
        existingEvent.country = eventDto.country;
        existingEvent.date = eventDto.date;

        // Save the updated event and log the update
        await existingEvent.save();
        this.logger.log(`Event "${holiday.name}" updated with new description.`);
      }
    }
  } catch (error) {
    this.logger.error('Failed to fetch holidays from Calendarific API', error);
  }
}



  // Run the fetchHolidaysFromApi method once a year using a cron job
  @Cron(CronExpression.EVERY_YEAR) // This runs once a year (January 1st)
  async handleCron() {
    this.logger.log('Fetching holidays from Calendarific API...');
    await this.fetchHolidaysFromApi();
    this.logger.log('Holiday data fetching completed.');
  }
}
