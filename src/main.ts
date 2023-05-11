import { NestFactory } from '@nestjs/core';
import { AppModule } from './routes/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import * as tracing from '@sentry/tracing';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CustomExceptionFilter } from './exceptions/custom-exception.filter';
async function bootstrap() {
  const app: any = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('api');
  Sentry.init({
    dsn: process.env.SENTRY_DSN_LINK,
    environment: process.env.NODE_ENV,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new tracing.Integrations.Express({ app }),
    ],
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });

  const config = new DocumentBuilder()
    .setTitle('nestjs boiler-plate')
    .setDescription('Boilerplate for nestjs')
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
  Logger.log(`Server is Running ${await app.getUrl()}`);
}
bootstrap();
