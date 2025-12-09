# API Specification - Moral Oracle (Hackathon Edition)

## Base URL
`http://localhost:3000` (or deployed URL)

## Endpoints

### 1. Authentication
*   **POST** `/auth/connect`
    *   **Body**: `{ "wallet_address": "0x123..." }`
    *   **Response**: 
        ```json
        {
          "message": "Wallet connected successfully",
          "user": {
            "id": 1,
            "wallet_address": "0x123...",
            "name": "User_123",
            "total_points": 0
          }
        }
        ```

### 2. Cases (Scenarios)

#### Create (with AI Moderation)
*   **POST** `/case/create`
    *   **Body**: 
        ```json
        { 
          "title": "Should I spy on my partner?", 
          "context": "Context description...", 
          "creator_wallet": "0x123..." 
        }
        ```
    *   **Process**: Calls `Moderator` agent. If unsafe, returns 400.
    *   **Response**: `201 Created` with Case object.

#### Get Cases
*   **GET** `/case?sort=trending|newest`
    *   **Response**: Array of Case objects (enriched with creator name and argument count).

#### Get Case Detail
*   **GET** `/case/:id`
    *   **Response**: Detailed Case object with arguments.

#### Trigger Verdict (Manual/AI)
*   **POST** `/case/:id/verdict`
    *   **Process**: Calls `Judge` agent to analyze arguments and generate verdict.
    *   **Response**:
        ```json
        {
          "verdict": {
            "verdict": "NO",
            "reasoning": "...",
            "topArguments": { ... }
          }
        }
        ```

### 3. Debate (Voting)

#### Cast Vote
*   **POST** `/vote/cast`
    *   **Body**: 
        ```json
        { 
          "case_id": 1, 
          "user_wallet": "0x123...", 
          "side": "YES", 
          "amount": 0 
        }
        ```
    *   **Description**: Increments YES/NO counters.

#### Submit Argument
*   **POST** `/vote/argument`
    *   **Body**:
        ```json
        {
          "case_id": 1,
          "user_wallet": "0x123...",
          "side": "YES",
          "content": "Argument text..."
        }
        ```
    *   **Description**: Adds an argument to the case for the AI Judge to evaluate.

### 4. Health
*   **GET** `/` (Root)
    *   **Response**: "Moral Oracle API Running"
