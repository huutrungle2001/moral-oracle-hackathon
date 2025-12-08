<div align="center">

# ⚖️ Moral Oracle
### Play to Think – Think to Earn

[![Stack](https://img.shields.io/badge/Tech-TypeSript%20%7C%20React%20%7C%20Node.js-blue)](https://github.com/huutrungle2001/moral-duel-ts)
[![Hackathon](https://img.shields.io/badge/Category-Agent_Arena_Hackathon-orange)](https://dorahacks.io/)
[![Status](https://img.shields.io/badge/Status-MVP-success)]()
[![License](https://img.shields.io/badge/License-MIT-green)]()

**A "wisdom staking game" where intelligence is valued over loud opinion.**  
*Powered by AI Agents, built for the thinkers.*

[Getting Started](#-getting-started) •
[Features](#-core-features) •
[Architecture](#-system-architecture) •
[Documentation](#-documentation)

</div>

---

## 📖 Overview

**Moral Oracle** transforms chaotic internet arguments into a rewarding intellectual playground. Instead of emotional inconclusive debates, we offer a structured **"Wisdom Staking"** platform where an **AI Oracle** adjudicates cases based on a transparent "Moral Constitution" (Utility, Duty, Virtue).

> "This is not a place to determine who is right or wrong. It is a place where intelligence is valued."

## ✨ Core Features

*   **🧠 Wisdom Staking**: Stake tokens on the logical strength of an argument, not just popularity.
*   **🤖 AI Oracle Judge**: An unbiased agent that evaluates reasoning using a strict ethical framework.
*   **⚡ The "Moral Shock"**: Discover when collective emotion contradicts objective logic.
*   **🏆 Reputation System**: Earn badges like "The Sage" and climb the "Moral IQ" leaderboard.
*   **💰 Fair Rewards**: Winners share the pool; top logical arguments earn bonuses even on the losing side.

## 🏗 System Architecture

The project consists of three main components following the **ADK-TS** standard:

1.  **Frontend (`moral-duel-fe`)**: A React/Vite application that handles the User Interface, Voting, and Staking flow.
2.  **Oracle Agent (`moral-duel-ts`)**: The brain of the system. An ADK-TS agent that:
    *   **Moderates** content.
    *   **Judges** dilemmas.
    *   **Coaches** users with private feedback.
3.  **Smart Contract**: (Mocked for MVP) Handles the escrow and distribution of rewards.

## 📚 Documentation

Detailed documentation is available in the [`docs/`](./docs) folder:

*   [**Product Requirements (PRD)**](./docs/PRD.md): Full feature breakdown and vision.
*   [**Moral Constitution**](./docs/MORAL_CONSTITUTION.md): The prompt engineering behind the AI Judge.
*   [**System Architecture**](./docs/ARCHITECTURE.md): Technical diagrams and data flow.
*   [**API Specification**](./docs/API_SPEC.md): Endpoints for Cases, Votes, and Feedback.
*   [**User Stories**](./docs/USER_STORIES.md): Example flows like "The Corporate Dilemma".

## 🚀 Getting Started

### Prerequisites
*   Node.js v18+
*   npm or bun

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/huutrungle2001/moral-duel.git
    cd moral-duel
    ```

2.  **Start the Oracle Agent (Backend)**
    ```bash
    cd moral-duel-ts
    npm install
    npm start
    # API runs on http://localhost:3001
    ```

3.  **Start the Client (Frontend)**
    ```bash
    cd moral-duel-fe
    npm install
    npm run dev
    # App runs on http://localhost:8080
    ```

## 👥 Contributors

*   [Huutrungle2001](https://github.com/huutrungle2001)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
