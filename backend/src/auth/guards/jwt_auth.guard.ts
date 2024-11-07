import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('JwtAuthGuard activated'); // 디버그 로그
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      console.log('JwtAuthGuard error or user not found', err, info); // 에러 로그
      throw err || new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
    return user;
  }
}
