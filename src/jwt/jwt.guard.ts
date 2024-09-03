import {
  CanActivate,
  ExecutionContext,
  Injectable, Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  private readonly logger = new Logger(JwtGuard.name);
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization;
    if (!accessToken) {
      this.logger.error('토큰이 없음');
      throw new UnauthorizedException('Token이 없습니다.');
    }
    const splitToken = request.headers.authorization.split(' ');
    const secretA = process.env.ACCESS;
    /**Acess Token 검토**/
    try {
      const payload = await this.jwtService.verifyAsync(splitToken[1], {
        secret: secretA,
      });
      request['user'] = payload;
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        this.logger.error('토큰이 만료됨');
        throw new UnauthorizedException('Token 만료');
      }
      if (e.name === 'JsonWebTokenError') {
        this.logger.error('토큰이 아님');
        throw new UnauthorizedException('Token이 아닙니다');
      }
    }
    return true;
  }
}
