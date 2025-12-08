-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT,
    "password" TEXT,
    "name" TEXT,
    "wallet_address" TEXT NOT NULL,
    "total_points" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Case" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "ai_verdict" TEXT,
    "ai_verdict_reasoning" TEXT,
    "ai_confidence" REAL,
    "verdict_hash" TEXT,
    "blockchain_tx_hash" TEXT,
    "smart_contract_id" TEXT,
    "reward_pool" REAL NOT NULL DEFAULT 0,
    "is_ai_generated" BOOLEAN NOT NULL DEFAULT false,
    "created_by_id" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closes_at" DATETIME,
    "closed_at" DATETIME,
    "yes_votes" INTEGER NOT NULL DEFAULT 0,
    "no_votes" INTEGER NOT NULL DEFAULT 0,
    "total_participants" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Case_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Argument" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "case_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "is_top_3" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Argument_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Argument_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ArgumentVote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "argument_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ArgumentVote_argument_id_fkey" FOREIGN KEY ("argument_id") REFERENCES "Argument" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserVote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "case_id" INTEGER NOT NULL,
    "side" TEXT NOT NULL,
    "voted_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "liked_arguments" TEXT,
    "has_submitted_arg" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "UserVote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserVote_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reward" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "case_id" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "blockchain_tx_hash" TEXT,
    "wallet_address" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "claimed_at" DATETIME,
    "completed_at" DATETIME,
    CONSTRAINT "Reward_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reward_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "Case" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "criteria" TEXT NOT NULL,
    "bonus_tokens" REAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "UserBadge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "badge_id" INTEGER NOT NULL,
    "awarded_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserBadge_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserBadge_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "Badge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CommunityPost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CommunityPost_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LeaderboardCache" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_address_key" ON "User"("wallet_address");

-- CreateIndex
CREATE INDEX "Case_status_idx" ON "Case"("status");

-- CreateIndex
CREATE INDEX "Case_closes_at_idx" ON "Case"("closes_at");

-- CreateIndex
CREATE INDEX "Case_created_at_idx" ON "Case"("created_at");

-- CreateIndex
CREATE INDEX "Argument_case_id_idx" ON "Argument"("case_id");

-- CreateIndex
CREATE INDEX "Argument_user_id_idx" ON "Argument"("user_id");

-- CreateIndex
CREATE INDEX "Argument_votes_idx" ON "Argument"("votes");

-- CreateIndex
CREATE INDEX "ArgumentVote_user_id_idx" ON "ArgumentVote"("user_id");

-- CreateIndex
CREATE INDEX "ArgumentVote_argument_id_idx" ON "ArgumentVote"("argument_id");

-- CreateIndex
CREATE UNIQUE INDEX "ArgumentVote_user_id_argument_id_key" ON "ArgumentVote"("user_id", "argument_id");

-- CreateIndex
CREATE INDEX "UserVote_case_id_idx" ON "UserVote"("case_id");

-- CreateIndex
CREATE INDEX "UserVote_user_id_idx" ON "UserVote"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserVote_user_id_case_id_key" ON "UserVote"("user_id", "case_id");

-- CreateIndex
CREATE INDEX "Reward_user_id_idx" ON "Reward"("user_id");

-- CreateIndex
CREATE INDEX "Reward_case_id_idx" ON "Reward"("case_id");

-- CreateIndex
CREATE INDEX "Reward_status_idx" ON "Reward"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_name_key" ON "Badge"("name");

-- CreateIndex
CREATE INDEX "UserBadge_user_id_idx" ON "UserBadge"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserBadge_user_id_badge_id_key" ON "UserBadge"("user_id", "badge_id");

-- CreateIndex
CREATE INDEX "CommunityPost_created_at_idx" ON "CommunityPost"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "LeaderboardCache_user_id_key" ON "LeaderboardCache"("user_id");

-- CreateIndex
CREATE INDEX "LeaderboardCache_rank_idx" ON "LeaderboardCache"("rank");

-- CreateIndex
CREATE INDEX "LeaderboardCache_points_idx" ON "LeaderboardCache"("points");
