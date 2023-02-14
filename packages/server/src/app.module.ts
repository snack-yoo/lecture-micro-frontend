import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
//
import { TypeOrmModule } from '@nestjs/typeorm';
//
import {LoggerMiddleware} from "./middleware";
import {UserModule} from "./user/user.module";
import {ChatModule} from "./chat/chat.module";
import {MeetupModule} from "./meetup/meetup.module";
import {UserORM} from "./user/store/mysql/user.orm";
import {AuthenticationORM} from "./user/store/mysql/authentication.orm";
import {ProfileORM} from "./user/store/mysql/profile.orm";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'mysql',
      entities: [UserORM, AuthenticationORM, ProfileORM],
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
