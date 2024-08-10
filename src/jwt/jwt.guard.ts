import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/**일단 여기는 깃허브에 있는거 복사한 것**/
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {
      console.log('헤더 빔');
      throw new UnauthorizedException();
    }
    const secretA = 'qwer';
    const secretR = 'asdf';
    /**먼저 Acess토큰에 대한 검토 시작**/
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: secretA,
      });
      request['user'] = payload;
    } catch (e) {
      /**에러가 검출되면 secret에 대한 검토 시작**/
      if (e.name === 'JsonWebTokenError') {
        console.log('응 access아니야');
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: secretR,
        });
        request['user'] = payload;
      } catch (e) {
        if (e.name === 'JsonWebTokenError') {
          throw new UnauthorizedException('Token이 맞아?');
        }
        console.log(e);
        throw new UnauthorizedException();
      }
    }
    return true;
  }
}
