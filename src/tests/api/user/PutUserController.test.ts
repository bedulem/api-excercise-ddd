import supertest from "supertest";
import { TYPES } from "application/config/ioc/types";
import { ConnectionManager } from "infrastructure/mongodb/ConnectionManager";
import { bootstrapApplication } from "application/config/bootstrap";
import e from "express";
import { Container } from "inversify";
import { Server } from "http";
import { collectionName } from "infrastructure/repository/UserRepository";
import { examplesUser, tokenTest } from "tests/Helpers";

describe("Put User", () => {
    let app: e.Application, container: Container;
    let request: supertest.SuperTest<supertest.Test>;
    let server: Server;

    beforeAll(async () => {
        const application = await bootstrapApplication();

        app = application.app;
        container = application.container;
        server = application.server;
        request = supertest(app);

        await container
            .get<ConnectionManager>(TYPES.ConnectionManager)
            .getCollection(collectionName)
            .insertMany(examplesUser);
    });

    afterAll(async () => {
        await container.get<ConnectionManager>(TYPES.ConnectionManager).getCollection(collectionName).drop();
        await container.get<ConnectionManager>(TYPES.ConnectionManager).close();
        server.close();
    });

    it("Success", async () => {
        const response = await request
            .put("/users/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d")
            .send({
                name: "new tyrion",
                age: 46,
                country: "AR",
            })
            .set({ authorization: tokenTest });

        expect(response.status).toBe(200);
        expect(response.body.id).toStrictEqual(examplesUser[0].id);
        expect(response.body.name).toStrictEqual("new tyrion");
    });

    it("Fails because example does not exist", async () => {
        const response = await request
            .put("/users/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3d0000")
            .send({
                name: "new tyrion",
                age: 46,
                country: "AR",
            })
            .set({ authorization: tokenTest });

        expect(response.status).toBe(404);
    });
});
