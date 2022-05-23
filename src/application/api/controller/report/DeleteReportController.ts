import { deleteReportValidator } from "application/api/validator/report/deleteReportValidator";
import { TYPES } from "application/config/ioc/types";
import { Report } from "domain/entity/Report";
import { IReportRepository } from "domain/repository/ReportRepository";
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
@controller("/reports")
export class DeleteReportController extends BaseHttpController {
    @inject(TYPES.ReportRepository) private readonly reportRepository: IReportRepository;

    @httpDelete("/:id", TYPES.AuthorizationMiddleware, ...deleteReportValidator)
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const report: Report | null = await this.reportRepository.findOneById(request.params.id);
        if (report === null) {
            return response.status(404).send({ error: `Report with id ${request.params.id} not found` });
        }

        await this.reportRepository.remove(report);

        return response.status(204).send();
    }
}
