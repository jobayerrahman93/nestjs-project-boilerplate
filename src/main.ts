import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { origin } from './utils/miscellaneous/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: origin,
    credentials: true,
  });
  await app.listen(3000);

  // const prismaService = app.get(PrismaService);
  // await prismaService.enableShutdownHooks(app);
}
bootstrap();
