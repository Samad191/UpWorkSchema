import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Chat } from './chat.model';

import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private readonly chatModel: Model<Chat>) {}

  addChat = async (req) => {
    console.log('Working', req);
    try {
      console.log('In service try 1');
      // console
      const result = await this.chatModel.create(req);

      return result;
    } catch (err) {
      throw err.message;
    }
  };

  getChat = async () => {
    try {
      const result = await this.chatModel.find();
      // console.log('Result', result);
      return result;
    } catch (err) {
      console.log('In catch', err);
      throw err.message;
    }
  };
}
