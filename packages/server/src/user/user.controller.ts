import {Body, Controller, Get, Post} from '@nestjs/common';
import { UserService } from './user.service';
import {User} from "./model";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Post()
  async signup(@Body() signup: { name: string, password: string }): Promise<User> {
    const {name, password} = signup;
    return await this.userService.signup(name, password);
  }
}
