import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuthController } from './controller/user.auth.controller';
import { UserAuthService } from './service/user.auth.service';

@Module({
  imports: [],
  controllers: [UserAuthController],
  providers: [UserAuthService, JwtService],
})
export class UserModule {}
