import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../server/app";

chai.use(chaiHttp);

describe("App", () => {
  it("App should raise error, when route not exist", (done) => {
    chai
      .request(server)
      .get("/route-not-exist")
      .end((err, res) => {
        expect(res.body).to.have.status(404);
        done();
      });
  });
});
