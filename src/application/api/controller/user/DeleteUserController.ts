import { TYPES } from "application/config/ioc/types";
import { User } from "domain/entity/User";
import { IUserRepository } from "domain/repository/UserRepository";
import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpDelete, request, response } from "inversify-express-utils";

/**
 * @swagger
 * /examples/{id}:
 *    delete:
 *      summary: Remove example
 *      tags: [Examples]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: example id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        204:
 *          description: The example was deleted
 *        404:
 *          description: The example was not found
 *
 */
@controller("/users")
export class DeleteUserController extends BaseHttpController {
    @inject(TYPES.UserRepository) private readonly userRepository: IUserRepository;

    @httpDelete("/:id" /*, TYPES.AuthorizationMiddleware, ...deleteUserValidator*/)
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const user: User | null = await this.userRepository.findOneById(request.params.id);
        if (user === null) {
            return response.status(404).send({ error: `User with id ${request.params.id} not found` });
        }

        await this.userRepository.remove(user);

        return response.status(204).send();
    }
}
