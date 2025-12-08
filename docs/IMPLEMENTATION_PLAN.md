# Implementation Plan: Moral Oracle

**Goal**: Build a "Wisdom Staking" platform where users stake tokens on moral reasoning, adjudicated by an AI Oracle.
**Frameworks**: React/Tailwind (Frontend), Node/Express (Backend API), IQAI ADK (Agent), Neo X (Blockchain).

---

## Phase 1: Documentation & Design [DONE]
> **Status**: Completed (v1.0)
*   [x] **Product Requirements (PRD)**: Core loop (Create -> Stake -> Debate -> Judge) defined.
*   [x] **Architecture**: 3-tier system (Frontend, API, Oracle Agent) designed.
*   [x] **Moral Constitution**: System prompts for AI Judge (Utilitarian/Deontological balance) written.
*   [x] **API Specification**: Endpoints for Cases, Votes, and Verdicts defined.
*   [x] **Authentication Strategy**: Wallet-First ("Connect to Play") formalized.

---

## Phase 2: Frontend Client (Moral Duel FE) [IN PROGRESS]
> **Status**: Beta Release Ready (Mock Data + Hybrid API)
*   [x] **Project Setup**: Vite + React + Tailwind + shadcn/ui.
*   [x] **Branding**: "Moral Oracle" identity (Logo, Favicon, Colors) applied.
*   [x] **Authentication UI**: "Connect Wallet" flow and Profile Management.
*   [x] **Discovery Flow**:
    *   [x] Homepage with "Trending" and "New" feeds.
    *   [x] Case Cards emphasizing "Moral Shock" and Reward Pool.
*   [x] **Creation Flow**:
    *   [x] Submission form with AI Moderation simulation (Loading state).
*   [x] **Debate & Verdict View (Case Detail)**:
    *   [x] Voting Interface (YES/NO Staking).
    *   [x] Argument Submission (min 20 chars).
    *   [x] "Oracle Verdict" display (Winner, Reasoning, Top Arguments).
*   [ ] **Real-world Integration**:
    *   [ ] Replace `mockData.ts` with real API calls (currently hybrid).
    *   [ ] Integrate real Wallet Connect (e.g., RainbowKit / NeoLine).

---

## Phase 3: Backend API & Agent (Moral Duel BE) [PENDING]
> **Status**: Initial Setup Only
*   [x] **Scaffold**: Express server setup with TypeScript.
*   [ ] **Database (SQLite)**:
    *   [ ] `users` table (wallet_address, moral_iq, badges).
    *   [ ] `cases` table (title, context, status, reward_pool).
    *   [ ] `votes` table (user_id, case_id, side, argument, stake_amount).
*   [ ] **API Implementation**:
    *   [ ] `POST /auth/connect`: Handle wallet login / profile creation.
    *   [ ] `POST /case/create`: Save case & trigger Moderator Agent.
    *   [ ] `POST /vote`: Record vote & stake.
    *   [ ] `GET /case/:id`: Aggregate votes and fetch status.
*   [ ] **Agent Integration (ADK)**:
    *   [ ] **Moderator**: Check cases for hate speech before saving.
    *   [ ] **Judge**: Cron job to fetch "Closed" cases -> Prompt LLM -> Save Verdict.

---

## Phase 4: Smart Contract (Settlement) [FUTURE]
> **Status**: Planned
*   [ ] **Contract Development**:
    *   [ ] `Staking.sol`: Handle deposits for votes.
    *   [ ] `Payout.sol`: Distribute rewards based on Oracle signature.
*   [ ] **Integration**:
    *   [ ] Backend listens to Contract Events (Deposit).
    *   [ ] Backend signs "Verdict" transactions for Contract to execute payout.

---

## Phase 5: Verification & Launch [PENDING]
*   [ ] **End-to-End Testing**:
    *   [ ] User Connects Wallet -> Creates Case -> Moderator Approves.
    *   [ ] Users Vote -> Staking Recorded.
    *   [ ] Time Expires -> Agent Judges -> Verdict Displayed on FE.
    *   [ ] Payout distributed.
*   [ ] **Deployment**:
    *   [ ] Frontend -> Vercel/Netlify.
    *   [ ] Backend/Agent -> Railway/Render.
