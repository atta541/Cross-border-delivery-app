import { Controller, Post, Get, Body, Param, Request, UseGuards, Put, Delete } from '@nestjs/common';
import { OccasionService } from './occasion.service';
import { Occasion } from './schemas/occasion.schema';
import { Roles } from '@src/auth/decoraters/roles.decoraters';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@src/guards/role.guards';
import { Role } from '@src/auth/enums/role.enum';

@Controller('occasions')
export class OccasionController {
  constructor(private readonly occasionService: OccasionService) {}

  
  @Post()
  @Roles(Role.Client)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async addOccasion(
    @Request() req,
    @Body() occasionData: { person: string; occasionType: string; date: Date },
  ): Promise<Occasion> {
    const userId = req.user.id; 
    return this.occasionService.addOccasion(
      userId,
      occasionData.person,
      occasionData.occasionType,
      occasionData.date,
    );
  }

  // Endpoint to get all occasions for a specific user and person
  @Get(':person')
  @Roles(Role.Client)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getOccasions(@Request() req, @Param('person') person: string): Promise<Occasion[]> {
    const userId = req.user.id; // Get userId from the request
    return this.occasionService.getOccasions(userId, person);
  }

  // Endpoint to get all occasions for a specific user (no filtering by person)
  @Get()
  @Roles(Role.Client)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getAllOccasions(@Request() req): Promise<Occasion[]> {
    const userId = req.user.id; // Get userId from the request
    return this.occasionService.getAllOccasionsForUser(userId);
  }

  // Endpoint to update an existing occasion
  @Put(':id')
  @Roles(Role.Client)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async updateOccasion(
    @Request() req,
    @Param('id') id: string,
    @Body() occasionData: { person: string; occasionType: string; date: Date },
  ): Promise<Occasion> {
    const userId = req.user.id; // Get userId from the request
    return this.occasionService.updateOccasion(
      id,
      userId,
      occasionData.person,
      occasionData.occasionType,
      occasionData.date,
    );
  }

  // Endpoint to delete an occasion
  @Delete(':id')
  @Roles(Role.Client)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async deleteOccasion(@Request() req, @Param('id') id: string): Promise<void> {
    const userId = req.user.id; // Get userId from the request
    return this.occasionService.deleteOccasion(id, userId);
  }
}
