# Restaurant App UI

A modern, full-featured restaurant ordering system built with Next.js 16, featuring multi-role support and complete Vietnamese/English localization.

## 🚀 Overview

This is a comprehensive restaurant management and ordering platform that serves multiple user roles:
- **Customers** - Browse menu, place orders, track delivery
- **Kitchen Staff** - Manage cooking queue and order preparation
- **Managers** - View analytics and business metrics
- **Administrators** - Manage menu items and user accounts

## 📋 Table of Contents

- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Features](#-features)
- [Data Models](#-data-models)
- [Internationalization](#-internationalization)
- [Authentication](#-authentication)
- [Getting Started](#-getting-started)

## 🛠️ Technology Stack

### Core Framework
- **Next.js** 16.0.3 (App Router)
- **React** 19.2.0
- **TypeScript** 5.x

### UI & Styling
- **Tailwind CSS** 4.1.9
- **Radix UI** - 40+ accessible primitive components
- **Shadcn/ui** - 57 pre-built components
- **Lucide React** - Icon library
- **Recharts** - Data visualization

### Forms & Validation
- **React Hook Form** 7.60.0
- **Zod** 3.25.76 - Schema validation
- **@hookform/resolvers** 3.10.0

### Utilities
- **clsx / tailwind-merge** - Utility class management
- **date-fns** - Date formatting
- **next-themes** - Dark/light mode support
- **sonner** - Toast notifications

## 📁 Project Architecture

```
restaurant-app-ui/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin dashboard & management
│   │   ├── menu/                 # Menu item CRUD
│   │   └── users/                # User management
│   ├── customer/                 # Customer-facing pages
│   │   ├── menu/                 # Browse & order
│   │   ├── cart/                 # Shopping cart
│   │   ├── checkout/             # Order confirmation
│   │   ├── payment/              # Payment processing
│   │   ├── tracking/             # Order tracking
│   │   ├── history/              # Order history
│   │   ├── recommendations/      # AI-powered suggestions
│   │   └── feedback/             # Rating & reviews
│   ├── kitchen/                  # Kitchen display system
│   │   └── order/[id]/           # Order detail view
│   ├── manager/                  # Manager dashboard
│   ├── inventory/                # Inventory management
│   │   ├── replenishment/[id]/   # Restock requests
│   │   └── settings/             # Auto-replenishment config
│   ├── login/                    # Authentication
│   ├── notifications/            # Notification center
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/
│   ├── ui/                       # 57 Shadcn/Radix components
│   ├── notifications-panel.tsx   # Global notifications
│   └── theme-provider.tsx        # Theme management
├── lib/
│   ├── auth-context.tsx          # Authentication state
│   ├── language-context.tsx      # Language state
│   ├── i18n.ts                   # Translation definitions
│   ├── mock-data.ts              # Sample menu data
│   └── utils.ts                  # Utility functions
├── hooks/                        # Custom React hooks
├── public/                       # Static assets
└── styles/                       # Additional styles
```

## ✨ Features

### Customer Portal (`/customer/*`)

| Feature | Route | Description |
|---------|-------|-------------|
| Menu Browser | `/customer/menu` | Browse dishes by category with filtering |
| Shopping Cart | `/customer/cart` | Review and modify order items |
| Checkout | `/customer/checkout` | Confirm order details |
| Payment | `/customer/payment` | QR code, NFC, and digital wallet support |
| Order Tracking | `/customer/tracking` | Real-time order status updates |
| Order History | `/customer/history` | View past transactions |
| Recommendations | `/customer/recommendations` | AI-powered dish suggestions |
| Feedback | `/customer/feedback` | Rate dishes and service |

### Admin Portal (`/admin/*`)

| Feature | Route | Description |
|---------|-------|-------------|
| Menu Management | `/admin/menu` | Full CRUD operations for menu items |
| User Management | `/admin/users` | Manage staff accounts and roles |

### Kitchen Portal (`/kitchen/*`)

| Feature | Route | Description |
|---------|-------|-------------|
| Kitchen Display | `/kitchen` | View active order queue |
| Order Details | `/kitchen/order/[id]` | Update cooking status per item |

### Manager Portal (`/manager/*`)

| Feature | Route | Description |
|---------|-------|-------------|
| Dashboard | `/manager` | Business analytics and reports |

### Inventory Portal (`/inventory/*`)

| Feature | Route | Description |
|---------|-------|-------------|
| Inventory Monitor | `/inventory` | Track stock levels and forecasts |
| Replenishment | `/inventory/replenishment/[id]` | Manage restock requests |
| Settings | `/inventory/settings` | Configure auto-replenishment rules |

## 🗂️ Data Models

### MenuItem Interface

```typescript
interface MenuItem {
  id: number
  name: string
  description: string
  categoryId: string      // 'khai-vi', 'mon-chinh', 'canh-sup', 'do-uong', 'trang-mieng'
  price: number           // VND for Vietnamese, USD for English
  image: string           // URL to dish image
  inStock: boolean
  rating: number
}
```

### Categories

**Vietnamese:**
- `khai-vi` - Khai vị (Starters)
- `mon-chinh` - Món chính (Mains)
- `canh-sup` - Canh & Súp (Soups)
- `do-uong` - Đồ uống (Drinks)
- `trang-mieng` - Tráng miệng (Desserts)

**English:**
- `starters`
- `mains`
- `soups`
- `drinks`
- `desserts`

### Current Menu Items

The application includes **15 authentic Vietnamese dishes**:

1. **Phở Bò** - Traditional beef pho (₫65,000)
2. **Bún Chả Hà Nội** - Hanoi-style grilled pork with noodles (₫55,000)
3. **Bánh Mì Thịt Nướng** - Vietnamese baguette with grilled pork (₫25,000)
4. **Gỏi Cuốn Tôm Thịt** - Fresh spring rolls (₫35,000)
5. **Cơm Tấm Sườn Bì Chả** - Broken rice with pork chop (₫60,000)
6. **Bánh Xèo Miền Tây** - Vietnamese crepe (₫50,000)
7. **Bún Bò Huế** - Hue spicy beef noodle (₫65,000)
8. **Hủ Tiếu Nam Vang** - Phnom Penh noodle soup (₫55,000)
9. **Chả Giò Rế** - Fried spring rolls (₫40,000)
10. **Cà Phê Sữa Đá** - Vietnamese iced coffee (₫20,000)
11. **Trà Đá Chanh** - Iced lemon tea (₫15,000)
12. **Nước Mía** - Sugarcane juice (₫18,000)
13. **Chè Ba Màu** - Three-color dessert (₫25,000)
14. **Xôi Xoài** - Mango sticky rice (₫30,000)
15. **Bánh Flan** - Vietnamese crème caramel (₫20,000)

## 🌐 Internationalization

### Implementation

- **File:** `lib/i18n.ts`
- **Languages:** Vietnamese (`vi`), English (`en`)
- **Translation Keys:** 150+ keys covering all UI elements
- **Context:** `lib/language-context.tsx`

### Usage Pattern

```tsx
import { useLanguage } from '@/lib/language-context'
import { getTranslation } from '@/lib/i18n'

function MyComponent() {
  const { language, setLanguage } = useLanguage()
  const t = (key: string) => getTranslation(key, language)
  
  return <h1>{t('menu')}</h1>  // "Thực đơn" or "Menu"
}
```

### Data Localization

Menu data is fully localized:
- `menuItemsData.vi` - Vietnamese dishes with VND pricing
- `menuItemsData.en` - English translations with USD pricing

## 🔐 Authentication

### User Roles

| Role | Login Route | Dashboard Route | Access Level |
|------|-------------|-----------------|--------------|
| Customer | Public (no login) | `/customer/menu` | Browse & order |
| Kitchen Staff | `/login?role=staff` | `/kitchen` | Order management |
| Manager | `/login?role=manager` | `/manager` | Analytics & reports |
| Admin | `/login?role=admin` | `/admin/menu` | Full system access |

### Auth Context

The `lib/auth-context.tsx` manages:
- User authentication state
- Role-based access control
- Login/logout functionality
- Automatic route protection

## 🧩 Component Library

### Shadcn/ui Components (57 total)

**Forms:**
- button, input, select, checkbox, radio-group, textarea, label, form

**Layout:**
- card, dialog, sheet, tabs, accordion, separator, scroll-area

**Feedback:**
- alert, toast, progress, spinner, skeleton, badge

**Navigation:**
- navigation-menu, breadcrumb, pagination, sidebar, menubar

**Data Display:**
- table, chart, calendar, carousel, avatar

**Advanced:**
- command, context-menu, dropdown-menu, popover, tooltip, hover-card

### Custom Components

- `notifications-panel.tsx` - Global notification system
- `theme-provider.tsx` - Dark/light mode support

## 🎨 Design Patterns

### State Management
- **Local State** - `useState` for component-level data
- **Context API** - Language, Auth, Theme global state
- **No external libraries** - Keeping dependencies minimal

### Styling Approach
- **Utility-first** - Tailwind CSS classes
- **Component Variants** - `class-variance-authority`
- **Responsive** - Mobile-first design
- **Theme Support** - Dark/light mode with `next-themes`

### Code Organization
- **Type Safety** - TypeScript throughout
- **Reusability** - Shared component library
- **Separation of Concerns** - Clear role-based routing

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd restaurant-app-ui

# Install dependencies
npm install

# Run development server
npm run dev
```

### Development

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## 📊 Data Flow

### Customer Menu Flow
1. Language detection → Select appropriate data object (`menuItemsData[language]`)
2. Category filtering → Filter items by `categoryId`
3. Rendering → Map filtered items to cards
4. Cart management → Local state (not persisted)

### Admin Menu Flow
1. Search → Filter by name
2. CRUD operations → Local state updates
3. Modal forms → Add/edit items
4. Status toggle → Update `inStock` status

### Kitchen Display Flow
1. Order queue → Display pending orders
2. Status updates → Mark items as preparing/ready
3. Real-time updates → Currently simulated (ready for WebSocket integration)

## 🔮 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time order updates with WebSockets
- [ ] Payment gateway integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Multi-restaurant support

## 📝 License

This project is part of the IS Lab Works curriculum.

---

**Built with ❤️ using Next.js and TypeScript**