import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Mark the module as global
@Module({})
export class PrismaModule {
  static forRoot() {
    return {
      module: PrismaModule,
      providers: [PrismaService],
      exports: [PrismaService],
    };
  }
}
