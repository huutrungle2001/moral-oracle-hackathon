import { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { api } from '@/lib/api';
import { toast } from 'sonner';

/**
 * Syncs the Solana Wallet Adapter state with our local storage auth system
 */
export const WalletStateSync = () => {
    const { publicKey, connected, disconnecting } = useWallet();

    useEffect(() => {
        const syncWalletState = async () => {
            const storedUser = api.getCurrentUser();
            
            // Case 1: Wallet just connected
            if (connected && publicKey) {
                const address = publicKey.toBase58();
                
                // Only connect if not already connected or address changed
                if (!storedUser || storedUser.wallet_address !== address) {
                    await api.connectWallet(address);
                    toast.success("Wallet connected successfully");
                }
            }
            
            // Case 2: Wallet disconnected
            if (!connected && !publicKey && storedUser && !disconnecting) {
                // If we have a user but no wallet, logout
                // (Check disconnecting to avoid race conditions if needed)
                 api.logout();
                 toast.info("Wallet disconnected");
            }
        };

        syncWalletState();
    }, [publicKey, connected, disconnecting]);

    return null;
};
