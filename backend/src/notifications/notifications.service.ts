import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JWT } from 'google-auth-library';
import * as path from 'path';
import axios from 'axios';
import { UserService } from '@src/user/user.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly userService: UserService) {} // Inject UserService

  private async getAccessToken(): Promise<string> {
    const keyFilePath = path.join(
      'E:',
      'smr3',
      'delivajoy',
      'backend',
      'fcmtestapp-a7b4f-firebase-adminsdk-ja716-7aa4879d5a.json'
    );

    const client = new JWT({
      email: 'firebase-adminsdk-ja716@fcmtestapp-a7b4f.iam.gserviceaccount.com',
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    try {
      const tokens = await client.authorize();
      return tokens.access_token;
    } catch (error) {
      console.error('Error obtaining access token:', error);
      throw new InternalServerErrorException('Error obtaining access token');
    }
  }

  // Fetch the user's FCM token from the database
  private async getUserToken(userId: string): Promise<string> {
    try {
      const user = await this.userService.findById(userId); // Corrected method name
      if (!user || !user.FCMToken) {
        throw new InternalServerErrorException('FCM token not found for user');
      }
      return user.FCMToken;
    } catch (error) {
      console.error('Error fetching user token:', error);
      throw new InternalServerErrorException('Error fetching FCM token');
    }
  }

  // Save FCM token in the database
  async saveToken(userId: string, token: string): Promise<void> {
    // Implement token saving logic in the database if needed
  }



  async sendNotificationToUser(userId: string): Promise<string> {
    const accessToken = await this.getAccessToken();

    // Fetch the user's token from the database based on the userId
    const token = await this.getUserToken(userId);  // Implement getUserToken method

    if (!token) {
      throw new InternalServerErrorException('FCM token not found');
    }

    const message = {
      message: {
        token,
        notification: {
          title: 'Driver has arrived!',
          body: 'Hello Zeeeshan Your driver is now waiting for you.',
        },
        android: {
          priority: 'high',
          notification: {
            channelId: 'driver-notifications',
          },
        },
      },
    };

    try {
      const response = await axios.post(
        `https://fcm.googleapis.com/v1/projects/fcmtestapp-a7b4f/messages:send`,
        message,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Successfully sent message:', response.data);
      return 'Notification sent successfully';
    } catch (error) {
      console.error('Error sending notification:', error.response?.data || error.message);
      throw new InternalServerErrorException('Error sending notification');
    }
  }




}

