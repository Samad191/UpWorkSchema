import { Request, Response } from 'express';
import { ChatService } from './chat.service';
import { Controller, Get, Post, Req, Res, Delete, Put } from '@nestjs/common';

@Controller('chat')
export class ChatController {
  constructor(private readonly ChatService: ChatService) {}

  @Post('')
  async addChat(@Req() req: Request, @Res() res: Response) {
    console.log('Working');
    try {
      console.log('In COntroller try 1');
      const result = await this.ChatService.addChat(req);
      console.log('In COntroller try 2');
      res.status(200).send({
        statusCode: 200,
        result: result,
      });
    } catch (err) {
      console.log('error', err);
      res.status(400).send({ responseCode: 400, result: err });
    }
  }

  @Get('/getChat')
  async getChat(@Req() req: Request, @Res() res: Response) {
    console.log('Working');
    try {
      const result = await this.ChatService.getChat();
      console.log('In controller', result);
      res.status(200).send({
        statusCode: 200,
        result: result,
      });
    } catch (err) {
      console.log('In catch', err);
      res.status(400).send({ responseCode: 400, result: err });
    }
  }
}
