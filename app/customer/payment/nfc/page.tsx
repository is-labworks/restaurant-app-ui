"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function NFCPaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <NFCPaymentContent />
    </Suspense>
  )
}

function NFCPaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key, language)

  const total = searchParams.get("total") || "0.00"
  const [isProcessing, setIsProcessing] = useState(false)

  const handleTapCard = async () => {
    setIsProcessing(true)
    // Simulate card tap and payment
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push(`/customer/payment/success?total=${total}&method=nfc`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 border-0 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">{t("nfcCard")}</h1>
          <p className="text-muted-foreground">{t("tapCard")}</p>
        </div>

        {/* Mock NFC Reader */}
        <div className="flex justify-center mb-8">
          <div className="w-40 h-40 bg-white border-4 border-primary rounded-2xl flex items-center justify-center shadow-md animate-pulse">
            <div className="text-center">
              <div className="text-5xl mb-2">📳</div>
              <p className="text-sm font-semibold text-foreground">Ready to Read</p>
            </div>
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
            onClick={handleTapCard}
            disabled={isProcessing}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            {isProcessing ? "Processing..." : "Card Detected"}
          </Button>
          <Button onClick={() => router.back()} variant="outline" className="w-full">
            {t("cancel")}
          </Button>
        </div>
      </Card>
    </div>
  )
}
