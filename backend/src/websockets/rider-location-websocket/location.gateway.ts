import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io'; 
  import { RiderTrackingService } from '../../rider-tracking/rider-tracking.service'; 
  import { forwardRef, Inject, Injectable } from '@nestjs/common';

@WebSocketGateway({ cors: true })
@Injectable()
export class LocationGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => RiderTrackingService)) 
    private readonly riderTrackingService: RiderTrackingService,
  ) {}

  @SubscribeMessage('updateLocation')
  async handleLocationUpdate(client: Socket, payload: { riderId: string; latitude: number; longitude: number }) {
    console.log('Received location update:', payload);
    await this.riderTrackingService.updateRiderLocation(payload.riderId, [payload.latitude, payload.longitude]);
    this.sendLocationResponse(client, payload);
  }

  sendLocationResponse(client: Socket, locationData: { riderId: string; latitude: number; longitude: number }) {
    const responseMessage = {
      message: 'Location update received',
      data: locationData,
    };
    client.emit('locationUpdateResponse', responseMessage);
  }

  // Order status update method
  emitOrderStatusUpdate(orderId: string, status: string) {
    const updateMessage = {
      orderId,
      status,
    };
    this.server.emit('orderStatusUpdate', updateMessage); // Emit to all connected clients
  }

  @SubscribeMessage('riderDelivered')
  async handleDeliveredEvent(client: Socket, payload: { riderId: string; status: string }) {
    console.log(`Rider ${payload.riderId} marked as delivered.`);
    await this.riderTrackingService.deliveredStatus(payload.riderId);
    client.emit('deliveryConfirmation', { message: 'Delivery marked as complete' });
  }
}
