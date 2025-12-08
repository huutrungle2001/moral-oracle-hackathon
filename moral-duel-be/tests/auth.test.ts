import request from "supertest";
import app from "../src/app";
import prisma from "../src/utils/prisma";

// Mock wallet
const TEST_WALLET = "0x1234567890123456789012345678901234567890";

describe("Auth API", () => {
  beforeAll(async () => {
    // Cleanup before tests
    await prisma.user.deleteMany({ where: { wallet_address: TEST_WALLET } });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { wallet_address: TEST_WALLET } });
    await prisma.$disconnect();
  });

  it("should connect a wallet and create a user", async () => {
    const res = await request(app)
      .post("/auth/connect")
      .send({ wallet_address: TEST_WALLET });

    expect(res.status).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.wallet_address).toBe(TEST_WALLET);
    expect(res.body.user.name).toContain("User");
  });

  it("should fail with invalid wallet format", async () => {
    const res = await request(app)
      .post("/auth/connect")
      .send({ wallet_address: "invalid-wallet" });

    expect(res.status).toBe(400);
  });
});
