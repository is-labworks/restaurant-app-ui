"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"
import { menuItemsData } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Minus, Plus, X } from "lucide-react"
import Image from "next/image"

export default function CartPage() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key, language)

  const [items, setItems] = useState(
    menuItemsData[language].map(item => ({ ...item, quantity: 1 }))
  )

  const subtotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const handleQuantityChange = (id: number, change: number) => {
    setItems(
      items
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const handleRemove = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-border z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/customer/menu">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <span className="text-lg">←</span>
            </Button>
          </Link>
          <h1 className="font-semibold text-foreground">{t("shoppingCart")}</h1>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground mb-4">{t("cartEmpty")}</p>
          <Link href="/customer/menu">
            <Button className="bg-primary">{t("continueShopping")}</Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-20 h-20 rounded object-cover bg-muted"
                  />
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "vi" ? `${item.price.toLocaleString()}đ` : `$${item.price.toFixed(2)}`}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-secondary rounded px-2 py-1">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button onClick={() => handleRemove(item.id)} className="text-error hover:text-error/80">
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
            <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("subtotal")}</span>
                  <span className="font-medium text-foreground">
                    {language === "vi" ? `${subtotal.toLocaleString()}đ` : `$${subtotal.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("tax")}</span>
                  <span className="font-medium text-foreground">
                    {language === "vi" ? `${tax.toLocaleString()}đ` : `$${tax.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="font-semibold text-foreground">{t("total")}</span>
                  <span className="font-bold text-lg text-primary">
                    {language === "vi" ? `${total.toLocaleString()}đ` : `$${total.toFixed(2)}`}
                  </span>
                </div>
              </div>
              <Link href="/customer/tracking">
                <Button
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                >
                  {t("placeOrder")}
                </Button>
              </Link>
              <Link href="/customer/menu" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  {t("continueShopping")}
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
