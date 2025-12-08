# System Architecture - Moral Oracle

## Overview
The system follows a 3-tier architecture enhanced with an **AI Oracle Layer** that handles judgment, moderation, and personalized feedback.

## High-Level Diagram
```mermaid
graph TD
    User[User / Client] -->|HTTP/REST| API[Backend API (Node/Express)]
    API -->|Read/Write| DB[(Database / SQLite)]
    API -->|Trigger| Oracle[AI Oracle Agent]
    
    subgraph AI Oracle Layer
        Oracle -->|Filter Content| Moderator[Moderate Content]
        Oracle -->|Analyze & Judge| Judge[Judge Verdict]
        Oracle -->|Generate Feedback| Coach[Feedback Coach]
        Judge -->|Inference| LLM[LLM Service (OpenAI/Gemini)]
        Coach -->|Inference| LLM
    end

    Oracle -->|Commit Verdict| DB
    DB -->|Smart Contract Trigger| Blockchain[Smart Contract / Mock]
```

## Components

### 1. Frontend Client
*   **Tech**: React (Vite), Tailwind CSS.
*   **New Features**:
    *   **Badges Display**: "The Sage", "Trendsetter".
    *   **Feedback View**: Private inbox for AI feedback.
    *   **Live Charts**: Real-time YES/NO ratio.

### 2. Backend API
*   **Tech**: Node.js, Express, TypeScript.
*   **New Flows**:
    *   `POST /case/create` -> Triggers `Moderator` agent immediately.
    *   `POST /vote` -> Validates stake balance.
    *   `GET /feedback/:caseId` -> Fetches private feedback.

### 3. The Oracle Agent (ADK-TS)
*   **Tech**: IQAI ADK (TypeScript).
*   **Modules**:
    *   **Moderator**: Prompts checking for hate speech/PII.
    *   **Judge**: Evaluates Logic, Human-centeredness, Long-term impact.
    *   **Coach**: Generates personalized constructive criticism for every voter.

### 4. Reward Engine
*   **Logic**:
    *   Total Pool = Sum(Stakes)
    *   Fee = 2% (Split 1% to Creator if applicable)
    *   Win Pool = 68% (Distributed to winners)
    *   Top Args (Win) = 15% (Weighted by Upvotes)
    *   Top Args (Loss) = 15% (Weighted by Upvotes)

## Data Flow: The Lifecycle
1.  **Creation**: User submits case -> **Moderator** approves/rejects.
2.  **Debate**: Users vote/stake. Database tracks upvotes.
3.  **Judgment**: Time expires -> **Judge** reads all args -> Outputs Verdict AND "Best Arguments".
4.  **Feedback**: **Coach** iterates through all user arguments -> Generates private feedback -> specific tips for improvement.
5.  **Settlement**: Reward Engine calculates splits -> Updates balances.
