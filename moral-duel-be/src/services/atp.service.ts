import { createWalletClient, http, publicActions } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet, sepolia } from 'viem/chains';
import { ATP_REGISTRY_ADDRESS, ATP_REGISTRY_ABI, ATP_SETTLEMENT_ADDRESS, ATP_SETTLEMENT_ABI } from '../config/contracts';
import dotenv from 'dotenv';

dotenv.config();

export class AtpService {
  private client;
  private account;

  constructor() {
    const pKey = process.env.WALLET_PRIVATE_KEY as `0x${string}`;
    if (!pKey) {
      console.warn("WALLET_PRIVATE_KEY not set. ATP Service will operate in read-only/mock mode.");
      return;
    }

    this.account = privateKeyToAccount(pKey);
    
    // Default to Sepolia for hackathon/dev
    this.client = createWalletClient({
      account: this.account,
      chain: sepolia,
      transport: http()
    }).extend(publicActions);
  }

  async registerAgent(name: string): Promise<string | null> {
    if (!this.client) {
      console.log(`[Mock] Registered Agent "${name}" on ATP Registry.`);
      return "mock-tx-hash-register";
    }

    try {
      console.log(`Registering Agent "${name}" on-chain...`);
      const hash = await this.client.writeContract({
        address: ATP_REGISTRY_ADDRESS as `0x${string}`,
        abi: ATP_REGISTRY_ABI,
        functionName: 'registerAgent',
        args: [`ipfs://metadata/${name}`, this.account!.address]
      });
      console.log(`Agent Registered. Tx: ${hash}`);
      return hash;
    } catch (error) {
      console.error("Failed to register agent on ATP:", error);
      return null;
    }
  }

  async settleCase(caseId: string, winnerAddress: string, rewardAmount: bigint): Promise<string | null> {
      if (!this.client) {
        console.log(`[Mock] Settled Case ${caseId}. Winner: ${winnerAddress}, Amount: ${rewardAmount}`);
        return "mock-tx-hash-settle";
      }

      try {
        console.log(`Settling Case ${caseId} on-chain...`);
        const hash = await this.client.writeContract({
            address: ATP_SETTLEMENT_ADDRESS as `0x${string}`,
            abi: ATP_SETTLEMENT_ABI,
            functionName: 'settleCase',
            args: [caseId, winnerAddress as `0x${string}`, rewardAmount]
        });
        console.log(`Case Settled. Tx: ${hash}`);
        return hash;
      } catch (error) {
        console.error(`Failed to settle case ${caseId} on ATP:`, error);
        return null;
      }
  }
}

export const atpService = new AtpService();
