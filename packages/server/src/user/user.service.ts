import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
//
import {UserORM, AuthenticationORM} from "./store/orm";
import {AuthType, User} from "./model";
import {AppException} from "../shared/exception/AppException";
import {compare, encrypt} from "../shared/crypt/PasswordCrypto";

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(UserORM)
      private userRepository: Repository<UserORM>,
      @InjectRepository(AuthenticationORM)
      private authenticationRepository: Repository<AuthenticationORM>,
      private dataSource: DataSource
  ) {}

  async signUp(
      id: string,
      name: string,
      password: string
  ): Promise<User> {
    if (await this.exists(id)) {
      throw new AppException("IDDuplicated");
    }
    await this.dataSource.transaction(async entityManager => {
      await entityManager.insert(UserORM, {id, name});
      await entityManager.insert(AuthenticationORM, {userId: id, secret: await encrypt(password), type: AuthType.password});
    })
    return {id, name};
  }

  async exists(userId: string): Promise<boolean> {
    return this.userRepository.exist({where: {id: userId}})
  }

  async signIn(
      id: string,
      password: string
  ): Promise<User> {
    const auth = await this.authenticationRepository.findOne({where: {userId: id}});
    if (!auth) {
      throw new AppException("UserNotExists");
    }
    if (!await compare(password, auth.secret)) {
      throw new AppException("PasswordNotMatched");
    }

    const user = await this.userRepository.findOne({where: {id}});
    if (!user) {
      throw new AppException("UserNotExists");
    }
    return user;
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUser(userId: string): Promise<User> {
    return await this.userRepository.findOne({where: {id: userId}});
  }
}
