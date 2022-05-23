import { getReportValidator } from "application/api/validator/report/getReportValidator";
import { TYPES } from "application/config/ioc/types";
import { Report } from "domain/entity/Report";
import { IReportRepository } from "domain/repository/ReportRepository";
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
@controller("/reports")
export class GetReportController extends BaseHttpController {
    @inject(TYPES.ReportRepository) private readonly reportRepository: IReportRepository;

    @httpGet("/:id", ...getReportValidator)
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const report: Report | null = await this.reportRepository.findOneById(request.params.id);
        if (report === null) {
            return response.status(404).send({ error: `Report with id ${request.params.id} not found` });
        }

        return response.status(200).send(report);
    }
}
