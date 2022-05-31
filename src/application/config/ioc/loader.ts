// controllers
import "application/api/controller/GetHomeController";
import "application/api/controller/example/PostExampleController";
import "application/api/controller/example/DeleteExampleController";
import "application/api/controller/example/GetExampleController";
import "application/api/controller/example/GetExamplesController";
import "application/api/controller/example/PutExampleController";

// controllers

import "application/api/controller/user/PostUserController";
import "application/api/controller/user/DeleteUserController";
import "application/api/controller/user/GetUserController";
import "application/api/controller/user/GetUsersController";
import "application/api/controller/user/PutUserController";

import "application/api/controller/report/PutReportController";
import "application/api/controller/report/PostReportController";
import "application/api/controller/report/DeleteReportController";
import "application/api/controller/report/GetReportController";
import "application/api/controller/report/GetReportsController";
import "application/api/controller/report/PutReportController";

//middleware
import "application/api/security/middleware/authorizationMiddleware";

// services
import "domain/service/example/CreateExampleService";
import "domain/service/example/UpdateExampleService";

import "domain/service/user/CreateUserService";
import "domain/service/user/UpdateUserService";
import "domain/service/report/CreateReportService";
import "domain/service/report/UpdateReportService";
import "domain/service/report/PublishReportsService";

// infrastructure
import "infrastructure/mongodb/ConnectionManager";
import "infrastructure/uuid/UuidGenerator";
// repositories
import "infrastructure/repository/ExampleRepository";
import "infrastructure/repository/UserRepository";
import "infrastructure/repository/ReportRepository";

// commands
import "application/cli/commands/HelloCommand";
import "application/cli/commands/PublishReports";
