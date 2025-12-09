import { Link, useLocation } from "react-router-dom";
import { Home, Users, Compass, Trophy, Moon, Sun, User, LogIn, UserPlus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import logoDark from "@/assets/logic-emotion-dark.png";
import logoLight from "@/assets/logic-emotion-light.png";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

const Navbar = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(false);

  // Solana Hooks
  const { connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const [user, setUser] = useState<any>(null); 

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  useEffect(() => {
    // Check local storage on mount or when connected changes
    const storedUser = api.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, [connected]); 

  const handleConnect = () => {
    setVisible(true); // Open Solana Wallet Modal
  };

  const handleDisconnect = () => {
    disconnect();
    api.logout();
    setUser(null);
    toast({
      description: "Wallet disconnected"
    });
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/discover", icon: Compass, label: "Discover" },
    { path: "/community", icon: Users, label: "Community" },
    { path: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-4">
              <img 
                src={isDark ? logoDark : logoLight} 
                alt="Moral Oracle" 
                className="w-16 h-16 p-1 rounded-lg" 
              />
              <span className="text-xl font-bold font-roboto text-foreground hidden sm:inline">
                Moral Oracle
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant="ghost"
                      className={`gap-2 ${isActive ? 'bg-primary/10 text-primary hover:bg-primary/20' : ''}`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            
            {!connected ? (
              <>
                <Button variant="outline" className="gap-2" onClick={handleConnect}>
                    <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Connect Wallet</span>
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                      onClick={handleDisconnect}
                    className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-around pb-3 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className="flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-full gap-1 ${isActive ? 'bg-primary/10 text-primary hover:bg-primary/20' : ''}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
