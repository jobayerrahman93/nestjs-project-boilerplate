import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/config/app.config.service';
import { PrismaService } from 'src/prisma/prisma.service';
import Lib from 'src/utils/lib/lib';
@Injectable()
export class CommonService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appConfigService: AppConfigService,
  ) {}

  // send otp to email
  public async sendOtpToEmailService(obj: {
    email: string;
    type: string;
    otpFor: string;
  }) {
    return await this.prisma.$transaction(async (trx) => {
      const checkOtp: [] = await trx.$queryRaw`
                SELECT otp_hashed,otp_tried,otp_id
                FROM email_otp
                WHERE otp_email = ${obj.email}
                    AND otp_type = ${obj.type}
                    AND ADDTIME(otp_create_time, '0:3:0') > NOW()`;

      if (checkOtp.length > 0) {
        return {
          success: false,
          message: 'Cannot send another OTP within 3 minutes',
        };
      }

      const otp = Lib.otpGenNumber(6);
      const hashed_otp = await Lib.hashPass(otp);

      const otpCreds = {
        otp_hashed: hashed_otp,
        otp_email: obj.email,
        otp_type: obj.type,
      };
      const sended = await Lib.sendEmail(
        obj.email,
        `Your One Time Password For ZERO4SPORTS ${obj.otpFor}`,
        Lib.generateHtmlOtpPage(otp, obj.otpFor),
      );
      console.log({ sended });

      await trx.email_otp.create({
        data: {
          ...otpCreds,
        },
      });

      if (sended) {
        return { success: true, message: 'OTP sent successfully' };
      } else {
        return { success: false, message: 'Cannot send OTP' };
      }
    });
  }

  public async matchEmailOtpService(obj: {
    email: string;
    otp: string;
    type: string;
  }) {
    const table = 'email_otp';

    const checkOtp = await this.prisma.email_otp.findMany({
      select: {
        otp_hashed: true,
        otp_tried: true,
        otp_id: true,
      },
      where: {
        otp_email: obj.email,
        otp_type: obj.type,
        otp_matched: 0,
        otp_create_time: {
          gt: new Date(new Date().getTime() - 3 * 60000),
        },
      },
    });

    if (!checkOtp.length) {
      return {
        success: false,
        message: 'OTP expired',
      };
    }

    const { otp_id, otp_hashed, otp_tried } = checkOtp[0];

    if (otp_tried > 3) {
      return {
        success: false,
        message: 'You tried more then 3 time for this otp verification!',
      };
    }

    const otpValidation = await Lib.compare(obj.otp, otp_hashed);

    if (otpValidation) {
      const otpUpdt = {
        otp_tried: otp_tried + 1,
        otp_matched: 1,
      };

      const where = {
        otp_id: otp_id,
      };

      await this.prisma[table].update({
        data: otpUpdt,
        where,
      });

      let secret = this.appConfigService.secretUser;

      switch (obj.type) {
        case 'forget_user':
          secret = this.appConfigService.secretUser;
          break;
        case 'forget_admin':
          secret = this.appConfigService.secretUser;
          break;

        default:
          break;
      }

      const token = Lib.createToken(
        {
          email: obj.email,
          type: obj.type,
        },
        secret,
        '5m',
      );

      return {
        success: true,
        message: 'OTP matched successfully!',
        token,
      };
    } else {
      const otpUpdt = {
        otp_tried: otp_tried + 1,
      };

      const where = {
        otp_id: otp_id,
      };

      await this.prisma[table].update({
        data: otpUpdt,
        where,
      });

      return {
        success: false,
        message: 'Invalid OTP',
      };
    }
  }

  // check user by unique key
  public async checkUserByUniqueKey(obj: {
    table: string;
    field: string;
    value: string;
  }) {
    const checkUser = await this.prisma[obj.table].findFirst({
      where: {
        [obj.field]: obj.value,
      },
    });

    if (checkUser) {
      return true;
    } else {
      return false;
    }
  }
}
