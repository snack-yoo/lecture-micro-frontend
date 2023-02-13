import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {randomUUID} from 'crypto';
//
import {UserORM} from "./store/mysql/user.orm";
import {AuthType, User} from "./model";
import {AuthenticationORM} from "./store/mysql/authentication.orm";

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(UserORM)
      private userRepository: Repository<UserORM>,
      @InjectRepository(AuthenticationORM)
      private authenticationRepository: Repository<AuthenticationORM>,
  ) {}

  async signup(
      name: string,
      password: string
  ): Promise<User> {
    const id = randomUUID();
    const a = await this.userRepository.insert({id, name});

    const b = await this.authenticationRepository.insert({userId: id, secret: password, type: AuthType.password})

    console.log('result: ', {a,b});
    return {id, name};
  }

  getHello(): string {
    return 'Hello World!';
  }
}
