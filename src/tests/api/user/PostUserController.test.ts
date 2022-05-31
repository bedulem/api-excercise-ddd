import { bootstrapApplication } from "application/config/bootstrap";
import { TYPES } from "application/config/ioc/types";
import e from "express";
import { Server } from "http";
import { ConnectionManager } from "infrastructure/mongodb/ConnectionManager";
import { collectionName } from "infrastructure/repository/UserRepository";
import { Container } from "inversify";
import supertest from "supertest";
import { examplesUser, tokenTest } from "tests/Helpers";


describe("Post User", () => {
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
        const response = await request.post("/users").send(
    {
        email: "arya@winterfell.com", 
        name: "arya stark", 
        age: 16, 
        country: "AR",
        
    }).set({authorization: tokenTest})

        expect(response.status).toBe(201);
        expect(response.body.name).toStrictEqual("arya stark");
        expect(response.body.age).toStrictEqual(16);
        expect(response.body.country).toStrictEqual("AR");

    });

    it("Unauthorized Fail", async () => {
        const response = await request.post("/users").send({
        email: "arya@winterfell.com", 
        name: "arya stark", 
        age: 16, 
        country: "AR", 
    }).set({authorization: ""})

        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Invalid Token");
    });
});
