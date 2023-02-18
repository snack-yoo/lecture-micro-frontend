import {Module} from '@nestjs/common';
import {ChatController} from './chat.controller';
import {ChatService} from './chat.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ChatMessageORM, ChatOffsetORM, ChatRoomORM} from "./store/orm";

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoomORM, ChatMessageORM, ChatOffsetORM])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
