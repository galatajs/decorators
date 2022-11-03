import { ErrorResult, SuccessResult } from "@galatajs/core";
import request from "supertest";
import { server, app } from "./app";

describe("Http Decorator Testing", () => {
  beforeAll((done) => {
    app.start().then(() => {
      done();
    });
  });

  it('should return "getAll" from GET /test/all', async () => {
    const res = await request(server.instance).get("/test/all").expect(400);
    expect(res.body).toEqual(new ErrorResult("myRouterMiddleware"));
  });

  it('should return "getAll" from GET /tes2/all', async () => {
    const res = await request(server.instance).get("/tes2/all").expect(200);
    expect(res.body).toEqual(new SuccessResult("getAll"));
  });

  it('should return "all2" from GET /tes2/all2', async () => {
    const res = await request(server.instance).get("/tes2/all2").expect(400);
    expect(res.body).toEqual(new ErrorResult("myMiddleware"));
  });

  it('should return "put" from PUT /tes2/put', async () => {
    const res = await request(server.instance).put("/tes2/put").expect(200);
    expect(res.body).toEqual(new SuccessResult("put"));
  });

  it('should return "post" from POST /tes2/post', async () => {
    const res = await request(server.instance).post("/tes2/post").expect(200);
    expect(res.body).toEqual(new SuccessResult("post"));
  });

  it('should return "delete" from DELETE /tes2/delete', async () => {
    const res = await request(server.instance)
      .delete("/tes2/delete")
      .expect(200);
    expect(res.body).toEqual(new SuccessResult("delete"));
  });

  it('should return "all" from GET /tes2/all', async () => {
    const res = await request(server.instance)
      .get("/tes2/all-methods")
      .expect(200);
    expect(res.body).toEqual(new SuccessResult("all"));
    const res2 = await request(server.instance)
      .post("/tes2/all-methods")
      .expect(200);
    expect(res2.body).toEqual(new SuccessResult("all"));
    const res3 = await request(server.instance)
      .put("/tes2/all-methods")
      .expect(200);
    expect(res3.body).toEqual(new SuccessResult("all"));

    const res4 = await request(server.instance)
      .delete("/tes2/all-methods")
      .expect(200);
    expect(res4.body).toEqual(new SuccessResult("all"));
  });
});
