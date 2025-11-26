'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { HelpCircle, Save, RotateCcw } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default function AIForecastSettingsPage() {
  const [forecastHorizon, setForecastHorizon] = useState(14)
  const [confidenceThreshold, setConfidenceThreshold] = useState(85)
  const [reorderBuffer, setReorderBuffer] = useState(20)
  const [supplierLeadTime, setSupplierLeadTime] = useState(2)
  const [autoGenerateRequests, setAutoGenerateRequests] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    setForecastHorizon(14)
    setConfidenceThreshold(85)
    setReorderBuffer(20)
    setSupplierLeadTime(2)
    setAutoGenerateRequests(true)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">AI Forecast Configuration</h1>
          <Link href="/inventory">
            <Button variant="outline" size="sm">
              Back
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Info Alert */}
        <Alert className="border-info/20 bg-info/5">
          <HelpCircle className="h-5 w-5 text-info" />
          <AlertDescription className="text-foreground">
            Configure how our AI system forecasts ingredient demand and generates automatic replenishment requests. These settings apply to all ingredients.
          </AlertDescription>
        </Alert>

        {/* Success Message */}
        {saved && (
          <Alert className="border-success/20 bg-success/5">
            <AlertDescription className="text-success font-medium">
              Settings saved successfully!
            </AlertDescription>
          </Alert>
        )}

        {/* Forecast Horizon */}
        <Card className="p-6 bg-white border-0 shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-bold text-foreground text-lg">Forecast Horizon</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="p-1 hover:bg-muted rounded">
                      <HelpCircle size={16} className="text-muted-foreground" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    The number of days ahead to forecast demand. Longer horizons provide better planning but may be less accurate.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {[7, 14, 30].map(days => (
                <button
                  key={days}
                  onClick={() => setForecastHorizon(days)}
                  className={`p-4 rounded border-2 transition-all font-semibold ${
                    forecastHorizon === days
                      ? 'border-primary bg-primary/5 text-foreground'
                      : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {days} Days
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Current selection: {forecastHorizon} days
            </p>
          </div>
        </Card>

        {/* Confidence Threshold */}
        <Card className="p-6 bg-white border-0 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-foreground text-lg">Confidence Threshold</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-1 hover:bg-muted rounded">
                    <HelpCircle size={16} className="text-muted-foreground" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  Minimum confidence level (%) for the AI to automatically generate replenishment requests. Higher values = more conservative recommendations.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label htmlFor="confidence" className="text-sm font-medium">
                Confidence Level
              </Label>
              <span className="text-2xl font-bold text-primary">{confidenceThreshold}%</span>
            </div>

            <input
              id="confidence"
              type="range"
              min="50"
              max="100"
              step="5"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
              className="w-full"
            />

            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>50% (Aggressive)</span>
              <span>75% (Balanced)</span>
              <span>100% (Conservative)</span>
            </div>
          </div>
        </Card>

        {/* Reorder Buffer (Safety Stock) */}
        <Card className="p-6 bg-white border-0 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-foreground text-lg">Reorder Buffer % (Safety Stock)</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-1 hover:bg-muted rounded">
                    <HelpCircle size={16} className="text-muted-foreground" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  Extra percentage of forecasted demand to keep as safety stock. Protects against unexpected demand spikes or supply delays.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center gap-4">
            <Input
              type="number"
              value={reorderBuffer}
              onChange={(e) => setReorderBuffer(parseInt(e.target.value) || 0)}
              min={0}
              max={50}
              className="max-w-32"
            />
            <span className="font-medium text-foreground">%</span>
            <span className="text-sm text-muted-foreground">of forecasted demand</span>
          </div>

          <p className="text-xs text-muted-foreground bg-secondary/30 p-3 rounded">
            Example: If forecasted demand is 100 units with 20% buffer, we'll recommend ordering 120 units.
          </p>
        </Card>

        {/* Supplier Lead Time */}
        <Card className="p-6 bg-white border-0 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-foreground text-lg">Supplier Lead Time</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-1 hover:bg-muted rounded">
                    <HelpCircle size={16} className="text-muted-foreground" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  Average number of days for supplier to deliver. Used to trigger replenishment orders before shortage occurs.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center gap-4">
            <Input
              type="number"
              value={supplierLeadTime}
              onChange={(e) => setSupplierLeadTime(parseInt(e.target.value) || 0)}
              min={0}
              max={14}
              className="max-w-32"
            />
            <span className="font-medium text-foreground">days</span>
          </div>

          <p className="text-xs text-muted-foreground bg-secondary/30 p-3 rounded">
            If shortage predicted in 5 days and lead time is 2 days, order will be triggered in 3 days to ensure on-time delivery.
          </p>
        </Card>

        {/* Auto-Generate Requests Toggle */}
        <Card className="p-6 bg-white border-0 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-foreground text-lg">Auto-Generate Replenishment Requests</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="p-1 hover:bg-muted rounded">
                      <HelpCircle size={16} className="text-muted-foreground" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    When ON: AI automatically creates replenishment requests based on forecast. When OFF: You must manually approve each request.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch
              checked={autoGenerateRequests}
              onCheckedChange={setAutoGenerateRequests}
            />
          </div>

          <div className={`p-3 rounded text-sm ${autoGenerateRequests ? 'bg-success/5 text-success' : 'bg-warning/5 text-warning'}`}>
            {autoGenerateRequests 
              ? 'Automatic mode: Requests will be created and sent to suppliers automatically'
              : 'Manual mode: Requests must be reviewed and approved before sending to suppliers'
            }
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            size="lg"
            onClick={handleSave}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2"
          >
            <Save size={18} />
            Save Settings
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleReset}
            className="gap-2"
          >
            <RotateCcw size={18} />
            Reset to Default
          </Button>
        </div>

        {/* Additional Info */}
        <Alert className="border-border bg-secondary/30">
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
          <AlertDescription className="text-muted-foreground">
            Settings are applied system-wide to all ingredients. Changes take effect immediately for new forecasts.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
