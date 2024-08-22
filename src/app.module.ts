import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BoardEntity } from './entity/board.entity';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user/user.controller';
import { BoardController } from './board/board.controller';
import { UserService } from './user/user.service';
import { BoardService } from './board/board.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_IP,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      entities: [BoardEntity, UserEntity], //전체
      synchronize: true,
    }),
    BoardModule,
    UserModule,
    JwtModule,
  ],
  controllers: [AppController, UserController, BoardController],
  providers: [AppService, UserService, BoardService],
  exports: [TypeOrmModule, JwtModule],
})
export class AppModule {}
