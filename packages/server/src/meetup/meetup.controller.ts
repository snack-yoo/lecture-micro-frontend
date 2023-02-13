import { Controller, Get } from '@nestjs/common';
import { MeetupService } from './meetup.service';

@Controller('meetup')
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @Get()
  getHello(): string {
    return this.meetupService.getHello();
  }
}
