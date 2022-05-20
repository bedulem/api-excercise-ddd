import { TYPES } from "application/config/ioc/types";
import { Report } from "domain/entity/Report";
import { IReportRepository } from "domain/repository/ReportRepository";
import { provideSingleton } from "infrastructure/inversify/CustomProviders";
import { IConnectionManager } from "infrastructure/mongodb/ConnectionManager";
import { MongoRepository } from "infrastructure/mongodb/MongoRepository";
import { inject } from "inversify";

const collectionName: string = "report";

@provideSingleton(TYPES.ReportRepository)
export class ReportRepository extends MongoRepository implements IReportRepository {
    constructor(@inject(TYPES.ConnectionManager) ConnectionManager: IConnectionManager) {
        super();

        this.collection = ConnectionManager.getCollection(collectionName);
    }

    public async findAllReports(userId?: string, dateFrom?: number, dateTo?: number): Promise<Report[]> {
        const filter: { [key: string]: unknown } = {};
        if (dateFrom && dateTo) {
            filter.createdAT = { $gte: dateFrom, $lte: dateTo };
        } else if (dateFrom) {
            filter.createdAT = { $gte: dateFrom };
        } else if (dateTo) {
            filter.createdAT = { $lte: dateTo };
        }
        if (userId) {
            filter.userId = userId;
        }

        return await this.findBy(filter, null, null, null);
    }

    public async findOneById(id: string): Promise<Report | null> {
        return await this.findOneBy<Report>({ id });
    }
}
