import { Module } from '@nestjs/common';
import { AppConfigService } from 'src/config/app.config.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonController } from './controller/common.controller';
import { CommonService } from './service/common.service';

@Module({
  imports: [PrismaModule],
  controllers: [CommonController],
  providers: [CommonService, AppConfigService],
})
export class CommonModule {}
