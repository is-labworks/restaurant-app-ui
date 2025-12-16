"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { getTranslation } from "@/lib/i18n";
import { menuItemsData } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Send, Plus } from "lucide-react";

export default function RecommendationsPage() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  const allMenuItems = menuItemsData[language];

  const [messages, setMessages] = useState<
    Array<{ role: "user" | "ai"; content: string }>
  >([
    {
      role: "ai",
      content:
        language === "vi"
          ? "Xin chào! Hãy cho tôi biết sở thích ăn uống của bạn và tôi sẽ gợi ý một số món ăn. Bạn thích gì?"
          : "Hi! Tell me your food preferences and I'll recommend some dishes. What do you like?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [recommendations, setRecommendations] = useState<typeof allMenuItems>(
    []
  );
  const [showRecommendations, setShowRecommendations] = useState(false);

  const mockAIRecommendations = {
    spicy: [allMenuItems[6], allMenuItems[7]], // Bún Bò Huế, Hủ Tiếu Nam Vang
    light: [allMenuItems[3], allMenuItems[8]], // Gỏi Cuốn, Chả Giò
    traditional: [allMenuItems[0], allMenuItems[4]], // Phở Bò, Cơm Tấm
    rice: [allMenuItems[4], allMenuItems[5]], // Cơm Tấm, Bánh Xèo
    sweet: [allMenuItems[12], allMenuItems[13], allMenuItems[14]], // Chè Ba Màu, Xôi Xoài, Bánh Flan
    drinks: [allMenuItems[9], allMenuItems[10], allMenuItems[11]], // Cà Phê, Trà, Nước Mía
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: inputValue }]);

    // Simulate AI analysis
    setTimeout(() => {
      let recommended = allMenuItems.slice(0, 6); // Show first 6 by default
      const lowerInput = inputValue.toLowerCase();

      if (
        lowerInput.includes("cay") ||
        lowerInput.includes("hot") ||
        lowerInput.includes("spicy")
      ) {
        recommended = mockAIRecommendations.spicy;
      } else if (
        lowerInput.includes("nhe") ||
        lowerInput.includes("light") ||
        lowerInput.includes("goi") ||
        lowerInput.includes("salad")
      ) {
        recommended = mockAIRecommendations.light;
      } else if (
        lowerInput.includes("ngot") ||
        lowerInput.includes("sweet") ||
        lowerInput.includes("dessert") ||
        lowerInput.includes("trang mieng")
      ) {
        recommended = mockAIRecommendations.sweet;
      } else if (
        lowerInput.includes("com") ||
        lowerInput.includes("rice") ||
        lowerInput.includes("cơm")
      ) {
        recommended = mockAIRecommendations.rice;
      } else if (
        lowerInput.includes("do uong") ||
        lowerInput.includes("drink") ||
        lowerInput.includes("cafe") ||
        lowerInput.includes("coffee") ||
        lowerInput.includes("tra")
      ) {
        recommended = mockAIRecommendations.drinks;
      } else if (
        lowerInput.includes("truyen") ||
        lowerInput.includes("traditional") ||
        lowerInput.includes("pho") ||
        lowerInput.includes("phở")
      ) {
        recommended = mockAIRecommendations.traditional;
      }

      setRecommendations(recommended);
      setShowRecommendations(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            language === "vi"
              ? "Dựa trên sở thích của bạn, tôi gợi ý những món ăn này cho bạn!"
              : "Based on your preferences, I recommend these dishes for you!",
        },
      ]);
    }, 800);

    setInputValue("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-border z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/customer/menu">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronLeft size={20} />
            </Button>
          </Link>
          <h1 className="font-semibold text-foreground">{t("chatWithAI")}</h1>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-4 rounded-lg ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-secondary text-foreground rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Recommendations */}
        {showRecommendations && recommendations.length > 0 && (
          <div className="mt-6 space-y-4">
            {recommendations.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-24 h-24 rounded object-cover bg-muted"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.description}
                    </p>
                    <p className="text-sm font-medium text-primary mb-3">
                      {language === "vi"
                        ? `₫${item.price.toLocaleString()}`
                        : `$${item.price.toFixed(2)}`}
                    </p>
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Plus size={14} className="mr-1" />
                      {t("addToCart")}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={t("enterPreferences")}
              className="flex-1 px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4"
            >
              <Send size={18} />
            </Button>
          </div>
          <Link href="/customer/menu" className="block mt-2">
            <Button variant="outline" className="w-full">
              {t("backToMenu")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
