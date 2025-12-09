import request from "supertest";
import app from "../src/app";
import prisma from "../src/utils/prisma";
import * as moderatorAgent from "../src/agent/moderator/moderator.agent";

const TEST_WALLET = "0x9999999999999999999999999999999999999999";

describe("Case API", () => {
  let userId: number;

  beforeAll(async () => {
    // Create user
    const user = await prisma.user.create({
      data: {
        wallet_address: TEST_WALLET,
        name: "Test User"
      }
    });
    userId = user.id;
  });

  afterAll(async () => {
    await prisma.case.deleteMany({ where: { created_by_id: userId } });
    await prisma.user.deleteMany({ where: { id: userId } });
    await prisma.$disconnect();
  });

  it("should create a case if moderation passes", async () => {
    jest.spyOn(moderatorAgent, "moderateContent").mockResolvedValue({ isSafe: true });

    const res = await request(app)
      .post("/case/create")
      .send({
        title: "Is it okay to steal bread to feed a family?",
        context: "A poor man steals bread to feed his starving children.",
        creator_wallet: TEST_WALLET
      });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe("active");
    expect(res.body.title).toContain("steal bread");
  });

  it("should reject a case if moderation fails", async () => {
    jest.spyOn(moderatorAgent, "moderateContent").mockResolvedValue({ isSafe: false, reason: "Hate speech" });

    const res = await request(app)
      .post("/case/create")
      .send({
        title: "Some terrible hate speech title",
        context: "More terrible content that is definitely long enough to pass validation rules. Hate speech hate speech.",
        creator_wallet: TEST_WALLET
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain("rejected");
    expect(res.body.reason).toBe("Hate speech");
  });
});
