"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Star } from "lucide-react"

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  )
}

function PaymentSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key, language)

  const total = searchParams.get("total") || "0.00"
  const method = searchParams.get("method") || "card"
  const [showRating, setShowRating] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const invoiceID = `INV-${Date.now()}`

  const handleSubmitRating = () => {
    setSubmitted(true)
    // Save rating to transaction history
    setTimeout(() => {
      router.push("/customer/history")
    }, 2000)
  }

  const handleSkipRating = () => {
    router.push("/customer/history")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      {!showRating ? (
        <Card className="w-full max-w-md p-8 border-0 shadow-lg">
          <div className="text-center mb-8">
            <CheckCircle2 size={64} className="text-success mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">{t("paymentSuccessful")}</h1>
            <p className="text-muted-foreground">{t("transactionConfirmed")}</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground text-sm">{t("total")}</span>
                <span className="font-bold text-xl text-primary">${total}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground text-sm">{t("paymentMethod")}</span>
                <span className="text-sm font-medium capitalize">{method}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">{t("invoiceID")}</span>
                <span className="text-sm font-mono">{invoiceID}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => setShowRating(true)}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              {t("rateExperience")}
            </Button>
            <Button onClick={() => router.push("/customer/menu")} variant="outline" className="w-full">
              {t("backToHome")}
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="w-full max-w-md p-8 border-0 shadow-lg">
          {submitted ? (
            <div className="text-center">
              <CheckCircle2 size={64} className="text-success mx-auto mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-2">{t("ratingSubmitted")}</h2>
              <p className="text-muted-foreground mb-6">Thank you for your feedback!</p>
              <Button
                onClick={() => router.push("/customer/menu")}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {t("backToHome")}
              </Button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6 text-center">{t("rateExperience")}</h2>

              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)} className="transition-transform hover:scale-110">
                    <Star
                      size={32}
                      className={star <= rating ? "fill-warning text-warning" : "text-muted-foreground"}
                    />
                  </button>
                ))}
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t("writeComment")}
                className="w-full p-3 border border-border rounded-lg text-sm mb-6 resize-none"
                rows={3}
              />

              <div className="space-y-3">
                <Button
                  onClick={handleSubmitRating}
                  disabled={rating === 0}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold disabled:opacity-50"
                >
                  {t("submitRating")}
                </Button>
                <Button onClick={handleSkipRating} variant="outline" className="w-full bg-transparent">
                  {t("skipRating")}
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
