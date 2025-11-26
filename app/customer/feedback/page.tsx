'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Star, MessageSquare, CheckCircle2 } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

export default function FeedbackPage() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (rating > 0) {
      setSubmitted(true)
      // Simulate form submission
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="p-8 max-w-md w-full text-center space-y-4 border-0 shadow-md">
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Thank You!</h2>
            <p className="text-muted-foreground text-sm">Your feedback has been submitted successfully.</p>
          </div>
          <Link href="/">
            <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Back to Home
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-border z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/customer/confirmation">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <span className="text-lg">←</span>
            </Button>
          </Link>
          <h1 className="font-semibold text-foreground">Order Feedback</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Order Info Card */}
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
              <span className="text-muted-foreground">Time Ordered:</span>
              <span className="text-foreground">12:30 PM</span>
            </div>
          </div>
        </Card>

        {/* Rating Section */}
        <Card className="p-6 border-0 shadow-sm">
          <h2 className="font-semibold text-foreground mb-4">How was your order?</h2>
          
          <div className="flex justify-center gap-3 mb-6">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={32}
                  className={`${
                    star <= (hoveredRating || rating)
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>

          {rating > 0 && (
            <div className="text-center mb-4">
              <p className="text-sm font-medium text-foreground">
                {rating === 5 && "Excellent! We're glad you enjoyed your meal!"}
                {rating === 4 && "Great! Thank you for your feedback."}
                {rating === 3 && "Good! We appreciate your feedback."}
                {rating === 2 && "We're sorry it wasn't perfect. Please let us know how to improve."}
                {rating === 1 && "We apologize for the experience. Your feedback is important to us."}
              </p>
            </div>
          )}
        </Card>

        {/* Comment Section */}
        <Card className="p-6 border-0 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} className="text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Additional Comments (Optional)</h3>
          </div>
          
          <Textarea
            placeholder="Tell us more about your experience... (e.g., food quality, service, wait time)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-24 resize-none"
          />

          <p className="text-xs text-muted-foreground">
            Your feedback helps us improve our service and menu offerings.
          </p>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            Submit Feedback
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg" className="w-full">
              Skip for Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
