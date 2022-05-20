import { TYPES } from "application/config/ioc/types";
import { Report } from "domain/entity/Report";
import { IReportRepository } from "domain/repository/ReportRepository";
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
@controller("/reports")
export class GetReportsController extends BaseHttpController {
    @inject(TYPES.ReportRepository) private readonly reportRepository: IReportRepository;

    @httpGet("/" /*, ...getReportsValidator*/)
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const report: Report[] = await this.reportRepository.findAllReports(
            request.query.userId?.toString(),
            Number(request.query.dateFrom),
            Number(request.query.dateTo)
        );

        return response.status(200).send(report);
    }
}
