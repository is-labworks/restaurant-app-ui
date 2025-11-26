'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check, Clock, ChefHat, UtensilsCrossed, CheckCircle2 } from 'lucide-react'

const statusSteps = [
  { id: 'received', label: 'Received', time: '12:30 PM', description: 'Order received', completed: true, current: true },
  { id: 'preparing', label: 'Preparing', time: 'Expected', description: 'Chef is working on your order', completed: false, current: false },
  { id: 'ready', label: 'Ready for Pickup', time: 'Expected', description: 'Your order will be ready soon', completed: false, current: false },
  { id: 'completed', label: 'Completed', time: 'Expected', description: 'Order marked complete', completed: false, current: false },
]

export default function ConfirmationPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState(statusSteps)

  // Simulate order progress
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < 3) {
          return prev + 1
        }
        return prev
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Update steps based on current step
  useEffect(() => {
    setSteps(prevSteps =>
      prevSteps.map((step, idx) => ({
        ...step,
        completed: idx < currentStep,
        current: idx === currentStep,
        time: idx === 0 ? '12:30 PM' : idx <= currentStep ? `12:${30 + idx * 5} PM` : 'Expected',
      }))
    )
  }, [currentStep])

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Close Button */}
      <div className="sticky top-0 bg-white border-b border-border z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-end">
          <Link href="/">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <span className="text-lg">✕</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Success Message */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Order Confirmed</h1>
            <p className="text-muted-foreground">Thank you! Your order has been confirmed.</p>
          </div>
        </div>

        {/* Order Details */}
        <Card className="p-4 bg-secondary/30 border-0">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order #:</span>
              <span className="font-semibold text-foreground">ORD-2024-001234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Branch:</span>
              <span className="text-foreground">Downtown Restaurant</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Table:</span>
              <span className="text-foreground">12</span>
            </div>
          </div>
        </Card>

        {/* Track Status Button */}
        <Link href="/customer/feedback" className="block">
          <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
            Submit Feedback
          </Button>
        </Link>

        {/* Timeline */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Live Update Timeline</h2>
          
          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex gap-4">
                {/* Timeline Dot */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                      step.current
                        ? 'bg-primary text-primary-foreground scale-125'
                        : step.completed
                        ? 'bg-success text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step.completed ? <Check size={16} /> : step.current ? <Clock size={16} /> : idx + 1}
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`w-1 h-12 ${
                        step.completed ? 'bg-success' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pt-1 pb-4">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold ${step.completed || step.current ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.label}
                    </h3>
                    {step.current && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">Current</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.time}</p>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-center gap-8 pt-4 border-t border-border text-xs">
          <Link href="/">
            <button className="text-primary hover:text-primary/80 font-medium">Home</button>
          </Link>
          <button className="text-primary font-medium">Orders</button>
          <button className="text-muted-foreground hover:text-foreground font-medium">Profile</button>
        </div>
      </div>
    </div>
  )
}
