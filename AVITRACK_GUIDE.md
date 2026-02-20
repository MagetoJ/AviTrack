# AviTrack 2026 - Poultry ERP System

## Overview

AviTrack 2026 is a comprehensive Poultry & Lifecycle Enterprise Resource Planning (ERP) system built with modern web technologies. It manages the complete lifecycle of poultry from "Day-Old-Chicks" to "Processed Meat," including health monitoring, staff operations, inventory management, and customer sales.

## System Architecture

### Technology Stack
- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Validation**: Zod + React Hook Form
- **Charts**: Recharts
- **Icons**: Lucide React

### Three Primary User Roles

1. **Admin Dashboard** - Supervisors/Management
2. **Staff Dashboard** - Frontline Operations
3. **Customer Portal** - Product Buyers & Retail

---

## System Components

### 1. Admin Dashboard (`/admin/dashboard`)
**Purpose**: High-level analytics and batch management

**Features**:
- KPI Cards (Live Stock, Ailing Count, Dressed Inventory, Mortality Rate)
- Batch Performance Monitoring
- Inventory Visualization (Bar & Pie Charts)
- Mortality Alert System (>2% in 24h triggers alert)
- Recent Activities Log
- Staff Performance Tracking

**Key Components**:
- `KPICard.tsx` - Displays metrics with trend indicators
- `BatchCard.tsx` - Shows individual batch details
- `InventoryChart.tsx` - Recharts visualizations
- `MortalityAlert.tsx` - Alert notifications for high mortality

### 2. Staff Dashboard (`/staff/daily-entry`)
**Purpose**: Mobile-optimized daily operations entry

**Features**:
- Daily Entry Form with validation
- Feed & Water Intake logging
- Mortality tracking with reasons
- Sick Bird Isolation recording
- Withdrawal Period Management
- Slaughter Record Modal
- Recent Submissions History

**Key Components**:
- `DailyEntryForm.tsx` - Main daily operations form
- `SlaughterModal.tsx` - Slaughter record dialog
- `RecentSubmissions.tsx` - History of entries

**Mobile Optimization**: Single-column layout, large touch targets, simplified navigation

### 3. Customer Portal (`/customer/catalog`)
**Purpose**: E-commerce-style product catalog and ordering

**Features**:
- Product Catalog with filtering/sorting
- Add to Cart functionality
- Order History Management
- Product Traceability Reports
- Quality & Safety Certificates

**Key Components**:
- `ProductCard.tsx` - Product display with quantity selector
- `TraceabilityTimeline.tsx` - Complete lifecycle visualization
- Catalog page with search & filtering

---

## Database Schema (Reference)

### Core Tables
```
batches
├── batch_id (PK)
├── breed
├── hatch_date
├── house_location
├── initial_count
└── status (active/completed/culled)

inventory_status
├── batch_id (FK)
├── status (live/ailing/dressed)
├── count
├── weight
└── timestamp

daily_logs
├── batch_id (FK)
├── date
├── feed_intake
├── water_intake
├── mortality_count
└── mortality_reason

sick_birds
├── batch_id (FK)
├── count
├── symptoms
├── medication
├── dosage
└── withdrawal_expiry

slaughter_records
├── batch_id (FK)
├── head_count
├── live_weight
├── dressed_weight
└── timestamp

products
├── product_id (PK)
├── batch_id (FK)
├── type
├── weight_kg
├── price
└── available

orders
├── order_id (PK)
├── customer_id (FK)
├── status
├── total_price
└── created_at

staff_accounts
├── staff_id (PK)
├── name
├── role
└── assigned_shed

alerts
├── alert_id (PK)
├── type
├── batch_id (FK)
├── message
├── severity
└── created_at
```

---

## Color Palette (Professional Blue & Gray)

### Primary Colors
- **Primary Blue**: #0E5AA4 (Trust, corporate feel)
- **Secondary Blue**: #1E88E5 (Actions, highlights)
- **Neutral Gray**: #64748B (Text, borders)
- **Light Gray**: #F1F5F9 (Backgrounds)

### Status Colors
- **Success Green**: #10B981 (Healthy, success)
- **Alert Red**: #EF4444 (Alerts, dangers)
- **Warning Orange**: #F59E0B (Caution, withdrawal periods)

### Design Philosophy
- Clean, minimal aesthetic
- Professional corporate feel
- High contrast for accessibility
- Consistent spacing & typography

---

## File Structure

