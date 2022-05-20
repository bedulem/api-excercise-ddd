import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, request, response } from "inversify-express-utils";
import { Request, Response } from "express";
import { TYPES } from "application/config/ioc/types";
import { ICreateReportDto, ICreateReportService } from "domain/service/report/CreateReportService";
import { Report } from "domain/entity/Report";

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
@controller("/reports")
export class PostReportController extends BaseHttpController {
    @inject(TYPES.CreateReportService) private readonly createReportService: ICreateReportService;

    @httpPost("/" /*, TYPES.AuthorizationMiddleware, ...postReportValidator*/)
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const report: Report = await this.createReportService.create(request.body as ICreateReportDto);

        return response.status(201).send(report);
    }
}
