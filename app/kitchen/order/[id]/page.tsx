'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronDown, AlertTriangle, Clock } from 'lucide-react'

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: orderId } = use(params)
  const router = useRouter()
  
  const [itemStatuses, setItemStatuses] = useState({
    'pad-thai': 'preparing',
    'spring-rolls': 'ready',
    'tom-yum': 'queued',
  })

  const handleItemStatusChange = (itemId: string, status: string) => {
    setItemStatuses(prev => ({
      ...prev,
      [itemId]: status,
    }))
  }

  const handleMarkAllReady = () => {
    // Mark all items as ready
    const allReady = Object.keys(itemStatuses).reduce((acc, key) => ({
      ...acc,
      [key]: 'ready'
    }), {} as typeof itemStatuses)
    setItemStatuses(allReady)
    // Navigate back to kitchen after a short delay
    setTimeout(() => router.push('/kitchen'), 500)
  }

  const handleRefresh = () => {
    // Refresh the page
    router.refresh()
  }

  const items = [
    { id: 'pad-thai', name: 'Phở Bò', qty: 1, mods: 'Ít cay' },
    { id: 'spring-rolls', name: 'Gỏi Cuốn', qty: 2 },
    { id: 'tom-yum', name: 'Canh Chua', qty: 1, mods: 'Không hành' },
  ]

  const statusLabels: Record<string, string> = {
    queued: 'Đang chờ',
    preparing: 'Đang chuẩn bị',
    ready: 'Hoàn thành',
    paused: 'Tạm dừng',
  }

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-border z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/kitchen">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="text-lg">←</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-foreground">Đơn hàng #{orderId}</h1>
              <p className="text-sm text-muted-foreground">Hệ thống Hiển thị Nhà bếp</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Bộ đếm thời gian</p>
            <p className="text-xl font-bold text-foreground flex items-center justify-end gap-1">
              <Clock size={16} />
              12:45
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Order Header Info */}
        <Card className="p-4 border-0 bg-white">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bàn:</span>
              <span className="font-semibold">5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Trạng thái:</span>
              <span className="font-semibold text-warning">Đang chuẩn bị</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Thời gian từ khi đặt:</span>
              <span className="font-semibold">12 phút 45 giây</span>
            </div>
          </div>
        </Card>

        {/* Alert Banner */}
        <Card className="p-4 border-l-4 border-warning bg-warning/5">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-warning text-sm">Cảnh báo sắp hết hàng</p>
              <p className="text-xs text-muted-foreground">Nguyên liệu X - Chỉ còn 2 đơn vị</p>
            </div>
          </div>
        </Card>

        {/* Items List */}
        <div className="space-y-3">
          <h2 className="font-bold text-foreground">Món đã đặt</h2>

          {items.map(item => (
            <Card key={item.id} className="p-4 border-0 bg-white">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Số lượng: {item.qty}</p>
                    {item.mods && (
                      <p className="text-xs text-primary mt-1">Ghi chú: {item.mods}</p>
                    )}
                  </div>
                </div>

                {/* Status Dropdown */}
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">Cập nhật trạng thái</label>
                  <Select
                    value={itemStatuses[item.id as keyof typeof itemStatuses]}
                    onValueChange={(value) => handleItemStatusChange(item.id, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="queued">Đang chờ</SelectItem>
                      <SelectItem value="preparing">Đang chuẩn bị</SelectItem>
                      <SelectItem value="ready">Hoàn thành</SelectItem>
                      <SelectItem value="paused">Tạm dừng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Badge */}
                <div className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
                  itemStatuses[item.id as keyof typeof itemStatuses] === 'ready' ? 'bg-success/20 text-success' :
                  itemStatuses[item.id as keyof typeof itemStatuses] === 'preparing' ? 'bg-warning/20 text-warning' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {statusLabels[itemStatuses[item.id as keyof typeof itemStatuses]]}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Assign Station */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Phân công khu vực</label>
          <Select defaultValue="grill">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grill">Nướng</SelectItem>
              <SelectItem value="saute">Xào</SelectItem>
              <SelectItem value="fryer">Chiên</SelectItem>
              <SelectItem value="prep">Sơ chế</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button 
            size="lg" 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            onClick={handleMarkAllReady}
          >
            Đánh dấu tất cả hoàn thành
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => router.push('/kitchen')}
            >
              Tạm dừng tất cả
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleRefresh}
            >
              Làm mới
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => router.push('/kitchen')}
            >
              Đóng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
