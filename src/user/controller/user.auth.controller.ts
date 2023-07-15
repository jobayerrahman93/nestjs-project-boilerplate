import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { AppConfigService } from 'src/config/app.config.service';
import Lib from 'src/utils/lib/lib';
import { FileUploadInterceptor } from 'src/utils/upload/fileUploadInterceptor';
import { LoginDto, createUserDto } from '../dto';
import { UserAuthService } from '../service/user.auth.service';

@Controller('auth')
export class UserAuthController {
  constructor(
    private readonly UserAuthService: UserAuthService,
    private readonly appConfigService: AppConfigService,
  ) {}

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

  // login
  @Post('login')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async loginMember(@Body() LoginDto: LoginDto) {
    return await this.UserAuthService.loginMember(LoginDto);
  }

  // forget password
  @Post('forget/password')
  async forgetPassword(
    @Body() body: { token: string; email: string; password: string },
    @Res() res: Response,
  ) {
    const { token, email, password } = body;

    const tokenVerify: any = Lib.verifyToken(
      token,
      this.appConfigService.secretUser,
    );

    if (tokenVerify) {
      const { email: verifyEmail, type } = tokenVerify;
      if (email === verifyEmail && type === 'forget_user') {
        const data = await this.UserAuthService.forgetPassword({
          password,
          passField: 'password',
          table: 'user',
          userEmailField: 'email',
          userEmail: email,
        });
        if (data.success) {
          res.status(200).json(data);
        } else {
          res.status(400).json(data);
        }
      } else {
        res.status(400).json({
          success: false,
          message:
            'Unauthorized token, It doesenot match with your email or type',
        });
      }
    } else {
      res
        .status(400)
        .json({ success: false, message: 'Invalid token or token expired' });
    }
  }
}
