import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserORM} from "./store/mysql/user.orm";
import {AuthenticationORM} from "./store/mysql/authentication.orm";

@Module({
  imports: [TypeOrmModule.forFeature([UserORM, AuthenticationORM])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
