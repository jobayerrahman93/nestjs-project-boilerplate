import {
  Controller,
  Get,
  Patch,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { UserAuthGuard } from 'src/guard/user.auth.guard';
import { FileUploadInterceptor } from 'src/utils/upload/fileUploadInterceptor';
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

  // update profile
  @Patch('profile/:id')
  @UseInterceptors(FileUploadInterceptor('user_files'))
  async updateProfile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req()
    req: Request,
  ) {
    const data = await this.userService.updateProfile(req, files);
    return data;
  }
}
