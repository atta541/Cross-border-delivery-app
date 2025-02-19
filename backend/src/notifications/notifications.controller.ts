// import { Controller, Post, Body, InternalServerErrorException } from '@nestjs/common';
// import { NotificationsService } from './notifications.service';

// @Controller('notifications')
// export class NotificationsController {
//   constructor(private readonly notificationsService: NotificationsService) {}

//   @Post('send')
//   async sendNotification(@Body('token') token: string) {
//     console.log('Received token:', token); // Log the received token
//     try {
//       const result = await this.notificationsService.sendNotification(token);
//       return { message: result };
//     } catch (error) {
//       throw new InternalServerErrorException('Failed to send notification');
//     }
//   }
  
// }



import { Controller, Post, Body, InternalServerErrorException } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('save-token')
  async saveToken(@Body('token') token: string, @Body('userId') userId: string) {
    try {
      // Save or update token in database for the specified user
      await this.notificationsService.saveToken(userId, token);
      return { message: 'Token saved successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to save token');
    }
  }

  @Post('send')
  async sendNotification(@Body('userId') userId: string) {
    try {
      const result = await this.notificationsService.sendNotificationToUser(userId);
      return { message: result };
    } catch (error) {
      throw new InternalServerErrorException('Failed to send notification');
    }
  }
}
