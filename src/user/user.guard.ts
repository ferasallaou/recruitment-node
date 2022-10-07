import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken'
@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const authorization = request.headers.authorization
        if (!authorization) return false

        try {
            jwt.verify(authorization, process.env.SECRET ?? '')
            return true
        } catch (e) {
            throw new UnauthorizedException('Invalid Token!')
        }
    }
}