'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function QRLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full">
            <svg className="w-8 h-8 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.5 1.5H2a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h16a.5.5 0 0 0 .5-.5V9" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="14" cy="4" r="2" fill="currentColor" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Downtown Restaurant</h1>
          <p className="text-sm text-muted-foreground">Ready to order?</p>
        </div>

        {/* Restaurant Image */}
        <Card className="overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-20 h-20 mx-auto text-primary/30" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
              </svg>
              <p className="text-muted-foreground text-sm mt-2">Fine Dining Experience</p>
            </div>
          </div>
        </Card>

        {/* Order Details */}
        <Card className="p-4 bg-white border border-border">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Branch:</span>
              <span className="font-semibold text-foreground">Downtown Location</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Table #:</span>
              <span className="font-semibold text-foreground">12</span>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Link href="/customer/menu" className="block">
            <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              Start Order
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="w-full">
            Continue Shopping
          </Button>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-center gap-8 pt-4 border-t border-border text-xs">
          <button className="text-primary hover:text-primary/80 font-medium">Home</button>
          <button className="text-muted-foreground hover:text-foreground font-medium">Cart (0)</button>
          <button className="text-muted-foreground hover:text-foreground font-medium">Profile</button>
        </div>
      </div>
    </div>
  )
}
