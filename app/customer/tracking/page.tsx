"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Clock, ChevronLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"

const trackingSteps = [
  {
    id: "received",
    label: "received",
    time: "12:30 PM",
    description: "orderReceivedDesc",
    completed: true,
    current: false,
  },
  {
    id: "preparing",
    label: "preparing",
    time: "12:35 PM",
    description: "orderPreparingDesc",
    completed: true,
    current: false,
  },
  {
    id: "ready",
    label: "readyForPickup",
    time: "12:45 PM",
    description: "orderReadyDesc",
    completed: false,
    current: true,
  },
  {
    id: "completed",
    label: "completed",
    time: "Expected",
    description: "orderCompletedDesc",
    completed: false,
    current: false,
  },
]

export default function TrackingPage() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key, language)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-border z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/customer/menu">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronLeft size={24} />
            </Button>
          </Link>
          <h1 className="font-semibold text-foreground">{t("orderTracking")}</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Order Info */}
        <Card className="p-4 bg-secondary/30 border-0">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("orderNumber")}:</span>
              <span className="font-semibold text-foreground">ORD-2024-001234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("estimatedTime")}:</span>
              <span className="text-foreground">15 {t("minsRemaining")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("table")}:</span>
              <span className="text-foreground">12</span>
            </div>
          </div>
        </Card>

        {/* Timeline with Details */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">{t("orderProgress")}</h2>

          <div className="space-y-6">
            {trackingSteps.map((step, idx) => (
              <div key={step.id} className="flex gap-4">
                {/* Timeline Dot */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                      step.current
                        ? "bg-primary text-primary-foreground scale-125"
                        : step.completed
                          ? "bg-success text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.completed ? <Check size={16} /> : step.current ? <Clock size={16} /> : idx + 1}
                  </div>
                  {idx < trackingSteps.length - 1 && (
                    <div className={`w-1 h-12 ${step.completed ? "bg-success" : "bg-muted"}`} />
                  )}
                </div>

                {/* Content */}
                <div className="pt-1 pb-4 flex-1">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`font-semibold ${step.completed || step.current ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {t(step.label)}
                    </h3>
                    {step.current && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                        {t("current")}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.time}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t(step.description)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Items */}
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">{t("orderItems")}</h2>
          <Card className="p-4 space-y-3">
            <div className="flex justify-between items-start pb-3 border-b border-border">
              <div>
                <p className="font-medium text-foreground">Phở Bò</p>
                <p className="text-xs text-muted-foreground">Qty: 2 • {t("lessSpice")}</p>
              </div>
              <span className="text-success font-medium">{t("ready")}</span>
            </div>
            <div className="flex justify-between items-start pb-3 border-b border-border">
              <div>
                <p className="font-medium text-foreground">Canh Chua Tôm</p>
                <p className="text-xs text-muted-foreground">Qty: 1 • {t("noOnion")}</p>
              </div>
              <span className="text-warning font-medium">{t("preparing")}</span>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-foreground">Chả Cuốn</p>
                <p className="text-xs text-muted-foreground">Qty: 1</p>
              </div>
              <span className="text-muted-foreground font-medium">{t("queued")}</span>
            </div>
          </Card>
        </div>

        {/* Help Section */}
        <Card className="p-4 bg-primary/10 border-primary/20">
          <p className="text-sm text-foreground font-medium mb-2">{t("needHelp")}</p>
          <p className="text-xs text-muted-foreground mb-3">{t("contactStaff")}</p>
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
            {t("requestAssistance")}
          </Button>
        </Card>
      </div>
    </div>
  )
}
