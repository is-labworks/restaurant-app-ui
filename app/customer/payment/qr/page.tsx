"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function QRPaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <QRPaymentContent />
    </Suspense>
  )
}

function QRPaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key, language)

  const total = searchParams.get("total") || "0.00"
  const [isProcessing, setIsProcessing] = useState(false)

  const handleConfirmPayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push(`/customer/payment/success?total=${total}&method=qr`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 border-0 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">{t("qrCode")}</h1>
          <p className="text-muted-foreground">{t("scanQR")}</p>
        </div>

        {/* Mock QR Code */}
        <div className="flex justify-center mb-8">
          <div className="w-48 h-48 bg-white border-4 border-primary rounded-lg flex items-center justify-center shadow-md">
            <div className="text-center">
              <div className="text-4xl mb-2">█▄███</div>
              <div className="text-4xl mb-2">███▄</div>
              <div className="text-4xl mb-2">▄███</div>
              <p className="text-xs text-muted-foreground mt-4">Amount: ${total}</p>
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
            onClick={handleConfirmPayment}
            disabled={isProcessing}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            {isProcessing ? "Processing..." : "Payment Confirmed"}
          </Button>
          <Button onClick={() => router.back()} variant="outline" className="w-full">
            {t("back")}
          </Button>
        </div>
      </Card>
    </div>
  )
}
