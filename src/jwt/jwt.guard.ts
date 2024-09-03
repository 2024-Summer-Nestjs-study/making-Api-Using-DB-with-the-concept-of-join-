import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization;
    if (!accessToken) {
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
        throw new UnauthorizedException('Token 만료');
      }
      if (e.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Token이 아닙니다');
      }
    }
    return true;
  }
}
