import { AppException } from "application/exception/AppException";

export class AuthenticationException extends AppException {
    constructor(message?: string) {
        super(message ?? "Invalid Token", 401);
    }
}
