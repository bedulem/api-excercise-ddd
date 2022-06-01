import supertest from "supertest";
import { TYPES } from "application/config/ioc/types";
import { ConnectionManager } from "infrastructure/mongodb/ConnectionManager";
import { bootstrapApplication } from "application/config/bootstrap";
import e from "express";
import { Container } from "inversify";
import { Server } from "http";
import { collectionName } from "infrastructure/repository/UserRepository";
import { examplesUser } from "tests/Helpers";

describe("Get Users", () => {
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

    it("Success - find all", async () => {
        const response = await request.get("/users").send();

        expect(response.status).toBe(200);
        expect(response.body.length).toStrictEqual(examplesUser.length);
        expect(response.body[0].id).toStrictEqual(examplesUser[0].id);
        expect(response.body[0].name).toStrictEqual(examplesUser[0].name);
    });

    it("Success - find by age ", async () => {
        const response = await request.get("/users").query({ age: 49 }).send();

        expect(response.status).toBe(200);
        expect(response.body.length).toStrictEqual(1);
        expect(response.body[0].id).toStrictEqual(examplesUser[2].id);
        expect(response.body[0].name).toStrictEqual(examplesUser[2].name);
    });
});
