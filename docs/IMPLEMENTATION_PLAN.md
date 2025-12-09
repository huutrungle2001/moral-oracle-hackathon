# Implementation Plan: Moral Oracle

**Goal**: Build a "Wisdom Staking" platform where users stake tokens on moral reasoning, adjudicated by an AI Oracle.
**Frameworks**: React/Tailwind (Frontend), Node/Express (Backend API), IQAI ADK (Agent), EVM Standard (Chain Agnostic).

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
    *   [ ] Integrate real Wallet Connect (e.g., RainbowKit / Metamask).

---

## Phase 3: Backend API & Agent (Moral Duel BE) [IN PROGRESS]
> **Status**: Core API & Database Ready (Agent Logic Pending)
*   [x] **Scaffold**: Express server setup with TypeScript.
*   [x] **Database (SQLite)**:
    *   [x] **Port Legacy Schema**: Copy `schema.prisma` from `moral-duel-be` (User, Case, Argument, Vote models).
    *   [x] Initialize Prisma Client in `moral-duel-ts`.
*   [x] **API Implementation**:
    *   [x] `POST /auth/connect`: Handle wallet login / profile creation.
    *   [x] `POST /case/create`: Save case & trigger Moderator Agent.
    *   [x] `POST /vote`: Record vote & stake.
    *   [x] `GET /case/:id`: Aggregate votes and fetch status.
    *   [x] **Testing**: Integration tests setup with Jest/Supertest (`/auth` passing).
*   [x] **Agent Integration (ADK)**:
    *   [x] **Setup**: Installed ADK-TS/OpenAI & Configured `src/agent/config`.
    *   [x] **Moderator Agent**: Implement ADK Workflow to check content safety.
    *   [x] **Judge Agent**: Implement "Moral Constitution" logic (3 Pillars) using ADK-TS Loop.
        *   *Note*: Do NOT port legacy Python prompts. Use `docs/MORAL_CONSTITUTION.md` as source of truth.

---

## Phase 4: ATP Integration (Settlement) [FUTURE]
> **Status**: Planned
*   [ ] **Asset Tokenization**:
    *   [ ] Register "Moral Oracle" agent on IQAI ATP.
    *   [ ] Define "Wisdom Stake" asset mechanics.
*   [ ] **Integration**:
    *   [ ] Backend triggers ATP "Settlement" events.
    *   [ ] Wallet connect flow uses supported ATP chains (e.g. Ethereum/L2).
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
