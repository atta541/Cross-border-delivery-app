import { Controller, Patch, Param, Body, Post, Get, UseGuards, Req, Query, BadRequestException } from '@nestjs/common';
import { RiderTrackingService } from './rider-tracking.service';
import { Roles } from '@src/auth/decoraters/roles.decoraters';
import { Role } from '@src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@src/guards/role.guards';
import { ObjectId } from 'mongodb';  // Import ObjectId from MongoDB


interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    roles: string[];
  };
}


@Controller('rider-tracking')
export class RiderTrackingController {
  constructor(private readonly riderTrackingService: RiderTrackingService) { }

  @Post('add-rider')
  async addRider(@Body() body: { name: string; phone: string; latitude: number; longitude: number }) {
    const location: [number, number] = [body.latitude, body.longitude];
    return this.riderTrackingService.addRider(body.name, body.phone, location);
  }


  @Patch(':riderId/location')
  async updateLocation(
    @Param('riderId') riderId: string,
    @Body() body: { latitude: number; longitude: number },
  ) {
    const location: [number, number] = [body.latitude, body.longitude];

    await this.riderTrackingService.updateRiderLocation(riderId, location);
    return { message: 'Rider location updated successfully.' };
  }






  // this endpoint returns a list of available deliveries
  @Get('deliveries/available')
  @Roles(Role.Rider)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getAvailableDeliveries(@Req() req: RequestWithUser) {
    const deliveries = await this.riderTrackingService.getAvailableDeliveries();

    if (deliveries.length === 0) {
      return {
        success: false,
        message: 'No deliveries are currently available.',
      };
    }

    return {
      success: true,
      message: 'Available deliveries retrieved successfully.',
      data: deliveries,
    };
  }

  //  this endpoint will assign a delivery to a rider. the rider can himself assign a delivery from app
  @Patch('deliveries/assign/:id')
  @Roles(Role.Rider)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async assignDelivery(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.riderTrackingService.assignDelivery(id, req.user.id);
  }


  // this endpoint will return a list of deliveries assigned to a rider
  @Get('deliveries/assigned')
  @Roles(Role.Rider)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getAssignedDeliveries(@Req() req: RequestWithUser) {
    const riderId = req.user.id; // Retrieve the rider's ID from the authenticated user
    const deliveries = await this.riderTrackingService.getAssignedDeliveries(riderId);
    console.log("deliveries" + deliveries)

    if (deliveries.length === 0) {
      return {
        success: false,
        message: 'No assigned deliveries found.',
      };
    }

    return {
      success: true,
      message: 'Assigned deliveries retrieved successfully.',
      data: deliveries,
    };
  }

  // this endpoint will mark a delivery as delivered. this action will be only marked by the rider from app
  @Patch('deliveries/:id/complete')
  @Roles(Role.Rider)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async markAsDelivered(@Param('id') deliveryId: string, @Req() req: RequestWithUser) {
    const riderId = req.user.id;
    const result = await this.riderTrackingService.markDeliveryAsComplete(deliveryId, riderId);
    if (!result) {
      return {
        success: false,
        message: 'Failed to update delivery status or unauthorized action.',
      };
    }
    return {
      success: true,
      message: 'Delivery marked as delivered successfully.',
    };
  }


  //  this endpoint will return a list of completed deliveries for a specific rider. that you have completed these deliveries
  @Get('deliveries/completed')
  @Roles(Role.Rider)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getCompletedDeliveries(@Req() req: RequestWithUser) {
    const riderId = req.user.id; // Get the authenticated rider's ID
    const completedDeliveries = await this.riderTrackingService.getCompletedDeliveries(riderId);

    if (completedDeliveries.length === 0) {
      return {
        success: false,
        message: 'No completed deliveries found.',
      };
    }

    return {
      success: true,
      message: 'Completed deliveries retrieved successfully.',
      data: completedDeliveries,
    };
  }






  // this endpoint will return a list of comfirm orders/deliveries for a specific customer. 
  @Get('deliveries')
  @Roles(Role.Client)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getUserDeliveries(@Req() req: RequestWithUser) {
    const userId = req.user?.id;

    if (!userId) {
      throw new Error("User ID is missing from the token");
    }

    console.log("Fetching deliveries for user with ID:", userId);

    try {
      const userObjectId = new ObjectId(userId);

      // Fetch deliveries for the user using the extracted userId (now as ObjectId)
      const deliveries = await this.riderTrackingService.getUserDeliveries(userObjectId);

      if (deliveries.length === 0) {
        console.log("No deliveries found for user");
      }

      return deliveries;
    } catch (error) {
      console.error("Error fetching deliveries:", error);
      throw new Error("Failed to fetch deliveries");
    }
  }




}
