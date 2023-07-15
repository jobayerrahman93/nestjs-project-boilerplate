import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { validate } from 'env.validation';
import { AppRoutingModule } from './app-routing.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { App_Config } from './config/app.config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CustomGlobalErrorExceptionFilter } from './utils/exception/custom.error.exception';
import { AsyncErrorMiddleware } from './utils/middleware/async-error.middleware';
@Module({
  imports: [
    UserModule,
    CommonModule,
    AppRoutingModule,
    ConfigModule.forRoot({
      load: [App_Config],
      validate: validate,
      isGlobal: true,
      cache: true,
    }),
    PrismaModule.forRoot(), // Register PrismaModule globally
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: CustomGlobalErrorExceptionFilter },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AsyncErrorMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
