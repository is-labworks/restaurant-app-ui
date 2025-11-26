'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { getTranslation } from '@/lib/i18n'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { language, setLanguage } = useLanguage()
  const t = (key: string) => getTranslation(key, language)

  const navItems = [
    { id: 'dashboard', label: t('managerDashboard'), href: '/manager' },
    { id: 'menu', label: t('menuManagementLabel'), href: '/admin/menu' },
    { id: 'users', label: language === 'vi' ? 'Người dùng & Vai trò' : 'Users & Roles', href: '/admin/users' },
    { id: 'settings', label: language === 'vi' ? 'Cài đặt' : 'Settings', href: '#' },
    { id: 'audit', label: language === 'vi' ? 'Nhật ký Kiểm tra' : 'Audit Logs', href: '#' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-20">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 hover:bg-muted rounded"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl font-bold text-foreground">
              {language === 'vi' ? 'Bảng điều khiển Quản trị' : 'Admin Panel'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
              className="px-4 py-2 text-sm font-medium bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              {language === 'vi' ? 'English' : 'Tiếng Việt'}
            </button>
            <Button variant="outline" size="sm">
              {language === 'vi' ? 'Cài đặt' : 'Settings'}
            </Button>
            <Button variant="outline" size="sm">
              {language === 'vi' ? 'Đăng xuất' : 'Logout'}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-64 bg-sidebar border-r border-sidebar-border min-h-[calc(100vh-64px)]">
            <nav className="p-4 space-y-1">
              {navItems.map(item => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`block px-4 py-2 rounded text-sm font-medium transition-colors ${
                    item.href === '#'
                      ? 'text-sidebar-foreground/50 cursor-not-allowed'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}
