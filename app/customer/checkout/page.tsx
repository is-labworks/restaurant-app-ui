'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CreditCard, Wallet, DollarSign } from 'lucide-react'

const subtotal = 21.49
const tax = 1.72
const total = 23.21

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('online')

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-border z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/customer/cart">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <span className="text-lg">←</span>
            </Button>
          </Link>
          <h1 className="font-semibold text-foreground">Checkout</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Order Summary */}
        <Card className="p-4 border-0 bg-secondary/30">
          <h2 className="font-semibold text-foreground mb-3">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Branch:</span>
              <span className="text-foreground">Downtown Restaurant</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Table:</span>
              <span className="text-foreground">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Wait:</span>
              <span className="text-foreground">15 mins</span>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Payment Method</h2>
          
          <div className="space-y-3">
            {/* Online Payment */}
            <Card
              onClick={() => setPaymentMethod('online')}
              className={`p-4 cursor-pointer border-2 transition-colors ${
                paymentMethod === 'online'
                  ? 'border-primary bg-primary/5'
                  : 'border-border'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Pay Online</p>
                  <div className="flex gap-3 mt-2">
                    <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded">
                      <CreditCard size={18} className="text-foreground" />
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded">
                      <Wallet size={18} className="text-foreground" />
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded">
                      <DollarSign size={18} className="text-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Cash Payment */}
            <Card
              onClick={() => setPaymentMethod('cash')}
              className={`p-4 cursor-pointer border-2 transition-colors ${
                paymentMethod === 'cash'
                  ? 'border-primary bg-primary/5'
                  : 'border-border'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Pay on Pickup</p>
                  <p className="text-xs text-muted-foreground mt-1">Pay at the location</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Billing Summary */}
        <Card className="p-4 bg-secondary/30 border-0">
          <h2 className="font-semibold text-foreground mb-3">Billing Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (8%)</span>
              <span className="text-foreground">${tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-lg text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <Link href="/customer/confirmation" className="block">
            <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold mb-2">
              Confirm Order
            </Button>
          </Link>
          <Link href="/customer/cart" className="block">
            <Button variant="outline" size="lg" className="w-full">
              Back to Cart
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
