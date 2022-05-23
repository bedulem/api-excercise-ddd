import { param } from "express-validator";
import { validatorResponseMiddleware } from "../utils";

export const getUserValidator = [param("id").notEmpty().isUUID(4), validatorResponseMiddleware];
