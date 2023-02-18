import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
//
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
//
import {LoggerMiddleware} from "./shared/middleware";
import {UserModule} from "./user/user.module";
import {ChatModule} from "./chat/chat.module";
import {MeetupModule} from "./meetup/meetup.module";
import {UserORM, AuthenticationORM} from "./user/store/orm";
import {ChatMessageORM, ChatOffsetORM, ChatRoomORM} from "./chat/store/orm";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'mysql',
      entities: [UserORM, AuthenticationORM, ChatRoomORM, ChatMessageORM, ChatOffsetORM],
      synchronize: true,
    }),
      ...[UserModule, ChatModule, MeetupModule],
    EventEmitterModule.forRoot()
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggerMiddleware)
        .forRoutes('*');
  }
}
