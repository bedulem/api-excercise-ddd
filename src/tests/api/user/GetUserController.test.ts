import supertest from "supertest";
import { TYPES } from "application/config/ioc/types";
import { ConnectionManager } from "infrastructure/mongodb/ConnectionManager";
import { bootstrapApplication } from "application/config/bootstrap";
import e from "express";
import { Container } from "inversify";
import { Server } from "http";
import { collectionName } from "infrastructure/repository/UserRepository";
import { examplesUser } from "tests/Helpers";

describe("Get User", () => {
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
        const response = await request.get("/users/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d").send();

        expect(response.status).toBe(200);
        expect(response.body.id).toStrictEqual(examplesUser[0].id);
        expect(response.body.name).toStrictEqual(examplesUser[0].name);
        expect(response.body.email).toStrictEqual(examplesUser[0].email);
    });

    it("Fails because example does not exist", async () => {
        const response = await request.get("/users/aff04570-0458-46e7-8494-e33934fae371").send();

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("User with id aff04570-0458-46e7-8494-e33934fae371 not found");
    });
});
