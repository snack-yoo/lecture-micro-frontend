import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { UserService } from './user.service';
import {User} from "./model";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signup(@Body() signup: { id: string, name: string, password: string }): Promise<User> {
    const {id, name, password} = signup;
    return await this.userService.signUp(id, name, password);
  }

  @Post('sign-in')
  async signIn(@Body() signIn: {id: string, password: string }): Promise<User> {
    const { id, password } = signIn;
    return await this.userService.signIn(id, password);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return await this.userService.getUser(userId);
  }
}
