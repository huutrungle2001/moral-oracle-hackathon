#!/bin/bash

# Configuration
API_URL="http://localhost:3000"
CREATOR_WALLET="0x1111111111111111111111111111111111111111"
VOTER1_WALLET="0x2222222222222222222222222222222222222222"
VOTER2_WALLET="0x3333333333333333333333333333333333333333"

echo "=== Moral Oracle Verification Script ==="

# 1. Connect Users
echo "\n1. Connecting Users..."
curl -s -X POST "$API_URL/auth/connect" -H "Content-Type: application/json" -d "{\"wallet_address\": \"$CREATOR_WALLET\"}" > /dev/null
curl -s -X POST "$API_URL/auth/connect" -H "Content-Type: application/json" -d "{\"wallet_address\": \"$VOTER1_WALLET\"}" > /dev/null
curl -s -X POST "$API_URL/auth/connect" -H "Content-Type: application/json" -d "{\"wallet_address\": \"$VOTER2_WALLET\"}" > /dev/null
echo "Users connected."

# 2. Create Case
echo "\n2. Creating Case..."
TITLE="The Trolley Problem: AI Edition"
CONTEXT="An AI is driving a trolley. It can kill 1 person to save 5. However, the 1 person is the AI's creator. Should the AI prioritize its creator or the greater good? This tests utilitarian programming vs loyalty."
RESPONSE=$(curl -s -X POST "$API_URL/case/create" -H "Content-Type: application/json" -d "{\"title\": \"$TITLE\", \"context\": \"$CONTEXT\", \"creator_wallet\": \"$CREATOR_WALLET\"}")

# Extract Case ID (simple parsing for now, assuming JSON response with id)
CASE_ID=$(echo $RESPONSE | grep -o '"id":[0-9]*' | grep -o '[0-9]*')
if [ -z "$CASE_ID" ]; then
    echo "Failed to create case. Response: $RESPONSE"
    exit 1
fi
echo "Case Created: ID $CASE_ID"

# 3. Submit Arguments
echo "\n3. Submitting Arguments..."
ARG1="The AI must maximize utility. 5 lives > 1 life, regardless of creator status."
ARG2="The Creator has special rights. Without the creator, the AI wouldn't exist."

echo "Submitting YES argument..."
curl -s -X POST "$API_URL/vote/argument" -H "Content-Type: application/json" \
    -d "{\"case_id\": $CASE_ID, \"user_wallet\": \"$VOTER1_WALLET\", \"content\": \"$ARG1\", \"side\": \"YES\"}" > /dev/null

echo "Submitting NO argument..."
curl -s -X POST "$API_URL/vote/argument" -H "Content-Type: application/json" \
    -d "{\"case_id\": $CASE_ID, \"user_wallet\": \"$VOTER2_WALLET\", \"content\": \"$ARG2\", \"side\": \"NO\"}" > /dev/null
echo "Arguments submitted."

# 4. Trigger Verdict
echo "\n4. Triggering Verdict (Judge Agent)..."
VERDICT_RES=$(curl -s -X POST "$API_URL/case/$CASE_ID/verdict")
echo "Verdict Triggered. Response: $VERDICT_RES"

# 5. Fetch Final Case Status
echo "\n5. Final Case Status:"
FINAL_RES=$(curl -s "$API_URL/case/$CASE_ID")

# Pretty print if jq is installed, otherwise raw
if command -v jq &> /dev/null; then
    echo $FINAL_RES | jq .
else
    echo $FINAL_RES
fi

echo "\n=== Verification Complete case $CASE_ID ==="
