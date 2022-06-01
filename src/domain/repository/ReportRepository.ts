import { Report, ReportStatus } from "../entity/Report";

export interface IReportRepository {
    persist(report: Report): Promise<void>;
    findAllReports(userId?: string, dateFrom?: number, dateTo?: number, draftTo?: number): Promise<Report[]>;
    findOneById(id: string): Promise<Report | null>;
    remove(report: Report): Promise<void>;
}
