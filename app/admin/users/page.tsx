'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { getTranslation } from '@/lib/i18n'

const users = [
  { id: 1, name: 'Nguyễn Văn An', email: 'an@nhahang.com', role: 'Admin', branch: 'Trụ sở chính', status: 'active' },
  { id: 2, name: 'Trần Thị Bình', email: 'binh@nhahang.com', role: 'Quản lý', branch: 'Trung tâm', status: 'active' },
  { id: 3, name: 'Lê Minh Cường', email: 'cuong@nhahang.com', role: 'Bếp', branch: 'Trung tâm', status: 'active' },
  { id: 4, name: 'Phạm Thu Dung', email: 'dung@nhahang.com', role: 'Phục vụ', branch: 'Trung tâm', status: 'inactive' },
  { id: 5, name: 'Hoàng Văn Em', email: 'em@nhahang.com', role: 'Bếp', branch: 'Khu Bắc', status: 'active' },
]

const roles = [
  { id: 'admin', name: 'Admin', permissions: 25, users: 1 },
  { id: 'manager', name: 'Quản lý', permissions: 18, users: 5 },
  { id: 'kitchen', name: 'Nhân viên Bếp', permissions: 8, users: 12 },
  { id: 'waiter', name: 'Phục vụ', permissions: 5, users: 8 },
]

export default function UsersManagementPage() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key, language)
  
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users')
  const [searchTerm, setSearchTerm] = useState('')
  const [showUserModal, setShowUserModal] = useState(false)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [editingRole, setEditingRole] = useState<typeof roles[0] | null>(null)

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const permissions = language === 'vi' ? [
    'Xem Đơn hàng',
    'Quản lý Thực đơn',
    'Quản lý Kho',
    'Xem Thông tin Khách hàng',
    'Tạo Hoàn tiền',
    'Xem Phân tích',
    'Quản lý Khuyến mãi',
    'Quản lý Nhân viên',
    'Quản lý Vai trò',
    'Xem Báo cáo',
    'Chỉnh sửa Cài đặt',
    'Truy cập Nhật ký Kiểm tra',
  ] : [
    'View Orders',
    'Manage Menu',
    'Manage Inventory',
    'View Customer Info',
    'Create Refunds',
    'View Analytics',
    'Manage Promotions',
    'Manage Staff',
    'Manage Roles',
    'View Reports',
    'Edit Settings',
    'Access Audit Logs',
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          {language === 'vi' ? 'Quản lý Người dùng & Vai trò' : 'User & Roles Management'}
        </h1>
        {activeTab === 'users' && (
          <Button
            onClick={() => setShowUserModal(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus size={16} className="mr-2" />
            {language === 'vi' ? 'Mời Người dùng' : 'Invite User'}
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-border">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'users'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {language === 'vi' ? 'Người dùng' : 'Users'}
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'roles'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {language === 'vi' ? 'Vai trò' : 'Roles'}
        </button>
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <>
          {/* Toolbar */}
          <div className="mb-6 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
              <Input
                placeholder={language === 'vi' ? 'Tìm kiếm người dùng...' : 'Search users...'}
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">{t('filter')}</Button>
          </div>

          {/* Users Table */}
          <Card className="overflow-hidden border-0 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">{t('name')}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">{language === 'vi' ? 'Vai trò' : 'Role'}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">{language === 'vi' ? 'Chi nhánh' : 'Branch'}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">{t('status')}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{user.role}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{user.branch}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            user.status === 'active'
                              ? 'bg-success/20 text-success'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {user.status === 'active' 
                            ? (language === 'vi' ? 'Hoạt động' : 'Active')
                            : (language === 'vi' ? 'Không hoạt động' : 'Inactive')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit2 size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-error hover:text-error/80">
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {/* Roles Tab */}
      {activeTab === 'roles' && (
        <Card className="overflow-hidden border-0 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">{language === 'vi' ? 'Tên Vai trò' : 'Role Name'}</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">{language === 'vi' ? 'Quyền' : 'Permissions'}</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">{language === 'vi' ? 'Người dùng được gán' : 'Users Assigned'}</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {roles.map(role => (
                  <tr key={role.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{role.name}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{role.permissions}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{role.users}</td>
                    <td className="px-6 py-4">
                      <Button
                        onClick={() => {
                          setEditingRole(role)
                          setShowRoleModal(true)
                        }}
                        variant="ghost"
                        size="sm"
                      >
                        <Edit2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* User Invite Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6 border-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">
                {language === 'vi' ? 'Mời Người dùng Mới' : 'Invite New User'}
              </h2>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                  {language === 'vi' ? 'Địa chỉ Email' : 'Email Address'}
                </label>
                <Input placeholder={language === 'vi' ? 'nguoidung@nhahang.com' : 'user@restaurant.com'} />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                  {language === 'vi' ? 'Vai trò' : 'Role'}
                </label>
                <select className="w-full px-3 py-2 border border-border rounded-md text-sm">
                  <option>Admin</option>
                  <option>{language === 'vi' ? 'Quản lý' : 'Manager'}</option>
                  <option>{language === 'vi' ? 'Nhân viên Bếp' : 'Kitchen Staff'}</option>
                  <option>{language === 'vi' ? 'Phục vụ' : 'Waiter'}</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                  {language === 'vi' ? 'Chi nhánh' : 'Branch'}
                </label>
                <select className="w-full px-3 py-2 border border-border rounded-md text-sm">
                  <option>{language === 'vi' ? 'Trung tâm' : 'Downtown'}</option>
                  <option>{language === 'vi' ? 'Khu Bắc' : 'Uptown'}</option>
                  <option>{language === 'vi' ? 'Khu Tây' : 'Westside'}</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setShowUserModal(false)}
                variant="outline"
                className="flex-1"
              >
                {t('cancel')}
              </Button>
              <Button
                onClick={() => setShowUserModal(false)}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {language === 'vi' ? 'Gửi Lời mời' : 'Send Invite'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Role Edit Modal */}
      {showRoleModal && editingRole && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6 border-0 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">
                {language === 'vi' ? `Chỉnh sửa Vai trò: ${editingRole.name}` : `Edit Role: ${editingRole.name}`}
              </h2>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <h3 className="font-semibold text-foreground text-sm">
                {language === 'vi' ? 'Quyền' : 'Permissions'}
              </h3>
              {permissions.map((perm, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`perm-${idx}`}
                    defaultChecked={idx < 7}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`perm-${idx}`} className="text-sm text-foreground">
                    {perm}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setShowRoleModal(false)}
                variant="outline"
                className="flex-1"
              >
                {t('cancel')}
              </Button>
              <Button
                onClick={() => setShowRoleModal(false)}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {language === 'vi' ? 'Lưu Thay đổi' : 'Save Changes'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
