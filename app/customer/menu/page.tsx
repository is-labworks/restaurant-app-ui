'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { getTranslation } from '@/lib/i18n'
import { categoriesData, menuItemsData } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, MessageSquare } from 'lucide-react'

export default function MenuPage() {
  const { language, setLanguage } = useLanguage()
  const t = (key: string) => getTranslation(key, language)
  
  const categories = categoriesData[language]
  const menuItems = menuItemsData[language]
  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const [cart, setCart] = useState(0)

  const filteredItems = menuItems.filter(item => item.categoryId === activeCategory)

  const handleAddToCart = () => {
    setCart(cart + 1)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-border z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-semibold text-foreground">
              {language === 'vi' ? 'Nhà hàng Trung tâm' : 'Downtown Restaurant'}
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
                className="px-2 py-1 text-xs font-medium bg-secondary text-foreground rounded hover:bg-secondary/80"
              >
                {language === 'vi' ? 'EN' : 'VI'}
              </button>
              <Link href="/customer/recommendations">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MessageSquare size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-colors ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map(item => (
            <Card key={item.id} className={`overflow-hidden flex flex-col ${!item.inStock ? 'opacity-60' : ''}`}>
              <div className="relative h-24 bg-muted overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">{t('soldOut')}</span>
                  </div>
                )}
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h3 className="font-semibold text-sm text-foreground truncate">{item.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {language === 'vi' ? `₫${item.price.toLocaleString()}` : `$${item.price.toFixed(2)}`}
                </p>
                <div className="mt-auto">
                  <span className={`text-xs font-medium ${item.inStock ? 'text-success' : 'text-error'}`}>
                    {item.inStock ? t('inStock') : t('soldOut')}
                  </span>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!item.inStock}
                  className="mt-2 w-full h-7 bg-primary text-primary-foreground rounded text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                >
                  <Plus size={14} />
                  <span>{t('add')}</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex justify-around items-center">
          <Link href="/customer/menu" className="text-primary font-medium text-sm">{t('home')}</Link>
          <Link href="/customer/menu" className="text-primary font-medium text-sm">{t('menu')}</Link>
          <Link href="/customer/cart" className="text-primary font-medium text-sm">
            {t('cart')} ({cart})
          </Link>
          <Link href="/customer/payment" className="text-primary font-medium text-sm">{t('payment')}</Link>
          <Link href="/customer/recommendations" className="text-muted-foreground font-medium text-sm">
            {t('recommendations')}
          </Link>
          <Link href="/customer/history" className="text-muted-foreground font-medium text-sm">
            {t('history')}
          </Link>
        </div>
      </div>
    </div>
  )
}
