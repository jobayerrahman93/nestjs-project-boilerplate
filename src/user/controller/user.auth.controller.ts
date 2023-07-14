import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileUploadInterceptor } from 'src/utils/upload/fileUploadInterceptor';
import { createUserDto } from '../dto';
import { UserAuthService } from '../service/user.auth.service';

@Controller('auth')
export class UserAuthController {
  constructor(private readonly UserAuthService: UserAuthService) {}

  // register
  @Post('register')
  @UseInterceptors(FileUploadInterceptor('user_files'))
  async registerMember(
    @Body() createUserDto: createUserDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.UserAuthService.registerMember(
      createUserDto,
      files,
    );
    data.success ? res.status(201) : res.status(409);
    return data;
  }
}
