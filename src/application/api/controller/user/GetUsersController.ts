import { TYPES } from "application/config/ioc/types";
import { User } from "domain/entity/User";
import { IUserRepository } from "domain/repository/UserRepository";
import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, request, response } from "inversify-express-utils";

/**
 * @swagger
 * /examples:
 *   get:
 *     summary: Get Examples
 *     tags: [Examples]
 *     parameters:
 *       - in: query
 *         name: value
 *         description: example value
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: offset
 *         description: offset records to return
 *         required: false
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         description: max records to return
 *         required: false
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: the list of the examples
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Example'
 */
const defaultOffset = 0;
const defaultLimit = 20;

@controller("/users")
export class GetUsersController extends BaseHttpController {
    @inject(TYPES.UserRepository) private readonly userRepository: IUserRepository;

    @httpGet("/")
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const users: User[] = await this.userRepository.findAllPaginated(
            Number(request.query.offset ?? defaultOffset),
            Number(request.query.limit ?? defaultLimit),
            Number(request.query.age),
            request.query.country?.toString()
        );

        return response.status(200).send(users);
    }
}
