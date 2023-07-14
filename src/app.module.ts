import { Module } from '@nestjs/common';
import { AppRoutingModule } from './app-routing.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    AppRoutingModule,
    PrismaModule.forRoot(), // Register PrismaModule globally
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
