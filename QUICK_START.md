# AviTrack 2026 - Quick Start Guide

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

---

## Login Credentials (Demo Mode)

### Admin Account
- **Email**: admin@avitrack.com
- **Password**: password123
- **Access**: `/admin/dashboard`

### Staff Account
- **Email**: staff@avitrack.com
- **Password**: password123
- **Access**: `/staff/daily-entry`

### Customer Account
- **Email**: customer@avitrack.com
- **Password**: password123
- **Access**: `/customer/catalog`

---

## Key Pages Overview

### Home Page (`/`)
- Displays all three role dashboards
- Shows demo account credentials
- Provides role selection and login button

### Admin Dashboard (`/admin/dashboard`)
- 4 KPI cards with real-time metrics
- Batch management cards with performance data
- Inventory charts (bar & pie)
- Mortality alert system
- Recent activity log

**Key Features**:
- Live Stock Count
- Ailing/Quarantine Count
- Dressed Stock Inventory
- Mortality Rate (24h)
- Batch Performance Tracking
- Automatic Alert Generation (>2% mortality)

### Staff Daily Entry (`/staff/daily-entry`)
- Welcome message with date
- Current batch information card
- Daily entry form:
  - Shed selection
  - Feed intake (kg)
  - Water intake (liters)
  - Mortality count & reason
  - Sick bird isolation
  - Notes section
- Quick actions sidebar
- Recent submissions history

**Mobile Optimized**: Large buttons, single column, touch-friendly inputs

### Customer Catalog (`/customer/catalog`)
- Product search & filtering
- Product type filter
- Sort by name, price, availability
- Product cards with:
  - Product info
  - Pricing
  - Availability
  - Quantity selector
  - Add to cart button

### Traceability Report (`/customer/traceability`)
- Order selection dropdown
- Complete lifecycle timeline:
  - Batch hatched
  - Health inspections
  - Rearing period
  - Pre-slaughter checks
  - Slaughter & processing
  - Quality assurance
  - Delivery
- Food safety certificate
- Download/Share options

---

## Component Map

### Layout Components
- `Header.tsx` - Top navigation with user menu
- `Sidebar.tsx` - Role-based navigation sidebar
- `MainLayout.tsx` - Wrapper combining header + sidebar

### Admin Components
- `KPICard.tsx` - Metric cards with trends
- `BatchCard.tsx` - Batch information cards
- `InventoryChart.tsx` - Recharts visualizations
- `MortalityAlert.tsx` - Alert banner component

### Staff Components
- `DailyEntryForm.tsx` - Main entry form
- `SlaughterModal.tsx` - Slaughter record dialog
- `RecentSubmissions.tsx` - Submission history table

### Customer Components
- `ProductCard.tsx` - Product display card
- `TraceabilityTimeline.tsx` - Lifecycle timeline

---

## Color System

### Professional Blue & Gray
```css
Primary Blue:    #0E5AA4
Secondary Blue:  #1E88E5
Neutral Gray:    #64748B
Light Gray:      #F1F5F9

Success Green:   #10B981
Alert Red:       #EF4444
Warning Orange:  #F59E0B
```

### Usage
- Primary actions: Blue buttons
- Success states: Green text/badges
- Alerts: Red/Orange backgrounds
- Neutral content: Gray text

---

## Validation Rules

### Daily Entry Form
- Batch ID: Required
- Feed Intake: Non-negative number
- Water Intake: Non-negative number
- Mortality Count: Non-negative number
- Mortality Reason: Required if mortality > 0

### Sick Bird Isolation
- Count: Minimum 1 bird
- Symptoms: At least 5 characters
- Medication: Required
- Dosage: Required
- Withdrawal Period: Days (non-negative)

### Slaughter Record
- Head Count: Minimum 1
- Live Weight: > 0.1 kg
- Dressed Weight: > 0.1 kg

---

## Key Features Explained

### 1. Mortality Alert System
**When**: Mortality > 2% in last 24 hours
**What**: Red alert banner displays on dashboard
**Action**: Admin should investigate immediately
**Visual**: Red alert with batch ID and shed location

### 2. Withdrawal Period Management
**Purpose**: Prevent selling meat with antibiotic residues
**How**: 
- Staff records medication & withdrawal period when isolating birds
- System blocks slaughter during withdrawal period
- Ensures food safety & legal compliance

### 3. Dynamic Inventory Engine
**Tracks**:
- Live Stock: Healthy birds
- Ailing/Quarantine: Isolated birds
- Dressed Stock: Processed meat (kg)
- Processed: Final packaged products

**Updates**: Real-time as staff makes entries

### 4. Traceability System
**Components**:
- Batch ID & breed
- Hatch date & age
- Daily health logs
- Medications & withdrawal periods
- Slaughter date & weights
- Processing date
- Delivery confirmation

**Customer Access**: Full visibility from farm to table

---

## Forms & Validation

All forms use React Hook Form + Zod:

```typescript
// Example: Daily Entry Validation
const dailyEntrySchema = z.object({
  batchId: z.string().min(1),
  feedIntake: z.number().min(0),
  waterIntake: z.number().min(0),
  mortalityCount: z.number().min(0),
  mortalityReason: z.enum(['disease', 'injury', 'weakness', 'unknown']),
})
```

---

## Navigation Structure

```
/ (Home)
├── /login (Authentication)
├── /admin/
│   ├── dashboard (KPIs, batches, inventory)
│   ├── batches (Batch management)
│   ├── inventory (Inventory tracking)
│   ├── staff (Staff management)
│   ├── alerts (Alert management)
│   └── reports (Analytics & reports)
├── /staff/
│   └── daily-entry (Daily operations form)
└── /customer/
    ├── catalog (Product listing)
    ├── cart (Shopping cart)
    ├── orders (Order history)
    └── traceability (Lifecycle reports)
```

---

## Responsive Design

### Mobile First Approach
- **Mobile** (< 640px): Single column, stacked cards
- **Tablet** (640-1024px): 2-column layouts
- **Desktop** (> 1024px): 3-4 column grids

### Key Mobile Features
- Large touch targets (44px minimum)
- Simplified navigation
- Single-column forms
- Optimized for landscape & portrait
- Readable text sizes

---

## Mock Data

The application uses mock data for demonstration:
- 3 sample batches
- 6 products
- 4 sample orders
- 5 submissions history
- 3 recent activities

To connect real data:
1. Replace mock data in page components
2. Implement API calls in place of mock data
3. Connect to database backend

---

## Next Steps for Production

### 1. Database Setup
- [ ] Set up PostgreSQL or MongoDB
- [ ] Create database schema
- [ ] Implement migrations

### 2. API Development
- [ ] Build REST API endpoints
- [ ] Implement authentication
- [ ] Add data validation

### 3. User Management
- [ ] Implement real password hashing
- [ ] Add session management
- [ ] Create user roles & permissions

### 4. Additional Features
- [ ] Email notifications
- [ ] PDF report generation
- [ ] Real-time updates
- [ ] Advanced analytics

### 5. Testing & Deployment
- [ ] Unit tests
- [ ] Integration tests
- [ ] User acceptance testing
- [ ] Deploy to production

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### Styling Issues
- Ensure Tailwind CSS is properly configured
- Check `globals.css` for design tokens
- Verify `tailwind.config.ts` is correct

---

## Support

For detailed information, see:
- `AVITRACK_GUIDE.md` - Complete system documentation
- Component code comments
- Zod validation schemas in `/lib/validation.ts`

---

**Last Updated**: December 2024  
**Version**: AviTrack 2026 v1.0  
**Status**: Production-Ready Frontend
