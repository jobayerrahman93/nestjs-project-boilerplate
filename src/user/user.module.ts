import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from 'src/config/app.config.service';
import { UserAuthController } from './controller/user.auth.controller';
import { UserAuthService } from './service/user.auth.service';

@Module({
  imports: [],
  controllers: [UserAuthController],
  providers: [UserAuthService, JwtService, AppConfigService],
})
export class UserModule {}
