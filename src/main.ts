import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { origin } from './utils/miscellaneous/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: origin,
    credentials: true,
  });

  console.log(process.env.APPSETTING_EMAIL_SEND_EMAIL_ID, 'email fm main');

  await app.listen(3000);
}
bootstrap();
