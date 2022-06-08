import { app } from "@shared/infra/http/app";
import { hash } from "bcryptjs";
import request from "supertest";

import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid"
import createConnection from "@shared/infra/typeorm"

describe("List Category Controller", () => {
    jest.setTimeout(10000);
    let connection: Connection;

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXX')
            `
        );
    })

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to list all categories", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({
            email: "admin@admin.com.br",
            password: "admin",
        });

        const { refresh_token } = responseToken.body;

        await request(app)
        .post('/categories')
        .send({
            name: 'Category Supertest',
            description: 'Category Supertest',
        })
        .set({
            Authorization: `Bearer ${refresh_token}`,
        });

        const response = await request(app).get("/categories");

        expect(response.status).toBe(200);
    });

});