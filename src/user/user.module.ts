import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from 'src/config/app.config.service';
import { UserAuthController } from './controller/user.auth.controller';
import { UserController } from './controller/user.controller';
import { UserAuthService } from './service/user.auth.service';
import { UserService } from './service/user.service';

@Module({
  imports: [],
  controllers: [UserAuthController, UserController],
  providers: [UserAuthService, JwtService, AppConfigService, UserService],
})
export class UserModule {}
