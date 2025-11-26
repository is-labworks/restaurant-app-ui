"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"
import { Lock, UtensilsCrossed } from "lucide-react"

export default function Home() {
  const { language, setLanguage } = useLanguage()
  const t = (key: string) => getTranslation(key, language)

  return (
    <main className="min-h-screen bg-background">
      {/* Header with Language Switcher */}
      <div className="sticky top-0 bg-white border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <UtensilsCrossed size={28} className="text-primary" />
            <h1 className="text-xl font-bold text-foreground">
              {t("restaurantPro")}
            </h1>
          </div>
          <button
            onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
            className="px-4 py-2 text-sm font-medium bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            {language === "vi" ? "English" : "Tiếng Việt"}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
            {t("restaurantOrderingSystem")}
          </h2>
          <p className="text-xl text-muted-foreground text-balance">
            {t("completeSolution")}
          </p>
        </div>

        {/* Public Section - Customer Portal (Prominent) */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground">
              {t("publicSection")}
            </h3>
          </div>

          {/* Large Customer Portal Card */}
          <Link href="/customer/menu" className="block mb-8">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-12 shadow-lg hover:shadow-2xl transition-all cursor-pointer group">
              <div className="space-y-6 text-center">
                <div className="text-6xl md:text-7xl">🛒</div>
                <div>
                  <h3 className="text-4xl font-bold text-primary-foreground mb-2">
                    {t("customerPortal")}
                  </h3>
                  <p className="text-lg text-primary-foreground/90 mb-6">
                    {t("browseMenu")}
                  </p>
                </div>
                <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold text-base px-8 py-3">
                  {t("getStarted")} →
                </Button>
              </div>
            </div>
          </Link>

          {/* Private Section - Staff Login Required */}
          <div className="border-t border-border pt-16">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Lock size={24} className="text-primary" />
                <h3 className="text-2xl font-bold text-foreground">
                  {t("privateSection")}
                </h3>
              </div>
              <p className="text-muted-foreground">
                {t("staffCredentials")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {/* Kitchen Staff Login */}
              <Link href="/login?role=staff" className="block">
                <div className="bg-white border-2 border-border rounded-xl p-8 hover:border-primary transition-all cursor-pointer group h-full flex flex-col justify-between">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-4">👨‍🍳</div>
                    <h4 className="font-bold text-foreground text-lg">
                      {t("kitchenStaff")}
                    </h4>
                  </div>
                  <div className="space-y-2 mb-6 text-sm text-muted-foreground text-center">
                    <p>{t("kitchenDisplaySystem")}</p>
                    <p className="text-xs opacity-75">
                      {t("orderManagement")}
                    </p>
                  </div>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    {t("login")}
                  </Button>
                </div>
              </Link>

              {/* Manager Login */}
              <Link href="/login?role=manager" className="block">
                <div className="bg-white border-2 border-border rounded-xl p-8 hover:border-primary transition-all cursor-pointer group h-full flex flex-col justify-between">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-4">👔</div>
                    <h4 className="font-bold text-foreground text-lg">{t("manager")}</h4>
                  </div>
                  <div className="space-y-2 mb-6 text-sm text-muted-foreground text-center">
                    <p>{t("managerDashboardLabel")}</p>
                    <p className="text-xs opacity-75">
                      {t("analyticsReports")}
                    </p>
                  </div>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    {t("login")}
                  </Button>
                </div>
              </Link>

              {/* Admin Login */}
              <Link href="/login?role=admin" className="block">
                <div className="bg-white border-2 border-border rounded-xl p-8 hover:border-primary transition-all cursor-pointer group h-full flex flex-col justify-between">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-4">⚙️</div>
                    <h4 className="font-bold text-foreground text-lg">
                      {t("administrator")}
                    </h4>
                  </div>
                  <div className="space-y-2 mb-6 text-sm text-muted-foreground text-center">
                    <p>{t("menuManagementLabel")}</p>
                    <p className="text-xs opacity-75">
                      {t("systemConfiguration")}
                    </p>
                  </div>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    {t("login")}
                  </Button>
                </div>
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-20 pt-16 border-t border-border">
            <h3 className="text-2xl font-bold text-center text-foreground mb-12">
              {t("keyFeatures")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-secondary rounded-lg">
                <div className="text-4xl mb-4">📱</div>
                <h4 className="font-bold text-foreground mb-2">
                  {t("mobileFirst")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t("optimizedDevices")}
                </p>
              </div>
              <div className="text-center p-6 bg-secondary rounded-lg">
                <div className="text-4xl mb-4">💳</div>
                <h4 className="font-bold text-foreground mb-2">
                  {t("flexiblePayment")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t("qrWalletNfc")}
                </p>
              </div>
              <div className="text-center p-6 bg-secondary rounded-lg">
                <div className="text-4xl mb-4">🤖</div>
                <h4 className="font-bold text-foreground mb-2">
                  {t("aiRecommendationsLabel")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t("personalizedSuggestions")}
                </p>
              </div>
              <div className="text-center p-6 bg-secondary rounded-lg">
                <div className="text-4xl mb-4">⚡</div>
                <h4 className="font-bold text-foreground mb-2">{t("realtime")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("instantUpdates")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
