import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
//
import {UserORM} from "./store/mysql/user.orm";
import {AuthType, Profile, User} from "./model";
import {AuthenticationORM} from "./store/mysql/authentication.orm";
import {ProfileORM} from "./store/mysql/profile.orm";
import {AppException} from "../exception/AppException";
import {compare, encrypt} from "../crypt/PasswordCrypto";

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(UserORM)
      private userRepository: Repository<UserORM>,
      @InjectRepository(AuthenticationORM)
      private authenticationRepository: Repository<AuthenticationORM>,
      @InjectRepository(ProfileORM)
      private profileRepository: Repository<ProfileORM>,
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
      await entityManager.insert(ProfileORM, {userId: id, displayName: name, photoUri: ''});
    })
    return {id, name};
  }

  async exists(userId: string): Promise<boolean> {
    return this.userRepository.exist({where: {id: userId}})
  }

  async signIn(
      id: string,
      password: string
  ): Promise<User & Pick<Profile, 'displayName'>> {
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
    const profile = await this.profileRepository.findOne({where: {userId: id}});
    return {...user, displayName: profile ? profile.displayName : user.name}
  }

  getHello(): string {
    return 'Hello World!';
  }
}
