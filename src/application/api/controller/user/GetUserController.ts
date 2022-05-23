import { getUserValidator } from "application/api/validator/user/getUserValidator";
import { TYPES } from "application/config/ioc/types";
import { User } from "domain/entity/User";
import { IUserRepository } from "domain/repository/UserRepository";
import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, request, response } from "inversify-express-utils";

/**
 * @swagger
 * /examples/{id}:
 *   get:
 *     summary: Get one Example
 *     tags: [Examples]
 *     parameters:
 *        - in: path
 *          name: id
 *          description: example id
 *          required: true
 *          schema:
 *            type: integer
 *     responses:
 *       200:
 *         description: the example
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Example'
 */
@controller("/users")
export class GetUserController extends BaseHttpController {
    @inject(TYPES.UserRepository) private readonly userRepository: IUserRepository;

    @httpGet("/:id", ...getUserValidator)
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const user: User | null = await this.userRepository.findOneById(request.params.id);
        if (user === null) {
            return response.status(404).send({ error: `User with id ${request.params.id} not found` });
        }

        return response.status(200).send(user);
    }
}
