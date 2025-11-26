'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { getTranslation } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { QrCode, Smartphone, CreditCard, DollarSign } from 'lucide-react'

const sampleOrderData = {
  vi: {
    items: [
      { name: 'Phở Bò', quantity: 2, price: 65000 },
      { name: 'Trà Đào', quantity: 1, price: 18000 },
      { name: 'Cơm Gà Xối Mỡ', quantity: 1, price: 60000 },
    ],
    subtotal: 268000,
    tax: 21440,
    total: 289440,
  },
  en: {
    items: [
      { name: 'Pho Beef', quantity: 2, price: 8.99 },
      { name: 'Peach Tea', quantity: 1, price: 3.00 },
      { name: 'Chicken Rice', quantity: 1, price: 8.99 },
    ],
    subtotal: 29.97,
    tax: 2.40,
    total: 32.37,
  }
}

export default function PaymentPage() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key, language)
  
  const orderData = sampleOrderData[language]
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)

  const paymentMethods = [
    {
      id: 'cash',
      label: language === 'vi' ? 'Tiền mặt' : 'Cash',
      icon: <DollarSign size={32} className="text-success" />,
      description: language === 'vi' ? 'Thanh toán tại quầy' : 'Pay at counter'
    },
    {
      id: 'qr',
      label: language === 'vi' ? 'Quét mã QR' : 'QR Code',
      icon: <QrCode size={32} className="text-primary" />,
      description: language === 'vi' ? 'Quét bằng ứng dụng thanh toán' : 'Scan with payment app'
    },
    {
      id: 'bank',
      label: language === 'vi' ? 'Thẻ ngân hàng' : 'Bank Card',
      icon: <CreditCard size={32} className="text-info" />,
      description: language === 'vi' ? 'Thẻ tín dụng hoặc ghi nợ' : 'Credit or debit card'
    },
    {
      id: 'ewallet',
      label: language === 'vi' ? 'Ví điện tử (MoMo / ZaloPay)' : 'E-Wallet (MoMo / ZaloPay)',
      icon: <Smartphone size={32} className="text-warning" />,
      description: language === 'vi' ? 'MoMo, ZaloPay hoặc ứng dụng khác' : 'MoMo, ZaloPay or other apps'
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-border z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/customer/cart">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <span className="text-lg">←</span>
            </Button>
          </Link>
          <h1 className="font-semibold text-foreground">
            {language === 'vi' ? 'Màn hình Thanh toán' : 'Payment Screen'}
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Order Summary */}
        <Card className="p-4 bg-secondary/30 border-0">
          <h2 className="font-semibold text-foreground mb-4">
            {language === 'vi' ? 'Tóm tắt đơn hàng' : 'Order Summary'}
          </h2>
          
          <div className="space-y-3 mb-4">
            <div className="text-sm">
              <span className="text-muted-foreground">
                {language === 'vi' ? 'Số món: ' : 'Number of items: '}
              </span>
              <span className="font-semibold text-foreground">{orderData.items.length}</span>
            </div>
            
            {/* Items List */}
            <div className="bg-white rounded p-3 space-y-2">
              {orderData.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-foreground">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-medium text-foreground">
                    {language === 'vi' 
                      ? `${(item.price * item.quantity).toLocaleString()}đ`
                      : `$${(item.price * item.quantity).toFixed(2)}`
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-2 border-t border-border pt-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('subtotal')}</span>
              <span className="font-medium text-foreground">
                {language === 'vi' 
                  ? `${orderData.subtotal.toLocaleString()}đ`
                  : `$${orderData.subtotal.toFixed(2)}`
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('tax')}</span>
              <span className="font-medium text-foreground">
                {language === 'vi' 
                  ? `${orderData.tax.toLocaleString()}đ`
                  : `$${orderData.tax.toFixed(2)}`
                }
              </span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-semibold text-foreground">{t('total')}</span>
              <span className="font-bold text-lg text-primary">
                {language === 'vi' 
                  ? `${orderData.total.toLocaleString()}đ`
                  : `$${orderData.total.toFixed(2)}`
                }
              </span>
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <div>
          <h2 className="font-semibold text-foreground mb-3">
            {language === 'vi' ? 'Chọn phương thức thanh toán' : 'Select Payment Method'}
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map(method => (
              <Card
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`p-4 cursor-pointer border-2 transition-all ${
                  selectedPayment === method.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="w-12 h-12 flex items-center justify-center">
                    {method.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{method.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Confirm Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 space-y-2">
          <Link href={selectedPayment ? `/customer/payment/success?method=${selectedPayment}&total=${orderData.total}` : '#'}>
            <Button 
              size="lg"
              disabled={!selectedPayment}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {language === 'vi' ? 'Xác nhận thanh toán' : 'Confirm Payment'}
            </Button>
          </Link>
          <Link href="/customer/cart" className="block">
            <Button variant="outline" size="lg" className="w-full">
              {t('back')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
