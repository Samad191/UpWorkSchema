// import {
//   SubscribeMessage,
//   WebSocketGateway,
//   OnGatewayInit,
//   WebSocketServer,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
// } from '@nestjs/websockets';

// import {
//   SubscribeMessage,
//   WebSocketGateway,
//   OnGatewayInit,
//   WebSocketServer,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
// } from '@nestjs/websockets';

import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
  WsResponse,
} from '@nestjs/websockets';

import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat/chat.service';
import { InjectModel } from '@nestjs/mongoose';
import { Socket } from 'dgram';
// import { Socket } from 'dgram';
// import { Socket, Socket } from 'dgram';
// import { Socket } from 'dgram';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: any) {
    this.logger.log('Initialized');
  }

  constructor(private readonly chatService: ChatService) {}
  // implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  // }

  onlineUsers = {};

  @SubscribeMessage('events')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    console.log('Data ---->', data);
    return data;
  }

  handleConnection(socket: Socket) {
    this.logger.log('New client connected');
    const id = socket.handshake.query.id;
    this.onlineUsers[id] = socket.id;
  }

  @SubscribeMessage('create')
  createRoom(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    client.join(data);
    console.log('Data ---->', data);
    return data;
  }

  @SubscribeMessage('click')
  handleClick(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log('Click', client.id);
    // this.chatService.addChat();
    let parsedData = JSON.parse(data);
    this.chatService.addChat(parsedData);
    console.log('Click Socket event ====>>', data);

    // Socket.emit('updateChat', data);

    client.server.emit('updateChat', parsedData);

    client.join();

    // client.to(this.onlineUsers[parsedData.id]).emit('updateChat', parsedData);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: String): WsResponse<string> {
    return { event: 'msgToClient', data: 'Hello WOrkld' }
  }

  handleDisconnect(socket: Socket) {
    console.log('Disconnected');
  }
}
