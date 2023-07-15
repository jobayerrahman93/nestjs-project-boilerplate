/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// custom getter function
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get sendEmailId(): string {
    return this.configService.get('APPSETTING_EMAIL_SEND_EMAIL_ID');
  }
  get sendEmailPassword(): string {
    return this.configService.get('APPSETTING_EMAIL_SEND_PASSWORD');
  }
  get secretUser(): string {
    return this.configService.get('APPSETTING_JWT_SECRET_USER');
  }
  get secretAdmin(): string {
    return this.configService.get('APPSETTING_JWT_SECRET_ADMIN');
  }
}
