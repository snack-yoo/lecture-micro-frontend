import {Body, Controller, Get, Post} from '@nestjs/common';
import { UserService } from './user.service';
import {Profile, User} from "./model";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signup(@Body() signup: { id: string, name: string, password: string }): Promise<User> {
    const {id, name, password} = signup;
    return await this.userService.signUp(id, name, password);
  }

  @Post('sign-in')
  async signIn(@Body() signIn: {id: string, password: string }): Promise<User & Pick<Profile, 'displayName'>> {
    const { id, password } = signIn;
    return await this.userService.signIn(id, password);
  }
}
