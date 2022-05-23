import { param, query } from "express-validator";
import { optional } from "inversify";
import { validatorResponseMiddleware } from "../utils";

export const getReportsValidator = [
    query("userId").optional().isUUID(4),
    query("dateFrom").optional().isNumeric(),
    query("dateTo").optional().isNumeric(),
    validatorResponseMiddleware,
];
