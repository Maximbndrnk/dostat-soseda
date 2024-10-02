import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import * as console from 'console';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class GetNeighborGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor() {}

  onModuleInit(): any {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any): void {
    console.log('bb', body);
    this.server.emit('onMessage', {
      msg: 'On msg',
      content: body,
    });
  }
}
