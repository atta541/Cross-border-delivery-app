// import {
//   WebSocketGateway,
//   WebSocketServer,
//   SubscribeMessage,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { MessagesService } from './messages.service';

// @WebSocketGateway()
// export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server;

//   constructor(private readonly messagesService: MessagesService) {}

//   handleConnection(client: Socket) {
//     console.log('Client connected message:', client.id);
//   }

//   handleDisconnect(client: Socket) {
//     console.log('Client disconnected:', client.id);
//   }

//   @SubscribeMessage('sendMessage')
//   async handleMessage(client: Socket, payload: { text: string; user: any }) {
//     const savedMessage = await this.messagesService.createMessage(payload);
//     this.server.emit('receiveMessage', savedMessage); // Broadcast the saved message
//   }
// }



import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';

@WebSocketGateway()
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: { text: string; user: any }) {
    const savedMessage = await this.messagesService.createMessage(payload);
    this.server.emit('receiveMessage', savedMessage); // Broadcast the saved message
  }

  @SubscribeMessage('typing')
  handleTyping(client: Socket, payload: { isTyping: boolean; user: string }) {
    this.server.emit('typing', payload); // Broadcast the typing status
  }
}
