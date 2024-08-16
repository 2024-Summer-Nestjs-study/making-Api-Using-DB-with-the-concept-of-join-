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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '113.198.230.24',
      port: 382,
      username: 'jaerock',
      password: 'power01',
      database: 'board',
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
