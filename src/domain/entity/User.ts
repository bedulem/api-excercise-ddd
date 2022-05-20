/**
 * @swagger
 * components:
 *   schemas:
 *     Example:
 *       type: object
 *       required:
 *         - id
 *         - value
 *       properties:
 *         id:
 *           type: string
 *           description: The id of example
 *         name:
 *           type: string
 *           description: Value of example
 *       example:
 *         id: "12345"
 *         name: "Mr. Robot"
 *
 */
export interface User {
    id: string;
    email: string;
    name: string;
    age: number;
    country: string;
    createdAT: number;
    updatedAT: number;
}
