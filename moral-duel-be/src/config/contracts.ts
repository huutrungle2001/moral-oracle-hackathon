export const ATP_REGISTRY_ADDRESS = process.env.ATP_REGISTRY_ADDRESS || "0x1234567890123456789012345678901234567890"; // Placeholder
export const ATP_SETTLEMENT_ADDRESS = process.env.ATP_SETTLEMENT_ADDRESS || "0x0987654321098765432109876543210987654321"; // Placeholder

export const ATP_REGISTRY_ABI = [
  {
    "type": "function",
    "name": "registerAgent",
    "inputs": [
        { "name": "metadataURI", "type": "string" },
        { "name": "owner", "type": "address" }
    ],
    "outputs": [{ "name": "agentId", "type": "uint256" }],
    "stateMutability": "nonpayable"
  }
] as const;

export const ATP_SETTLEMENT_ABI = [
  {
    "type": "function",
    "name": "settleCase",
    "inputs": [
        { "name": "caseId", "type": "string" },
        { "name": "winner", "type": "address" },
        { "name": "amount", "type": "uint256" }
    ],
    "outputs": [{ "name": "success", "type": "boolean" }],
    "stateMutability": "nonpayable"
  }
] as const;
