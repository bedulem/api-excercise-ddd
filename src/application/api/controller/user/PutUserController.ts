import { putUserValidator } from "application/api/validator/user/putUserValidator";
import { TYPES } from "application/config/ioc/types";
import { User } from "domain/entity/User";
import { IUserRepository } from "domain/repository/UserRepository";
import { IUpdateUserDto, IUpdateUserService } from "domain/service/user/UpdateUserService";
import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpPut, request, response } from "inversify-express-utils";

/**
 * @swagger
 * /examples/{id}:
 *   put:
 *     summary: Update example by id
 *     tags: [Examples]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: example id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateExampleDto'
 *     responses:
 *       200:
 *         decsription: The example was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Example'
 *       404:
 *         description: example was not found.
 *       500:
 *         description: Some errors happend.
 *
 */
@controller("/users")
export class PutUserController extends BaseHttpController {
    @inject(TYPES.UserRepository) private readonly userRepository: IUserRepository;
    @inject(TYPES.UpdateUserService) private readonly updateUserService: IUpdateUserService;

    @httpPut("/:id", TYPES.AuthorizationMiddleware, ...putUserValidator)
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const user: User | null = await this.userRepository.findOneById(request.params.id);
        if (user === null) {
            return response.status(404).send({ error: `User with id ${request.params.id} not found` });
        }

        await this.updateUserService.update(user, request.body as IUpdateUserDto);

        return response.status(200).send(user);
    }
}
