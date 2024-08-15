import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization;
    if (!accessToken) {
      console.log('헤더 빔');
      throw new UnauthorizedException();
    }
    const secretA = 'qwer';
    /**Acess Token 검토**/
    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: secretA,
      });
      request['user'] = payload;
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        throw new UnauthorizedException('access만료');
      }
      if (e.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Token이 맞아?');
      }
    }
    return true;
  }
}
