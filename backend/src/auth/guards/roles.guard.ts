import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 메타데이터에서 필요한 역할 가져오기
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log('RolesGuard - Required roles:', requiredRoles); // 메타데이터에서 가져온 역할 확인

    if (!requiredRoles) {
      // role이 필요없는 경우 접근 허용
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      // 인증되지 않은 사용자의 경우
      return false;
    }

    console.log('rolesGuard user info checking log : ' + user); // user 객체가 제대로 전달되는지 확인

    // 사용자 역할이 메타데이터의 requiredRoles와 일치하는지 확인
    const hasRole = requiredRoles.some((role) => user.role?.includes(role));

    // 역할이 일치하면 접근 허용, 아니면 접근 거부
    return hasRole;
  }
}