```
app/
├── layout.tsx                          # Root layout
├── page.tsx                            # Home/landing page
├── (auth)/
│   └── login/page.tsx                  # Login page
├── (admin)/
│   ├── dashboard/page.tsx              # Admin home
│   ├── batches/page.tsx                # Batch management
│   ├── inventory/page.tsx              # Inventory tracking
│   ├── staff/page.tsx                  # Staff management
│   ├── alerts/page.tsx                 # Alert management
│   └── reports/page.tsx                # Reporting dashboard
├── (staff)/
│   └── daily-entry/page.tsx            # Daily operations form
└── (customer)/
    ├── catalog/page.tsx                # Product catalog
    ├── cart/page.tsx                   # Shopping cart
    ├── orders/page.tsx                 # Order history
    └── traceability/page.tsx           # Traceability reports

components/
├── layout/
│   ├── Header.tsx                      # Top navigation
│   ├── Sidebar.tsx                     # Role-based navigation
│   └── MainLayout.tsx                  # Layout wrapper
├── admin/
│   ├── KPICard.tsx                     # KPI metric cards
│   ├── BatchCard.tsx                   # Batch information cards
│   ├── InventoryChart.tsx              # Recharts visualizations
│   └── MortalityAlert.tsx              # Alert component
├── staff/
│   ├── DailyEntryForm.tsx              # Main form component
│   ├── SlaughterModal.tsx              # Slaughter dialog
│   └── RecentSubmissions.tsx           # Submission history
├── customer/
│   ├── ProductCard.tsx                 # Product display
│   └── TraceabilityTimeline.tsx        # Lifecycle timeline
└── ui/                                 # shadcn/ui components

lib/
├── colors.ts                           # Color palette constants
├── validation.ts                       # Zod validation schemas
└── utils.ts                            # Utility functions

contexts/
└── AuthContext.tsx                     # Authentication context

public/                                 # Static assets
```

---

## Authentication & Role-Based Access

### Login Flow
1. User selects role (Admin/Staff/Customer)
2. Enters credentials
3. System validates and stores session (localStorage in demo)
4. Redirects to role-specific dashboard

### Demo Credentials
```
Admin:
  Email: admin@avitrack.com
  Password: password123

Staff:
  Email: staff@avitrack.com
  Password: password123

Customer:
  Email: customer@avitrack.com
  Password: password123
```

### Role-Based Routing
- Admin → `/admin/dashboard`
- Staff → `/staff/daily-entry`
- Customer → `/customer/catalog`

---

## Key Business Logic

### 1. Mortality Alert System
```
if (mortality_rate > 2% in last 24 hours) {
  trigger_admin_notification()
  display_red_alert_banner()
  log_alert_event()
}
```

### 2. Withdrawal Period Enforcement
```
if (medication_withdrawal_period_active) {
  prevent_slaughter_action()
  show_warning_message()
}
```

### 3. Feed Conversion Ratio (FCR)
```
FCR = total_feed_consumed / total_weight_gain
```

### 4. Inventory Status Management
- Live Stock: Healthy birds in active use
- Ailing/Quarantine: Isolated birds under treatment
- Dressed Stock: Processed meat products
- Processed: Final packaged products

---

## Form Validation Schemas (Zod)

### DailyEntrySchema
- batchId: Required string
- shedId: Required string
- date: Required date
- feedIntake: Non-negative number
- waterIntake: Non-negative number
- mortalityCount: Non-negative number
- mortalityReason: Enum (disease/injury/weakness/unknown)

### SickBirdSchema
- batchId: Required string
- count: Minimum 1 bird
- symptoms: At least 5 characters
- medicationName: Required string
- dosage: Required string
- withdrawalPeriodDays: Non-negative number

### SlaughterSchema
- batchId: Required string
- headCount: Minimum 1
- liveWeight: Minimum 0.1 kg
- dressedWeight: Minimum 0.1 kg

---

## API Integration Points (To Be Implemented)

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - New account creation
- `POST /api/auth/logout` - User logout

### Batch Management
- `GET /api/batches` - List all batches
- `POST /api/batches` - Create new batch
- `GET /api/batches/:id` - Get batch details
- `PUT /api/batches/:id` - Update batch
- `DELETE /api/batches/:id` - Delete batch

### Daily Operations
- `POST /api/staff/daily-entry` - Submit daily entry
- `POST /api/staff/slaughter` - Record slaughter
- `POST /api/staff/isolate-sick` - Isolate sick bird

### Inventory
- `GET /api/inventory` - Get current inventory
- `PUT /api/inventory/:id` - Update inventory item

### Orders
- `GET /api/orders` - List customer orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

### Analytics
- `GET /api/analytics/dashboard` - Admin KPI data
- `GET /api/analytics/flock-performance` - Flock metrics
- `GET /api/alerts` - Get active alerts

---

## Responsive Design Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl)

### Layout Strategy
- Mobile: Single column, stacked components
- Tablet: 2-column grid layout
- Desktop: 3-4 column grid layout

---

## Getting Started

### Installation
```bash
npm install
# or
pnpm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
npm start
```

### Access the Application
- Home: http://localhost:3000
- Login: http://localhost:3000/login
- Admin: http://localhost:3000/admin/dashboard (after login)

---

## Future Enhancements

1. **Database Integration**
   - Connect to PostgreSQL/MongoDB backend
   - Implement real user authentication
   - Add RLS (Row Level Security)

2. **API Implementation**
   - Build complete REST API
   - Add real-time updates with WebSockets
   - Implement caching strategies

3. **Advanced Features**
   - Email notifications for alerts
   - SMS alerts for critical events
   - PDF report generation
   - Batch export functionality
   - Advanced analytics & forecasting

4. **Mobile App**
   - Native mobile app for staff
   - Offline capability
   - Push notifications

5. **Integration**
   - ERP systems
   - Veterinary management tools
   - Supply chain platforms

---

## Support & Documentation

For more information or support:
- Review component code in `/components`
- Check validation schemas in `/lib/validation.ts`
- Reference color palette in `/lib/colors.ts`

---

## License

© 2026 AviTrack. All rights reserved.
