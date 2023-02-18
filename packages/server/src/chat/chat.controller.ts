import {Body, Controller, Get, Post, Put} from '@nestjs/common';
import { ChatService } from './chat.service';
import {ChatMessage, ChatRoom} from "./model";
import {ChatOffset} from "./model/ChatOffset";

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('open')
  async open(
      @Body('room') room: Pick<ChatRoom, 'type' | 'title' | 'participantIds'>,
      @Body('message') message: Pick<ChatMessage, 'message' | 'type' | 'senderId'>
  ): Promise<string> {
    return this.chatService.open(room, message);
  }

  @Post('send')
  async send(
      @Body() message: Pick<ChatMessage, 'message' | 'type' | 'senderId' | 'chatRoomId'>
  ): Promise<string> {
    return this.chatService.send(message);
  }

  @Get('offset')
  async getOffsets(@Body('userId') userId: string): Promise<ChatOffset[]> {
    return [];
  }

  @Put(['offset', ':chatRoomId'])
  async read(@Body('userId') userId: string) {

  }


}
