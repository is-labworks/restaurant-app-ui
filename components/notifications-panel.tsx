'use client'

import { useState, useEffect } from 'react'
import { X, AlertTriangle, AlertCircle, Info, CheckCircle2, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export interface Notification {
  id: string
  type: 'shortage' | 'auto-request' | 'info' | 'success'
  title: string
  message: string
  timestamp: string
  actionLabel?: string
  onAction?: () => void
}

interface NotificationsPanelProps {
  notifications: Notification[]
  onDismiss: (id: string) => void
  onViewDetails?: (id: string) => void
}

export function NotificationsPanel({ notifications, onDismiss, onViewDetails }: NotificationsPanelProps) {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'shortage':
        return <AlertTriangle size={18} className="text-warning" />
      case 'auto-request':
        return <AlertCircle size={18} className="text-info" />
      case 'info':
        return <Info size={18} className="text-info" />
      case 'success':
        return <CheckCircle2 size={18} className="text-success" />
      default:
        return <Clock size={18} className="text-muted-foreground" />
    }
  }

  const getColors = (type: Notification['type']) => {
    switch (type) {
      case 'shortage':
        return 'bg-warning/5 border-warning/20'
      case 'auto-request':
        return 'bg-info/5 border-info/20'
      case 'info':
        return 'bg-info/5 border-info/20'
      case 'success':
        return 'bg-success/5 border-success/20'
      default:
        return 'bg-muted/5 border-muted/20'
    }
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-8 px-4">
        <CheckCircle2 size={32} className="text-success mx-auto mb-2" />
        <p className="text-muted-foreground">All caught up! No new notifications.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {notifications.map(notification => (
        <div key={notification.id} className={`p-4 rounded-lg border ${getColors(notification.type)} transition-all`}>
          <div className="flex gap-3">
            {getIcon(notification.type)}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-foreground text-sm">{notification.title}</p>
                <button
                  onClick={() => onDismiss(notification.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
              
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                {notification.actionLabel && (
                  <button
                    onClick={() => notification.onAction?.()}
                    className="text-xs font-medium text-primary hover:text-primary/80"
                  >
                    {notification.actionLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
