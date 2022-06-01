import supertest from "supertest";
import { TYPES } from "application/config/ioc/types";
import { ConnectionManager } from "infrastructure/mongodb/ConnectionManager";
import { bootstrapApplication } from "application/config/bootstrap";
import e from "express";
import { Container } from "inversify";
import { Server } from "http";
import { collectionName } from "infrastructure/repository/UserRepository";
import { examplesUser, tokenTest } from "tests/Helpers";

describe("Delete User", () => {
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
            .delete("/users/1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed")
            .send()
            .set({ authorization: tokenTest });

        expect(response.status).toBe(204);
    });

    it("Fails because user does not exist", async () => {
        const response = await request
            .delete("/users/1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bee")
            .send()
            .set({ authorization: tokenTest });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("User with id 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bee not found");
    });
});
