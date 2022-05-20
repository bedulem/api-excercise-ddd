export const TYPES = {
    // infrastructure
    ConnectionManager: Symbol.for("ConnectionManager"),

    // repositories
    ExampleRepository: Symbol.for("ExampleRepository"),
    //repository
    UserRepository: Symbol.for("UserRepository"),
    ReportRepository: Symbol.for("ReportRepository"),

    // services
    CreateExampleService: Symbol.for("CreateExampleService"),
    UpdateExampleService: Symbol.for("UpdateExampleService"),
    //service
    CreateUserService: Symbol.for("CreateUserService"),
    UpdateUserService: Symbol.for("UpdateUserService"),
    CreateReportService: Symbol.for("CreateReportService"),
    UpdateReportService: Symbol.for("UpdateReportService"),

    Logger: Symbol.for("Logger"),
};
