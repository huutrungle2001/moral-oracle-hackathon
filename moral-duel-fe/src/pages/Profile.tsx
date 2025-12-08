import { useState } from "react";
import { Wallet as WalletIcon, Award, TrendingUp, Download, User, Mail, Calendar, Settings } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import avatarImage from "@/assets/avatar.png";

const Profile = () => {
  const [isConnected, setIsConnected] = useState(false);
  const walletAddress = "0xABC123DEF456GHI789JKL012MNO345PQR678STU901";
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: "Master of Logic",
    email: "logic.master@gmail.com",
    bio: "Calm as a cloud, flowing like water",
  });

  const handleConnect = () => {
    setIsConnected(true);
    toast.success("Wallet connected successfully!");
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast.success("Wallet disconnected");
  };

  const handleClaim = () => {
    toast.success("Rewards claimed! Check your wallet.");
  };

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
    setIsEditDialogOpen(false);
  };

  const userProfile = {
    name: "Thạc sĩ bé iu",
    email: "thacsibeiu83@gmail.com",
    joinDate: "March 2024",
    rank: "#1",
  };

  const mockStats = {
    balance: 2450,
    pending: 340,
    totalEarned: 5890,
    duelsParticipated: 23,
    winRate: 68,
  };

  const mockBadges = [
    { id: 1, name: "The Sage", desc: "Won 5 consecutive duels", earned: true },
    { id: 2, name: "Master of Reasoning", desc: "Top argument 3 times", earned: true },
    { id: 3, name: "Trendsetter", desc: "Created a case with ≥100 participants", earned: false },
  ];

  const recentActivity = [
    { id: 1, name: "Tracking Lover's Location?", reward: 75, date: "2 hours ago" },
    { id: 2, name: "Firing Elderly Employee?", reward: 120, date: "1 day ago" },
    { id: 3, name: "Dating New Person During Separation?", reward: 145, date: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Thinking Profile</h1>

        {/* User Profile Card */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full border-4 border-secondary/30 overflow-hidden flex-shrink-0 shadow-lg">
              <img src={avatarImage} alt={editedProfile.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">{editedProfile.name}</h2>
                  <p className="text-sm text-muted-foreground mb-2">{editedProfile.bio}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {editedProfile.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined {userProfile.joinDate}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-accent text-accent-foreground">Rank {userProfile.rank}</Badge>
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>Update your personal information here.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={editedProfile.name}
                            onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editedProfile.email}
                            onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Input
                            id="bio"
                            value={editedProfile.bio}
                            onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveProfile} className="bg-gradient-to-r from-secondary to-accent">
                          Save Changes
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Connect Wallet Section */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-secondary/40 via-primary/30 to-accent/35 dark:from-primary/20 dark:via-accent/10 dark:to-background border-2 border-secondary/40 dark:border-primary/30 shadow-lg shadow-secondary/20 dark:shadow-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <WalletIcon className="w-6 h-6" />
            My Wallet
          </h2>

          {!isConnected ? (
            <div className="text-center py-8 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <WalletIcon className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Connect Your Wallet</h3>
              <p className="text-muted-foreground mb-6">
                Connect your Neo wallet to view your balance, claim rewards, and participate in debates
              </p>
              <Button
                onClick={handleConnect}
                className="bg-gradient-to-r from-secondary via-accent to-primary dark:from-primary dark:via-primary-glow dark:to-accent hover:opacity-90 hover:scale-105 transition-all gap-2 text-white dark:text-primary-foreground shadow-lg dark:shadow-primary/50"
                size="lg"
              >
                <WalletIcon className="w-5 h-5" />
                Connect NeoLine Wallet
              </Button>
              <p className="text-xs text-foreground/70 mt-4">
                Don't have a wallet?{" "}
                <a href="#" className="text-primary dark:text-accent hover:underline font-medium">
                  Install NeoLine
                </a>
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Connected Wallet</p>
                  <p className="text-sm font-mono font-semibold text-foreground break-all">{walletAddress}</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleDisconnect}>
                  Disconnect
                </Button>
              </div>

              {/* Balance Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="p-4 bg-gradient-to-br from-secondary/10 to-accent/10">
                  <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
                  <p className="text-3xl font-bold text-foreground mb-1">{mockStats.balance}</p>
                  <p className="text-sm text-accent">MO Tokens</p>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/20">
                  <p className="text-sm text-muted-foreground mb-2">Pending Rewards</p>
                  <p className="text-3xl font-bold text-foreground mb-1">{mockStats.pending}</p>
                  <Button onClick={handleClaim} size="sm" className="mt-2 gap-2">
                    <Download className="w-4 h-4" />
                    Claim Now
                  </Button>
                </Card>

                <Card className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">Total Earned</p>
                  <p className="text-3xl font-bold text-foreground mb-1">{mockStats.totalEarned}</p>
                  <p className="text-sm text-muted-foreground">All time earnings</p>
                </Card>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">Recent Rewards</h3>
                <div className="space-y-2">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{activity.name}</p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-accent">+{activity.reward}</p>
                        <p className="text-xs text-muted-foreground">tokens</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </Card>

        {/* Stats and Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-bold text-foreground">Statistics</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duels Participated</span>
                <span className="font-semibold text-foreground">{mockStats.duelsParticipated}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Win Rate</span>
                <span className="font-semibold text-yes">{mockStats.winRate}%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-bold text-foreground">Badges</h3>
            </div>
            <div className="space-y-2">
              {mockBadges.map((badge) => (
                <div key={badge.id} className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${badge.earned ? "text-foreground" : "text-muted-foreground"}`}>
                      {badge.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{badge.desc}</p>
                  </div>
                  {badge.earned ? (
                    <Badge className="bg-yes text-yes-foreground">Earned</Badge>
                  ) : (
                    <Badge variant="outline">Locked</Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
