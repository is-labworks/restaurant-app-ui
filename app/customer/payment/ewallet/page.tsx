"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function EWalletPaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <EWalletPaymentContent />
    </Suspense>
  )
}

function EWalletPaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key, language)

  const total = searchParams.get("total") || "0.00"
  const [isProcessing, setIsProcessing] = useState(false)

  const handleOpenWallet = async () => {
    setIsProcessing(true)
    // Simulate wallet opening and payment
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push(`/customer/payment/success?total=${total}&method=ewallet`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 border-0 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">{t("eWallet")}</h1>
          <p className="text-muted-foreground">{t("openWallet")}</p>
        </div>

        {/* Mock E-Wallet Interface */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-xs bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm opacity-90 mb-2">E-Wallet</div>
            <div className="text-2xl font-bold mb-4">💰</div>
            <div className="text-lg font-semibold mb-1">Payment Ready</div>
            <div className="text-sm opacity-90">Amount: ${total}</div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm text-foreground text-center">
            <strong>Total Amount:</strong>
            <br />
            <span className="text-lg font-bold text-primary">${total}</span>
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleOpenWallet}
            disabled={isProcessing}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            {isProcessing ? "Processing..." : t("openWallet")}
          </Button>
          <Button onClick={() => router.back()} variant="outline" className="w-full">
            {t("back")}
          </Button>
        </div>
      </Card>
    </div>
  )
}
