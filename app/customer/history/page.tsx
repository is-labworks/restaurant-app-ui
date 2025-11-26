'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { getTranslation } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'

const mockTransactions = [
  {
    id: 'INV-1734567890',
    date: '2024-12-19',
    time: '14:30',
    amount: 24.49,
    method: 'QR Code',
    status: 'Successful',
    items: 'Pad Thai x2, Tom Yum Soup x1, Spring Rolls x1'
  },
  {
    id: 'INV-1734481490',
    date: '2024-12-18',
    time: '12:15',
    amount: 18.99,
    method: 'E-Wallet',
    status: 'Successful',
    items: 'Green Curry x1, Mango Sticky Rice x1'
  },
  {
    id: 'INV-1734395090',
    date: '2024-12-17',
    time: '19:45',
    amount: 42.75,
    method: 'NFC Card',
    status: 'Successful',
    items: 'Multiple Items'
  },
]

export default function TransactionHistoryPage() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key, language)

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-border z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/customer/menu">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronLeft size={20} />
            </Button>
          </Link>
          <h1 className="font-semibold text-foreground">{t('transactionHistory')}</h1>
        </div>
      </div>

      {/* Transactions */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {mockTransactions.map(transaction => (
          <Card key={transaction.id} className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold text-foreground">{transaction.items}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {transaction.date} at {transaction.time}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-primary">${transaction.amount.toFixed(2)}</p>
                <p className="text-xs text-success font-medium">{t('successful')}</p>
              </div>
            </div>

            <div className="border-t border-border pt-3 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs mb-1">{t('paymentMethod')}</p>
                <p className="font-medium text-foreground">{transaction.method}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">{t('invoiceID')}</p>
                <p className="font-mono text-foreground text-xs">{transaction.id}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
