import {Injectable, NestMiddleware, UnauthorizedException} from "@nestjs/common";
import {NextFunction, Request, Response} from "express";
import {AuthService} from "../../auth/auth.service";

@Injectable()
export class ApiTokenCheckMiddleware implements NestMiddleware {

    constructor(
        private readonly authService: AuthService
    ) {
    }

    async use(req: Request, res: Response, next: NextFunction) {

        if (!req.headers['x-token']) {
            throw new UnauthorizedException('Debe iniciar una sesion para usar esta funcionalidad')
        }

        const token = req.headers['x-token']

        await this.authService.verifyJWT(token)

        next()
    }

}