'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { TrendingDown, Package, AlertTriangle, AreaChart, BarChart3, Settings } from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// Forecast data
const forecastData = [
  { day: 'Day 1', forecasted: 45, current: 50, shortage: 0 },
  { day: 'Day 2', forecasted: 48, current: 50, shortage: 0 },
  { day: 'Day 3', forecasted: 52, current: 45, shortage: 7 },
  { day: 'Day 4', forecasted: 55, current: 40, shortage: 15 },
  { day: 'Day 5', forecasted: 58, current: 35, shortage: 23 },
  { day: 'Day 6', forecasted: 60, current: 30, shortage: 30 },
  { day: 'Day 7', forecasted: 62, current: 25, shortage: 37 },
]

// Replenishment requests
const replenishmentRequests = [
  { id: 1, ingredient: 'Chicken Breast', predictedShortage: 50, predictedDay: 4, status: 'Pending', priority: 'High' },
  { id: 2, ingredient: 'Fresh Basil', predictedShortage: 25, predictedDay: 3, status: 'Confirmed', priority: 'Critical' },
  { id: 3, ingredient: 'Tomato Sauce', predictedShortage: 40, predictedDay: 5, status: 'Pending', priority: 'High' },
  { id: 4, ingredient: 'Garlic', predictedShortage: 15, predictedDay: 6, status: 'Pending', priority: 'Medium' },
  { id: 5, ingredient: 'Olive Oil', predictedShortage: 20, predictedDay: 7, status: 'Pending', priority: 'Medium' },
]

export default function InventoryDashboard() {
  const inventoryValue = '$12,450.00'
  const forecastDemand = 'Next 14 Days: 485 units'
  const predictedShortage = 'Fresh Basil, Chicken, Tomato Sauce'

  const statusColor = {
    Pending: 'bg-warning/5 border-warning/20 text-warning',
    Confirmed: 'bg-success/5 border-success/20 text-success',
    Rejected: 'bg-error/5 border-error/20 text-error',
  }

  const priorityColor = {
    Critical: 'text-error font-semibold',
    High: 'text-warning font-semibold',
    Medium: 'text-info font-semibold',
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">AI Inventory Dashboard</h1>
          <div className="flex items-center gap-4">
            <Link href="/inventory/settings">
              <Button variant="outline" size="sm" className="gap-2">
                <Settings size={16} />
                Configure AI
              </Button>
            </Link>
            <Link href="/manager">
              <Button variant="outline" size="sm">
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 bg-white border-0 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package size={24} className="text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-medium mb-1">Current Inventory Value</p>
            <p className="text-2xl font-bold text-foreground">{inventoryValue}</p>
            <p className="text-xs text-muted-foreground mt-2">All ingredients combined</p>
          </Card>

          <Card className="p-6 bg-white border-0 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-info/10 rounded-lg">
                <AreaChart size={24} className="text-info" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-medium mb-1">Forecasted Demand</p>
            <p className="text-2xl font-bold text-foreground">485 units</p>
            <p className="text-xs text-muted-foreground mt-2">Next 14 days</p>
          </Card>

          <Card className="p-6 bg-white border-0 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-error/10 rounded-lg">
                <AlertTriangle size={24} className="text-error" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-medium mb-1">Predicted Shortage Items</p>
            <p className="text-lg font-bold text-error">3 items</p>
            <p className="text-xs text-muted-foreground mt-2">Action needed</p>
          </Card>
        </div>

        {/* Forecast Chart */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <h2 className="font-bold text-foreground mb-4">Forecasted Demand vs Current Stock (7-14 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsAreaChart data={forecastData}>
              <defs>
                <linearGradient id="colorForecasted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--color-primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--color-primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--color-warning))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--color-warning))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="forecasted"
                stroke="hsl(var(--color-primary))"
                fillOpacity={1}
                fill="url(#colorForecasted)"
                name="Forecasted Demand"
              />
              <Area
                type="monotone"
                dataKey="current"
                stroke="hsl(var(--color-warning))"
                fillOpacity={1}
                fill="url(#colorCurrent)"
                name="Current Stock"
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Replenishment Requests */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <h2 className="font-bold text-foreground mb-4">Auto Replenishment Requests</h2>

          {/* Alert */}
          <Alert className="mb-6 border-warning/20 bg-warning/5">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertDescription className="text-warning">
              2 items have critical shortage predictions. Review and confirm requests below.
            </AlertDescription>
          </Alert>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Ingredient</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Predicted Shortage</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Shortage in (Days)</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Priority</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {replenishmentRequests.map(request => (
                  <tr key={request.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{request.ingredient}</td>
                    <td className="py-3 px-4 text-foreground">{request.predictedShortage} units</td>
                    <td className="py-3 px-4 text-foreground">~{request.predictedDay} days</td>
                    <td className={`py-3 px-4 ${priorityColor[request.priority]}`}>{request.priority}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded text-xs font-medium border ${statusColor[request.status]}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Link href={`/inventory/replenishment/${request.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
