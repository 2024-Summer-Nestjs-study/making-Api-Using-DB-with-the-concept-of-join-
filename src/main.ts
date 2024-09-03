import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('재록재록의 마무리 과제')
    .setDescription(
      '회원가입으로 회원정보 저장 후 게시판에 글 작성, 수정, 삭제 및 회원 정보를 이용하여 어떤 글을 썼는 지 확인 할 수 있는 서비스',
    )
    .setVersion('1.0.0')
    //JWT 토큰 설정
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
