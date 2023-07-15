import { Controller, Post, Body, Res } from '@nestjs/common';
import { CommonService } from '../service/common.service';
import { Response } from 'express';
import { IsendEmail } from 'src/utils/types/bind.type';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Post('send-email-otp')
  async sendEmailOtp(
    @Body() requestBody: IsendEmail,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, type } = requestBody;

    let table = '';
    let field = '';
    let otpFor = '';

    switch (type) {
      case 'forget_admin':
        table = 'admin';
        field = 'email';
        otpFor = 'Admin Reset Password';
        break;
      case 'forget_user':
        table = 'user';
        field = 'email';
        otpFor = 'Reset User Password';

      default:
        break;
    }

    const obj = { email, type, otpFor };

    let data = {
      success: false,
      message: 'Something is wrong',
    };

    if (type.startsWith('forget')) {
      const checkUser = await this.commonService.checkUserByUniqueKey({
        table,
        field,
        value: email,
      });
      console.log({ checkUser });

      if (checkUser) {
        data = await this.commonService.sendOtpToEmailService(obj);
      } else {
        data = {
          success: false,
          message: 'No user found with this email.',
        };
      }
    }

    data.success ? res.status(200) : res.status(400);
    return data;
  }

  // match email otp
  @Post('match-email-otp')
  async matchEmailOtp(
    @Body() body: { email: string; otp: string; type: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, otp, type } = body;
    const data = await this.commonService.matchEmailOtpService({
      email,
      otp,
      type,
    });

    data.success ? res.status(202) : res.status(401);
    return data;
  }
}
