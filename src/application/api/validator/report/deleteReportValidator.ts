import { param } from "express-validator";
import { validatorResponseMiddleware } from "../utils";

export const deleteReportValidator = [param("id").notEmpty().isUUID(4), validatorResponseMiddleware];
