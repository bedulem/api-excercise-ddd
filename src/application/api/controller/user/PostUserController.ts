import { TYPES } from "application/config/ioc/types";
import { User } from "domain/entity/User";
import { IcreateUserDto, ICreateUserService } from "domain/service/user/CreateExampleService";
import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, request, response, TYPE } from "inversify-express-utils";

/**
 * @swagger
 * /examples:
 *   post:
 *     summary: Create a new example
 *     tags: [Examples]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateExampleDto'
 *     responses:
 *       201:
 *         description: The example was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Example'
 *       500:
 *         description: Some server error
 */
@controller("/users")
export class PostUserController extends BaseHttpController {
    @inject(TYPES.CreateUserService) private readonly createUserService: ICreateUserService;

    @httpPost("/" /*, TYPES.AuthorizationMiddleware, ...postUserValidator*/)
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const user: User = await this.createUserService.create(request.body as IcreateUserDto);

        return response.status(201).send(user);
    }
}
