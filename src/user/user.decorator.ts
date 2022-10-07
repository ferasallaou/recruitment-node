import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        // TODO: Redundunt code, to be refactored with AuthGuard
        const authorization = request.headers.authorization
        const decoded = jwt.decode(authorization)
        return decoded
    },
);