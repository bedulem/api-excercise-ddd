import { putReportValidator } from "application/api/validator/report/putReportValidator";
import { TYPES } from "application/config/ioc/types";
import { Report } from "domain/entity/Report";
import { IReportRepository } from "domain/repository/ReportRepository";
import { IUpdateReportDto, IUpdateReportService } from "domain/service/report/UpdateReportService";
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
@controller("/reports")
export class PutReportsController extends BaseHttpController {
    @inject(TYPES.ReportRepository) private readonly reportRepository: IReportRepository;
    @inject(TYPES.UpdateReportService) private readonly updateReportService: IUpdateReportService;

    @httpPut("/:id", TYPES.AuthorizationMiddleware, ...putReportValidator)
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const report: Report | null = await this.reportRepository.findOneById(request.params.id);

        if (report === null) {
            return response.status(404).send({ error: `Report with id ${request.params.id} not found` });
        }

        await this.updateReportService.update(report, request.body as IUpdateReportDto);

        return response.status(200).send(report);
    }
}
