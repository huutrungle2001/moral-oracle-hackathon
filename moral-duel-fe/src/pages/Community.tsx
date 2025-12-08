import { Sparkles, Award, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Community = () => {
  const mockPosts = [
    {
      id: 1,
      author: "Bà béo",
      avatar: "BB",
      content: "Hôm nay tranh luận với chồng về việc nên mua iPhone hay Samsung, kiếm được 340 token. Giờ mua được cả 2 luôn! 😂💰",
      type: "reward",
      time: "30 phút trước"
    },
    {
      id: 2,
      author: "Thạc sĩ bé iu",
      avatar: "TM",
      content: "App này là thiên đường của mấy đứa hay cãi nhau! Vừa cãi được trả lương, về nhà cãi với vợ lại kiếm thêm experience. Win-win! 🤣",
      type: "shoutout",
      time: "1 giờ trước"
    },
    {
      id: 3,
      author: "Mèo anh lông ngắn",
      avatar: "MA",
      content: "Tranh luận case 'Cài định vị điện thoại người yêu' xong, crush nhắn hỏi sao cứ online hoài. Giờ thành case mới: 'Có nên nói sự thật về nghiện app tranh luận?' 😅",
      type: "trending",
      time: "2 giờ trước"
    },
    {
      id: 4,
      author: "CryptoPhilosopher420",
      avatar: "CP",
      content: "Today I earned 240 tokens by defending the importance of privacy in relationships. Logic wins! 🧠",
      type: "reward",
      time: "2 giờ trước"
    },
    {
      id: 5,
      author: "Tribatko",
      avatar: "TK",
      content: "Vừa mở khóa huy hiệu 'Cao thủ lý lẽ'! Bí quyết: 70% logic, 30% cảm xúc, 100% kiên nhẫn đọc ý kiến người khác 🏆",
      type: "achievement",
      time: "3 giờ trước"
    },
    {
      id: 6,
      author: "DebateLordSupreme",
      avatar: "DL",
      content: "This app is absolutely brilliant! Finally a place where I can argue with strangers AND get paid for it. My therapist says I'm making progress. 😂",
      type: "shoutout",
      time: "4 giờ trước"
    },
    {
      id: 7,
      author: "Harithng",
      avatar: "HT",
      content: "Mini game đạo đức: Nếu biết trước mình sẽ thua tranh luận, bạn có nên bỏ cuộc sớm để bảo toàn token không? 🤔",
      type: "game",
      time: "5 giờ trước"
    },
    {
      id: 8,
      author: "MindReaderRefuser",
      avatar: "MR",
      content: "Mini moral game: If you could read your partner's mind for one day, would you? The Oracle says NO. Privacy is sacred.",
      type: "game",
      time: "5 giờ trước"
    },
    {
      id: 9,
      author: "Hải Râu",
      avatar: "HR",
      content: "Tạo case về 'Sa thải nhân viên lớn tuổi' vì nhớ sếp cũ. Giờ có 200+ người tham gia, bonus token về như lũ. Cảm ơn sếp cũ đã toxic! 😎",
      type: "trending",
      time: "8 giờ trước"
    },
    {
      id: 10,
      author: "EthicsNinja42",
      avatar: "EN",
      content: "Just unlocked 'Bậc thầy lý lẽ' badge! My arguments on workplace ethics resonated with the community 💬",
      type: "achievement",
      time: "1 ngày trước"
    },
    {
      id: 11,
      author: "Mle",
      avatar: "ML",
      content: "\"Cuộc đời không phải đen trắng, mà là 50 sắc thái xám. Nhưng tranh luận thì phải chọn YES hay NO thôi.\" - Triết lý sống còn 2025 🧘‍♀️",
      type: "quote",
      time: "1 ngày trước"
    },
    {
      id: 12,
      author: "SocratesReborn",
      avatar: "SR",
      content: "\"The unexamined life is not worth living, but the over-examined life leads to analysis paralysis. Balance is wisdom.\" — Real moral reflection",
      type: "quote",
      time: "1 ngày trước"
    },
    {
      id: 13,
      author: "Hung_nam_ky",
      avatar: "HN",
      content: "Vợ hỏi 'Anh nghĩ sao về case định vị điện thoại?'. Anh trả lời theo phe NO. Giờ phải ngủ sofa. Kiếm token mà mất giường. Trade-off đau lòng! 🛋️😭",
      type: "shoutout",
      time: "1 ngày trước"
    },
    {
      id: 14,
      author: "Jessica meo meo",
      avatar: "JM",
      content: "Mini game: Nếu tranh luận thắng nhưng mất bạn bè, vs tranh luận thua nhưng giữ được tình bạn - bạn chọn gì? Mình chọn... block luôn để khỏi phải chọn 🙈",
      type: "game",
      time: "2 ngày trước"
    },
    {
      id: 15,
      author: "TokenHunterPro",
      avatar: "TH",
      content: "Created a case about elderly employment rights that got 150+ participants! Bonus rewards incoming",
      type: "trending",
      time: "2 ngày trước"
    },
    {
      id: 16,
      author: "ProfitVsCompassion",
      avatar: "PC",
      content: "Mini moral game: Should companies prioritize profit over employee wellbeing? Cast your vote in Discover!",
      type: "game",
      time: "2 ngày trước"
    }
  ];

  const getPostIcon = (type: string) => {
    switch (type) {
      case "reward":
        return <Award className="w-5 h-5 text-accent" />;
      case "achievement":
        return <Sparkles className="w-5 h-5 text-primary" />;
      case "game":
        return <Sparkles className="w-5 h-5 text-primary-glow" />;
      case "trending":
        return <Heart className="w-5 h-5 text-destructive" />;
      default:
        return <Sparkles className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getPostBadge = (type: string) => {
    const badges: Record<string, { label: string; className: string }> = {
      reward: { label: "Reward", className: "bg-accent/20 text-accent-foreground border-accent" },
      achievement: { label: "Achievement", className: "bg-primary/20 text-primary-foreground border-primary" },
      game: { label: "Game", className: "bg-primary-glow/20 text-primary border-primary-glow" },
      trending: { label: "Trending", className: "bg-destructive/20 text-destructive-foreground border-destructive" },
      quote: { label: "Reflection", className: "bg-muted text-muted-foreground border-border" },
      shoutout: { label: "Shoutout", className: "bg-primary/20 text-primary-foreground border-primary" }
    };
    return badges[type] || badges.quote;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">Community</h1>
          <p className="text-lg text-muted-foreground">
            A positive space for sharing insights, mini games, and celebrating achievements
          </p>
        </div>

        {/* Info Banner */}
        <Card className="p-6 mb-8 bg-background/95 backdrop-blur-sm
          border-2 border-primary/30
          dark:border-primary/40
          shadow-[0_4px_20px_rgba(92,189,185,0.15),0_2px_8px_rgba(0,0,0,0.05)]
          dark:shadow-[0_6px_25px_rgba(225,179,130,0.15),0_3px_10px_rgba(225,179,130,0.1)]">
          <div className="flex items-start gap-4">
            <Sparkles className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Welcome to the Community Feed</h3>
              <p className="text-muted-foreground leading-relaxed">
                This is a reply-free showcase area where members share their earnings, moral reflections, 
                mini games, and achievements. No debates here—just inspiration and celebration!
              </p>
            </div>
          </div>
        </Card>

        {/* Posts Feed */}
        <div className="max-w-3xl mx-auto space-y-4">
          {mockPosts.map((post) => {
            const badge = getPostBadge(post.type);
            return (
              <Card key={post.id} className="p-6 bg-background/95 backdrop-blur-sm
                border-2 border-border/60 hover:border-primary/50
                dark:border-primary/30 dark:hover:border-primary/50
                shadow-[0_4px_20px_rgba(92,189,185,0.15),0_2px_8px_rgba(0,0,0,0.05)]
                hover:shadow-[0_8px_30px_rgba(92,189,185,0.25),0_4px_12px_rgba(0,0,0,0.08)]
                dark:shadow-[0_6px_25px_rgba(225,179,130,0.15),0_3px_10px_rgba(225,179,130,0.1)]
                dark:hover:shadow-[0_12px_40px_rgba(225,179,130,0.25),0_6px_16px_rgba(225,179,130,0.15)]
                transition-all duration-300">
                <div className="flex gap-4">
                  <Avatar className="w-12 h-12 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-semibold">
                      {post.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-medium text-foreground">
                          {post.author}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{post.time}</span>
                      </div>
                      {getPostIcon(post.type)}
                    </div>

                    <p className="text-foreground leading-relaxed">{post.content}</p>

                    <Badge variant="outline" className={badge.className}>
                      {badge.label}
                    </Badge>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State Message */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            More posts coming soon! Keep participating in duels to see your achievements here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Community;
