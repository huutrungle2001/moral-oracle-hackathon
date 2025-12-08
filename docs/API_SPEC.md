# API Specification - Moral Oracle (v2)

## Base URL
`http://localhost:3001`

## Endpoints

### 1. Health & System
*   **GET** `/health`: Check status.
*   **GET** `/stats`: Platform stats (Total Duels, Total Votes, etc).

### 2. Authentication (Wallet)
*   **POST** `/auth/connect`
*   **Body**: `{ "walletAddress": "0x123..." }`
*   **Response**: 
    *   `200 OK`: Returns existing profile `{ "id": "...", "name": "The Sage", "isNewUser": false }`
    *   `201 Created`: Created new shadow profile `{ "id": "...", "isNewUser": true }`

### 3. Cases (Scenarios)

#### Create (with Moderation)
*   **POST** `/case/create`
*   **Body**: `{ "title": "...", "context": "...", "outcomes": ["YES", "NO"] }`
*   **Process**: Synchronously calls `Moderator` agent.
*   **Response**: `201 Created` or `400 Rejected` (with reason: "Hate Speech").

#### Get
*   **GET** `/cases?filter=trending|new`: List cases.
*   **GET** `/cases/:id`: Detailed view.

### 4. Debate (Voting)

#### Cast Vote
*   **POST** `/cases/:id/vote`
*   **Body**: `{ "user": "0x...", "vote": "YES", "argument": "...", "stake": 50 }`
*   **Constraint**: Argument max 300 chars.

#### Upvote Argument
*   **POST** `/cases/:id/arguments/:argId/upvote`
*   **Body**: `{ "user": "0x..." }`

### 5. Oracle (Judgment & Feedback)

#### Trigger Judgment (System/Cron)
*   **POST** `/cases/:id/judge`
*   **Response**: `{ "verdict": "YES", "bestArguments": [...] }`

#### Get Feedback
*   **GET** `/cases/:id/feedback/:userId`
*   **Auth**: Requires User Signature.
*   **Response**:
    ```json
    {
      "score": 85,
      "strengths": ["Clear Utilitarian logic"],
      "weaknesses": ["Ignored minority rights"],
      "improvementTip": "Read up on Kant's Categorical Imperative."
    }
    ```

### 6. Profile & Reputation
*   **GET** `/profile/:userId`
*   **Response**:
    ```json
    {
      "winRate": 0.65,
      "moralIQ": 120,
      "badges": ["The Sage", "Trendsetter"],
      "history": [...]
    }
    ```
