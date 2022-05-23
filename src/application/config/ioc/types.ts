export const TYPES = {
    // infrastructure
    ConnectionManager: Symbol.for("ConnectionManager"),
    UuidGenerator: Symbol.for("UuidGenerator"),

    // repositories
    ExampleRepository: Symbol.for("ExampleRepository"),
    //repository
    UserRepository: Symbol.for("UserRepository"),
    ReportRepository: Symbol.for("ReportRepository"),

    // services
    CreateExampleService: Symbol.for("CreateExampleService"),
    UpdateExampleService: Symbol.for("UpdateExampleService"),
    PublishReportsService: Symbol.for("PublishReportsService"),

    //service
    CreateUserService: Symbol.for("CreateUserService"),
    UpdateUserService: Symbol.for("UpdateUserService"),
    CreateReportService: Symbol.for("CreateReportService"),
    UpdateReportService: Symbol.for("UpdateReportService"),

    //middleware
    AuthorizationMiddleware: Symbol.for("AuthorizationMiddleware"),

    Logger: Symbol.for("Logger"),
};
