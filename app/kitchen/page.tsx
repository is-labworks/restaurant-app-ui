"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, RefreshCw, AlertCircle, Package, TrendingDown, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"

const mockOrders = [
  {
    id: 1234,
    table: 5,
    time: "03:15",
    status: "new",
    items: [
      { name: "Phở Bò", qty: 1 },
      { name: "Chả Cuốn", qty: 2 },
    ],
  },
  {
    id: 1235,
    table: 8,
    time: "08:20",
    status: "new",
    items: [
      { name: "Mì Hoành Thánh", qty: 2 },
      { name: "Satay Gà", qty: 1 },
      { name: "Cơm Trắng", qty: 1 },
    ],
  },
  {
    id: 1236,
    table: 12,
    time: "13:45",
    status: "preparing",
    items: [
      { name: "Cơm Gà Xối Mỡ", qty: 1 },
      { name: "Canh Chua Cá", qty: 1 },
    ],
  },
  {
    id: 1237,
    table: 2,
    time: "25:32",
    status: "overdue",
    items: [
      { name: "Bún Chả", qty: 2 },
      { name: "Cơm Bò Cuốn Lá", qty: 1 },
    ],
  },
]

const statusConfig = {
  new: { label: "Mới", color: "bg-success", textColor: "text-success", icon: "🟢" },
  preparing: { label: "Đang chế biến", color: "bg-warning", textColor: "text-warning", icon: "🟡" },
  ready: { label: "Hoàn thành", color: "bg-info", textColor: "text-info", icon: "🔵" },
  overdue: { label: "Quá hạn", color: "bg-error", textColor: "text-error", icon: "🔴" },
}

export default function KDSPage() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key, language)
  const [filter, setFilter] = useState("all")
  const [orders, setOrders] = useState(mockOrders)
  const [showInventory, setShowInventory] = useState(false)

  const handleOrderStatusChange = (orderId: number, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const filterTabs = ["all", "new", "preparing", "ready", "overdue"]
  const filteredOrders = filter === "all" ? orders : orders.filter((o) => o.status === filter)

  const filterLabels: Record<string, string> = {
    all: language === "vi" ? "Tất cả" : "All Orders",
    new: language === "vi" ? "Mới" : "New",
    preparing: language === "vi" ? "Đang chế biến" : "Preparing",
    ready: language === "vi" ? "Hoàn thành" : "Ready",
    overdue: language === "vi" ? "Quá hạn" : "Overdue",
  }

  const inventoryItems = [
    { name: "Thịt Bò", level: 15, status: "critical", prediction: "Hết trong 2h" },
    { name: "Bánh Phở", level: 40, status: "warning", prediction: "Hết trong 5h" },
    { name: "Tôm", level: 80, status: "good", prediction: "Đủ cho 2 ngày" },
    { name: "Gà", level: 60, status: "good", prediction: "Đủ cho 1.5 ngày" },
  ]

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-border z-10 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-primary">🍳</div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {language === "vi" ? "Hệ thống Hiển thị Nhà bếp" : "Kitchen Display System"}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {language === "vi" ? "Quản lý các đơn hàng" : "Manage orders"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={showInventory ? "default" : "outline"}
                onClick={() => setShowInventory(!showInventory)}
                className="gap-2"
              >
                {showInventory ? <ArrowLeft size={16} /> : <Package size={16} />}
                {showInventory ? (language === "vi" ? "Quay lại" : "Back") : t("inventoryForecast")}
              </Button>
              <button className="p-2 hover:bg-muted rounded transition-colors">
                <RefreshCw size={20} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Filter Tabs - Hide when showing inventory */}
          {!showInventory && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${
                    filter === tab
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  {filterLabels[tab]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {showInventory ? (
          /* Inventory Forecast View with AI Alerts */
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="text-primary" />
              <h2 className="text-xl font-bold">
                {t("inventoryForecast")} & {t("aiInsights")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inventoryItems.map((item, idx) => (
                <Card
                  key={idx}
                  className="p-5 border-l-4"
                  style={{
                    borderLeftColor:
                      item.status === "critical" ? "#ef4444" : item.status === "warning" ? "#f59e0b" : "#22c55e",
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    {item.status === "critical" && (
                      <span className="bg-error/10 text-error text-xs px-2 py-1 rounded font-bold flex items-center gap-1">
                        <AlertCircle size={12} /> {t("lowStockWarning")}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-black">{t("inventoryLevel")}</span>
                        <span className="font-medium">{item.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.status === "critical"
                              ? "bg-error"
                              : item.status === "warning"
                                ? "bg-warning"
                                : "bg-success"
                          }`}
                          style={{ width: `${item.level}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-primary/5 p-3 rounded text-sm text-black flex items-center gap-2">
                      <span className="text-lg">🤖</span>
                      <span className="font-medium">
                        {t("aiInsights")}: {item.prediction}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Orders Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map((order) => {
              const config = statusConfig[order.status as keyof typeof statusConfig]
              const isOverdue = order.status === "overdue"

              return (
                <Link key={order.id} href={`/kitchen/order/${order.id}`}>
                  <Card
                    className={`p-4 cursor-pointer hover:shadow-lg transition-all border-2 ${
                      isOverdue ? "border-error/30 bg-error/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground">
                          {language === "vi" ? "Đơn hàng" : "Order"} #{order.id}
                        </p>
                        <p className="text-lg font-bold text-foreground">
                          {language === "vi" ? "Bàn" : "Table"}: {order.table}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{language === "vi" ? "Thời gian" : "Time"}</p>
                        <p className="text-lg font-bold text-foreground flex items-center gap-1 justify-end">
                          <Clock size={14} />
                          {order.time}
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="mb-3 pb-3 border-b border-border">
                      {order.items.map((item, idx) => (
                        <p key={idx} className="text-sm text-foreground">
                          • {item.name} x{item.qty}
                        </p>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mb-3">
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          handleOrderStatusChange(order.id, "preparing")
                        }}
                        size="sm"
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
                      >
                        {language === "vi" ? "Bắt đầu" : "Start"}
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          handleOrderStatusChange(order.id, "ready")
                        }}
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs"
                      >
                        {language === "vi" ? "Hoàn thành" : "Ready"}
                      </Button>
                    </div>

                    {/* Status Badge */}
                    <div className={`px-3 py-2 rounded ${config.color} text-white text-center text-xs font-semibold`}>
                      {language === "vi" ? config.label : config.label}
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}

        {!showInventory && filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {language === "vi" ? "Không có đơn hàng nào trong danh mục này" : "No orders in this category"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
