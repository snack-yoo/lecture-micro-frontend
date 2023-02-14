import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserORM, AuthenticationORM} from "./store/orm";

@Module({
  imports: [TypeOrmModule.forFeature([UserORM, AuthenticationORM])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
