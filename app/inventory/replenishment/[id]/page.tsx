"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Check, X, Lightbulb } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { getTranslation } from "@/lib/i18n";

// Mock data - in real app, fetch based on [id]
const replenishmentData = {
  id: 2,
  ingredient: "Fresh Basil",
  currentStock: 8,
  currentStockUnit: "kg",
  forecastedNeed: 35,
  forecastedNeedUnit: "kg",
  daysUntilShortage: 3,
  suggestedOrderQuantity: 50,
  maxStorageCapacity: 60,
  supplierLeadTime: 2,
  priority: "Critical",
  lastRestockDate: "2024-01-15",
};

export default function ReplenishmentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);
  const [orderQuantity, setOrderQuantity] = useState(
    replenishmentData.suggestedOrderQuantity
  );
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<
    "idle" | "confirming" | "confirmed" | "rejected"
  >("idle");

  const shortageIn = replenishmentData.daysUntilShortage;
  const daysUntilEmpty = Math.max(
    0,
    shortageIn - replenishmentData.supplierLeadTime
  );

  const handleConfirm = () => {
    setStatus("confirming");
    setTimeout(() => {
      setStatus("confirmed");
    }, 1500);
  };

  const handleReject = () => {
    setStatus("rejected");
  };

  if (status === "confirmed") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="p-8 max-w-md w-full text-center space-y-4 border-0 shadow-md">
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full">
              <Check className="w-8 h-8 text-success" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              {t("requestConfirmed")}
            </h2>
            <p className="text-muted-foreground text-sm">
              {t("replenishmentRequestSent").replace(
                "{ingredient}",
                replenishmentData.ingredient
              )}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {t("expectedDelivery")}:{" "}
              {t("inDays").replace(
                "{days}",
                replenishmentData.supplierLeadTime.toString()
              )}
            </p>
          </div>
          <Link href="/inventory">
            <Button
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {t("backToInventory")}
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="p-8 max-w-md w-full text-center space-y-4 border-0 shadow-md">
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-error/10 rounded-full">
              <X className="w-8 h-8 text-error" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Request Rejected
            </h2>
            <p className="text-muted-foreground text-sm">
              Replenishment request has been rejected.
            </p>
          </div>
          <Link href="/inventory">
            <Button
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Back to Inventory
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            Replenishment Request Details
          </h1>
          <Link href="/inventory">
            <Button variant="outline" size="sm">
              Back
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Critical Alert */}
        {replenishmentData.priority === "Critical" && (
          <Alert className="border-error/20 bg-error/5">
            <AlertTriangle className="h-5 w-5 text-error" />
            <AlertDescription className="text-error font-medium">
              CRITICAL PRIORITY: {replenishmentData.ingredient} shortage
              predicted in {shortageIn} days. Order immediately to avoid
              stockout.
            </AlertDescription>
          </Alert>
        )}

        {/* Ingredient Overview */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <h2 className="font-bold text-foreground text-lg mb-6">
            Ingredient Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="pb-4 border-b border-border">
                <p className="text-xs text-muted-foreground font-medium mb-1">
                  Ingredient Name
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {replenishmentData.ingredient}
                </p>
              </div>

              <div className="pb-4 border-b border-border">
                <p className="text-xs text-muted-foreground font-medium mb-1">
                  Current Stock
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {replenishmentData.currentStock}{" "}
                  {replenishmentData.currentStockUnit}
                </p>
              </div>

              <div className="pb-4 border-b border-border">
                <p className="text-xs text-muted-foreground font-medium mb-1">
                  Last Restock Date
                </p>
                <p className="text-sm text-foreground">
                  {replenishmentData.lastRestockDate}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="pb-4 border-b border-border">
                <p className="text-xs text-muted-foreground font-medium mb-1">
                  Forecasted Need (Next 7-14 days)
                </p>
                <p className="text-lg font-semibold text-warning">
                  {replenishmentData.forecastedNeed}{" "}
                  {replenishmentData.forecastedNeedUnit}
                </p>
              </div>

              <div className="pb-4 border-b border-border">
                <p className="text-xs text-muted-foreground font-medium mb-1">
                  Predicted Shortage In
                </p>
                <p className="text-lg font-semibold text-error">
                  ~{shortageIn} days
                </p>
              </div>

              <div className="pb-4 border-b border-border">
                <p className="text-xs text-muted-foreground font-medium mb-1">
                  Supplier Lead Time
                </p>
                <p className="text-sm text-foreground">
                  {replenishmentData.supplierLeadTime} days
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Forecast Explanation */}
        <Alert className="border-info/20 bg-info/5">
          <Lightbulb className="h-5 w-5 text-info" />
          <AlertDescription className="text-foreground">
            <strong>AI Forecast Insight:</strong> Based on demand pattern,{" "}
            {replenishmentData.ingredient} will be short in {shortageIn} days.
            With {replenishmentData.supplierLeadTime}-day lead time, ordering
            now ensures stock arrives{" "}
            {daysUntilEmpty > 0
              ? `${daysUntilEmpty} days before shortage`
              : "just in time"}
            .
          </AlertDescription>
        </Alert>

        {/* Order Configuration */}
        <Card className="p-6 bg-white border-0 shadow-sm space-y-6">
          <h2 className="font-bold text-foreground text-lg">
            Order Configuration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Suggested Order */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                AI Suggested Order Quantity
              </label>
              <div className="p-3 bg-primary/5 rounded border border-primary/10">
                <p className="text-lg font-bold text-primary">
                  {replenishmentData.suggestedOrderQuantity}{" "}
                  {replenishmentData.currentStockUnit}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  (Covers demand +{" "}
                  {replenishmentData.suggestedOrderQuantity -
                    replenishmentData.forecastedNeed}{" "}
                  units safety stock)
                </p>
              </div>
            </div>

            {/* Storage Capacity */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Max Storage Capacity
              </label>
              <div className="p-3 bg-secondary/30 rounded border border-border">
                <p className="text-lg font-bold text-foreground">
                  {replenishmentData.maxStorageCapacity}{" "}
                  {replenishmentData.currentStockUnit}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  (After order:{" "}
                  {replenishmentData.currentStock +
                    replenishmentData.suggestedOrderQuantity}{" "}
                  {replenishmentData.currentStockUnit})
                </p>
              </div>
            </div>
          </div>

          {/* Order Quantity Input */}
          <div>
            <label
              htmlFor="orderQty"
              className="text-sm font-semibold text-foreground mb-2 block"
            >
              Confirm Order Quantity
            </label>
            <div className="flex gap-2">
              <Input
                id="orderQty"
                type="number"
                value={orderQuantity}
                onChange={(e) =>
                  setOrderQuantity(parseInt(e.target.value) || 0)
                }
                min={0}
                max={
                  replenishmentData.maxStorageCapacity -
                  replenishmentData.currentStock
                }
                className="flex-1"
              />
              <span className="flex items-center px-3 py-2 bg-muted rounded text-sm font-medium text-foreground">
                {replenishmentData.currentStockUnit}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Max available storage:{" "}
              {replenishmentData.maxStorageCapacity -
                replenishmentData.currentStock}{" "}
              {replenishmentData.currentStockUnit}
            </p>
          </div>
        </Card>

        {/* Notes Section */}
        <Card className="p-6 bg-white border-0 shadow-sm space-y-4">
          <h2 className="font-bold text-foreground text-lg">
            Admin Notes (Optional)
          </h2>
          <Textarea
            placeholder="Add any special instructions or notes for the warehouse team..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-24 resize-none"
          />
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            size="lg"
            onClick={handleConfirm}
            disabled={status === "confirming"}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold disabled:opacity-50"
          >
            {status === "confirming"
              ? "Confirming..."
              : "Confirm & Send to Supplier"}
          </Button>
          <Button size="lg" variant="outline" onClick={handleReject}>
            Reject Request
          </Button>
        </div>
      </div>
    </div>
  );
}
