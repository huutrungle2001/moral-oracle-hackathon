import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

const CreateCase = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // Changed from context

  const [isSubmitting, setIsSubmitting] = useState(false); // Changed from isModerating
  const { toast } = useToast(); // Initialized useToast hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (!title || !description) { // Changed from context
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill in all fields.",
      });
      return;
    }

    // Check Authentication
    const user = api.getCurrentUser(); // Assuming api.getCurrentUser() exists
    if (!user) {
      toast({
        variant: "destructive",
        title: "Wallet not connected",
        description: "Please connect your wallet to create a case.",
      });
      return;
    }

    setIsSubmitting(true); // Changed from setIsModerating

    try {
      // Real API Call
      await api.createCase(title, description); // Changed from context

      toast({
        title: "Case Submitted",
        description: "Your moral dilemma has been submitted for moderation.",
      });

      // Reset form
      setTitle("");
      setDescription(""); // Changed from setContext

      // Redirect to discover to see the new case
      navigate('/discover');

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: error.message || "Failed to create case",
      });
    } finally {
      setIsSubmitting(false); // Changed from setIsModerating
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Create Trending Cases & Earn Bonuses</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3">Create a Moral Duel</h1>
            <p className="text-lg text-muted-foreground">
              Submit a controversial dilemma and earn rewards when it goes viral
            </p>
          </div>

          <Card className="p-8 space-y-6">
            {/* Case Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">
                Case Title *
              </Label>
              <Input
                id="title"
                placeholder="e.g., Cài định vị điện thoại người yêu?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg"
              />
              <p className="text-sm text-muted-foreground">Make it attention-grabbing and clear</p>
            </div>

            {/* Context */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold">
                Context (3-6 lines) *
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the moral dilemma in detail. What's the situation? Who's involved? What's at stake?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[150px]"
              />
              <p className="text-sm text-muted-foreground">
                Provide enough context for people to understand the dilemma
              </p>
            </div>

            {/* Preview */}
            {title && description && (
              <div className="mt-8 p-6 bg-muted/50 rounded-xl border border-border">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">Preview</h3>
                <div className="space-y-3">
                  <h4 className="text-xl font-bold text-foreground">{title}</h4>
                  <p className="text-muted-foreground">{description}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/discover")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Analyzing Ethics...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Submit for AI Moderation
                  </>
                )}
              </Button>
            </div>

            {/* Info Box */}
            <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-sm text-foreground">
                <strong>Pro Tip:</strong> Cases that generate ≥100 participants earn you bonus rewards! 
                Make your dilemma thought-provoking and controversial for maximum engagement.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateCase;
