import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserAuthGuard } from 'src/guard/user.auth.guard';
import { UserService } from '../service/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get profile
  @Get('profile')
  @UseGuards(UserAuthGuard)
  async getProfile(@Req() req: Request) {
    const data = await this.userService.getProfile(req);
    return data;
  }
}
