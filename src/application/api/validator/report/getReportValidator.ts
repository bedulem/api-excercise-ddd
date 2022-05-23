import { param } from "express-validator";
import { validatorResponseMiddleware } from "../utils";

export const getReportValidator = [param("id").isUUID(4), validatorResponseMiddleware];
