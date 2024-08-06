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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'power01',
      database: 'jaerock',
      entities: [BoardEntity, UserEntity], //전체
      synchronize: true,
    }),
    BoardModule,
    UserModule,
  ],
  controllers: [AppController, UserController, BoardController],
  providers: [AppService, UserService, BoardService],
  exports: [TypeOrmModule],
})
export class AppModule {}
