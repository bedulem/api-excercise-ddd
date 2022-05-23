import { PARAMETERS } from "application/config/ioc/parameters";
import { TYPES } from "application/config/ioc/types";
import { provideSingleton } from "infrastructure/inversify/CustomProviders";
import { inject } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";
import { AppException } from "application/exception/AppException";
import { AuthenticationException } from "../AuthenticationException/authenticationException";

@provideSingleton(TYPES.AuthorizationMiddleware)
export class AuthorizationMiddleware extends BaseMiddleware {
    @inject(PARAMETERS.token) private readonly token: string;

    public handler(request: Request, response: Response, next: NextFunction): void {
        if (!request.headers.authorization || request.headers.authorization != this.token) {
            next(new AuthenticationException());
        }

        next();
    }
}
