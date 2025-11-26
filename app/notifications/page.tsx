'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { NotificationsPanel, Notification } from '@/components/notifications-panel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertTriangle, AlertCircle, CheckCircle2, Clock, X } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { getTranslation } from '@/lib/i18n'

export default function NotificationsPage() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key, language)

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'shortage',
      title: 'Dự báo thiếu hụt: Húng quế tươi',
      message: 'Húng quế tươi sẽ thiếu hụt trong 3 ngày tới. Nhu cầu dự kiến: 35kg, Tồn kho hiện tại: 8kg.',
      timestamp: '5 phút trước',
      actionLabel: t('viewRequest'),
      onAction: () => window.location.href = '/inventory/replenishment/2',
    },
    {
      id: '2',
      type: 'auto-request',
      title: 'Đã tạo yêu cầu nhập kho mới',
      message: 'Yêu cầu tự động được tạo cho Ức gà. Sẽ thiếu 50 đơn vị trong 4 ngày tới.',
      timestamp: '12 phút trước',
      actionLabel: t('confirmSend'),
      onAction: () => window.location.href = '/inventory/replenishment/1',
    },
    {
      id: '3',
      type: 'shortage',
      title: 'Khẩn cấp: Sốt cà chua',
      message: 'Dự báo thiếu hụt sốt cà chua trong 5 ngày tới. Tồn kho hiện tại không đủ cho nhu cầu cuối tuần.',
      timestamp: '1 giờ trước',
      actionLabel: t('viewDetails'),
      onAction: () => window.location.href = '/inventory/replenishment/3',
    },
    {
      id: '4',
      type: 'info',
      title: 'Yêu cầu nhập kho tự động: Tỏi',
      message: 'AI dự báo đã kích hoạt nhập kho tự động cho tỏi (15 đơn vị). Giao hàng dự kiến trong 2 ngày.',
      timestamp: '2 giờ trước',
      actionLabel: t('viewRequest'),
    },
    {
      id: '5',
      type: 'success',
      title: 'Đã xác nhận nhập kho',
      message: 'Đơn hàng Dầu ô liu (20 đơn vị) của bạn đã được gửi đến nhà cung cấp. Giao hàng dự kiến: 20/01/2024.',
      timestamp: '4 giờ trước',
    },
  ])

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  const shortageNotifications = notifications.filter(n => n.type === 'shortage')
  const requestNotifications = notifications.filter(n => n.type === 'auto-request')
  const otherNotifications = notifications.filter(n => !['shortage', 'auto-request'].includes(n.type))

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">{t('notifications')}</h1>
          <div className="flex items-center gap-4">
            {notifications.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleClearAll}>
                {t('clearAll')}
              </Button>
            )}
            <Link href="/manager">
              <Button variant="outline" size="sm">
                {t('back')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {notifications.length === 0 ? (
          <Card className="p-12 bg-white border-0 shadow-sm text-center">
            <CheckCircle2 size={48} className="text-success mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">{t('allCaughtUp')}</h2>
            <p className="text-muted-foreground mb-6">{t('noNewNotifications')}</p>
            <Link href="/manager">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                {t('backToDashboard')}
              </Button>
            </Link>
          </Card>
        ) : (
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">{t('all')} ({notifications.length})</TabsTrigger>
              <TabsTrigger value="shortage" className="flex items-center gap-2">
                <AlertTriangle size={14} />
                {t('shortageAlert')} ({shortageNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="request" className="flex items-center gap-2">
                <AlertCircle size={14} />
                {t('replenishmentNotification')} ({requestNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="other">{t('other')} ({otherNotifications.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Card className="p-6 bg-white border-0 shadow-sm">
                <NotificationsPanel
                  notifications={notifications}
                  onDismiss={handleDismiss}
                />
              </Card>
            </TabsContent>

            <TabsContent value="shortage">
              <Card className="p-6 bg-white border-0 shadow-sm">
                {shortageNotifications.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle2 size={32} className="text-success mx-auto mb-2" />
                    <p className="text-muted-foreground">{t('noShortageAlerts')}</p>
                  </div>
                ) : (
                  <NotificationsPanel
                    notifications={shortageNotifications}
                    onDismiss={handleDismiss}
                  />
                )}
              </Card>
            </TabsContent>

            <TabsContent value="request">
              <Card className="p-6 bg-white border-0 shadow-sm">
                {requestNotifications.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle2 size={32} className="text-success mx-auto mb-2" />
                    <p className="text-muted-foreground">{t('noReplenishmentRequests')}</p>
                  </div>
                ) : (
                  <NotificationsPanel
                    notifications={requestNotifications}
                    onDismiss={handleDismiss}
                  />
                )}
              </Card>
            </TabsContent>

            <TabsContent value="other">
              <Card className="p-6 bg-white border-0 shadow-sm">
                {otherNotifications.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle2 size={32} className="text-success mx-auto mb-2" />
                    <p className="text-muted-foreground">{t('noOtherNotifications')}</p>
                  </div>
                ) : (
                  <NotificationsPanel
                    notifications={otherNotifications}
                    onDismiss={handleDismiss}
                  />
                )}
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
