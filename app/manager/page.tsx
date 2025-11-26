"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  AlertCircle,
  Bell,
  Zap,
  Package,
  BarChart3,
  Star,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"
import { revenueTrend7Days } from "@/lib/revenue-data"

export default function ManagerDashboard() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key, language)

  const kpis = [
    {
      icon: ShoppingCart,
      label: t("todaysOrders"),
      value: "48",
      change: "+12%",
      changeText: t("vsYesterday"),
    },
    {
      icon: DollarSign,
      label: t("revenue"),
      value: "5.200.000đ",
      change: "+8%",
      changeText: t("vsYesterday"),
    },
    {
      icon: Users,
      label: t("customerSatisfaction"),
      value: "94.2%",
      change: "CSAT",
    },
    {
      icon: TrendingUp,
      label: t("itemsSold"),
      value: "156",
      change: "+5%",
      changeText: t("vsYesterday"),
    },
  ]

  const topItems = [
    { rank: 1, name: "Phở Bò", units: 35 },
    { rank: 2, name: "Mì Hoành Thánh", units: 28 },
    { rank: 3, name: "Chả Cuốn", units: 22 },
    { rank: 4, name: "Satay Gà", units: 18 },
    { rank: 5, name: "Cơm Gà Xối Mỡ", units: 15 },
  ]

  const recentFeedback = [
    { customer: "Nguyễn A", rating: 5, comment: "Phở rất ngon!", time: "10 phút trước", dish: "Phở Bò" },
    {
      customer: "Trần B",
      rating: 4,
      comment: "Dịch vụ tốt, món ăn hơi lâu",
      time: "25 phút trước",
      dish: "Mì Hoành Thánh",
    },
    { customer: "Lê C", rating: 5, comment: "Tuyệt vời! Sẽ quay lại", time: "1 giờ trước", dish: "Chả Cuốn" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">{t("managerDashboard")}</h1>
          <div className="flex items-center gap-4">
            <Link href="/notifications">
              <button className="p-2 hover:bg-muted rounded transition-colors relative">
                <Bell size={20} className="text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
              </button>
            </Link>
            <Button variant="outline" size="sm">
              {t("profile")}
            </Button>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon
            return (
              <Card key={idx} className="p-6 bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon size={24} className="text-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-medium mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-foreground mb-2">{kpi.value}</p>
                <p className="text-xs text-success font-medium">
                  {kpi.change} {kpi.changeText}
                </p>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6 bg-white border-0 shadow-sm">
            <h2 className="font-bold text-foreground mb-4">{t("revenueTrend")}</h2>
            <div className="h-48 flex items-end justify-between gap-2">
              {revenueTrend7Days.map((item) => {
                const maxRevenue = Math.max(...revenueTrend7Days.map((d) => d.revenue))
                const height = (item.revenue / maxRevenue) * 100
                const formattedValue = `${(item.revenue / 1000000).toFixed(1)}tr`
                
                return (
                  <div key={item.day} className="flex-1 flex flex-col items-center group relative">
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-black text-white text-xs px-2 py-1 rounded transition-opacity">
                      {formattedValue}
                    </div>
                    <div
                      className="w-full bg-primary rounded-t transition-all hover:bg-primary/90 hover:opacity-80"
                      style={{ height: `${height}%` }}
                    />
                    <p className="text-xs text-muted-foreground mt-2">{item.day}</p>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Top Items */}
          <Card className="p-6 bg-white border-0 shadow-sm">
            <h2 className="font-bold text-foreground mb-4">{t("topItemsSold")}</h2>
            <div className="space-y-3">
              {topItems.map((item) => (
                <div key={item.rank} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {item.rank}
                    </div>
                    <span className="text-sm text-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{item.units}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Predicted Bestsellers */}
          <Card className="p-6 bg-white border-0 shadow-sm">
            <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-success" />
              {t("predictedBestsellers")}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                <div className="text-2xl">🍲</div>
                <div>
                  <p className="font-semibold text-sm">Phở Đặc Biệt</p>
                  <p className="text-xs text-muted-foreground">Dự báo tăng 15% vào cuối tuần</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                <div className="text-2xl">🦐</div>
                <div>
                  <p className="font-semibold text-sm">Gỏi Cuốn Tôm</p>
                  <p className="text-xs text-muted-foreground">Xu hướng ăn nhẹ buổi chiều</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-2 p-6 bg-white border-0 shadow-sm">
            <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Star size={20} className="text-warning fill-warning" />
              {t("recentFeedback")}
            </h2>
            <div className="space-y-4">
              {recentFeedback.map((feedback, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                        {feedback.customer.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{feedback.customer}</p>
                        <p className="text-xs text-muted-foreground">{feedback.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(feedback.rating)].map((_, i) => (
                        <Star key={i} size={14} className="text-warning fill-warning" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-foreground mb-1">{feedback.comment}</p>
                  <p className="text-xs text-primary font-medium">{feedback.dish}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Staff Performance */}
          <Card className="p-6 bg-white border-0 shadow-sm">
            <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Users size={20} className="text-primary" />
              {t("staffPerformance")}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    A
                  </div>
                  <div>
                    <p className="font-medium text-sm">Nguyễn Văn A</p>
                    <p className="text-xs text-muted-foreground">{t("topStaff")}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-success text-sm">48</p>
                  <p className="text-xs text-muted-foreground">{t("ordersCompleted")}</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-muted-foreground">
                    B
                  </div>
                  <div>
                    <p className="font-medium text-sm">Trần Thị B</p>
                    <p className="text-xs text-muted-foreground">Bếp chính</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground text-sm">35</p>
                  <p className="text-xs text-muted-foreground">{t("ordersCompleted")}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Alerts */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={20} className="text-warning" />
            <h2 className="font-bold text-foreground">{t("alertsNotifications")}</h2>
          </div>

          <div className="space-y-3">
            {/* Inventory Warning */}
            <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-warning text-sm">{t("inventoryWarning")}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("lowStockBeef")}</p>
                </div>
                <button className="text-xs text-muted-foreground hover:text-foreground">{t("dismiss")}</button>
              </div>
            </div>

            {/* Promo Active */}
            <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-success text-sm">{t("promoActive")}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("happyHour")}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("ordersWithPromo")}</p>
                </div>
                <button className="text-xs text-primary hover:text-primary/80">{t("viewDetails")}</button>
              </div>
            </div>

            {/* Staffing Alert */}
            <div className="p-4 bg-error/5 border border-error/20 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-error text-sm">{t("staffingAlert")}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("chefOutOfShift")}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/inventory" className="block">
            <Button variant="outline" className="w-full justify-start bg-transparent" size="lg">
              <Package size={18} className="mr-2" />
              {t("aiInventory")}
            </Button>
          </Link>
          <Link href="/admin/menu" className="block">
            <Button variant="outline" className="w-full justify-start bg-transparent" size="lg">
              <Zap size={18} className="mr-2" />
              {t("manageMenu")}
            </Button>
          </Link>
          <Link href="/admin/users" className="block">
            <Button variant="outline" className="w-full justify-start bg-transparent" size="lg">
              <Users size={18} className="mr-2" />
              {t("staffManagement")}
            </Button>
          </Link>
          <Button variant="outline" className="w-full justify-start bg-transparent" size="lg">
            <BarChart3 size={18} className="mr-2" />
            {t("generateReports")}
          </Button>
        </div>
      </div>
    </div>
  )
}
