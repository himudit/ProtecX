import request from "supertest";
import app from "../app";

describe("GET /", () => {
    it("should return status 200", async () => {
        const res = await request(app).get("/");

        expect(res.status).toBe(200);
    });
});  