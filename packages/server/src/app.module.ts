import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
//
import { TypeOrmModule } from '@nestjs/typeorm';
//
import {LoggerMiddleware} from "./shared/middleware";
import {UserModule} from "./user/user.module";
import {ChatModule} from "./chat/chat.module";
import {MeetupModule} from "./meetup/meetup.module";
import {UserORM, AuthenticationORM} from "./user/store/orm";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'mysql',
      entities: [UserORM, AuthenticationORM],
      synchronize: true,
    }),
      ...[UserModule, ChatModule, MeetupModule]
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggerMiddleware)
        .forRoutes('*');
  }
}
