import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppRoutingModule } from './app-routing.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CustomGlobalErrorExceptionFilter } from './utils/exception/custom.error.exception';
import { AsyncErrorMiddleware } from './utils/middleware/async-error.middleware';

@Module({
  imports: [
    UserModule,
    AppRoutingModule,
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
