'use client'

import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown, DollarSign, Wallet, ShoppingBag, Truck } from 'lucide-react'

export function ProfitLossSummary() {
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 via-background to-background border-primary/10">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground">Global Financial Overview</h3>
        <p className="text-sm text-muted-foreground">Detailed Profit & Loss Analysis (Current Cycle)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-success-600" />
              <span className="text-sm font-medium">Total Revenue</span>
            </div>
            <span className="text-sm font-bold">$342,850</span>
          </div>
          <div className="flex items-center justify-between border-b border-border pb-2">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-error-600" />
              <span className="text-sm font-medium">Total Expenses</span>
            </div>
            <span className="text-sm font-bold">$218,350</span>
          </div>
          <div className="flex items-center justify-between border-b border-primary/20 pb-2 bg-primary/5 p-2 rounded-sm">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold">Net Profit</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-success-600">$124,500</p>
              <p className="text-[10px] text-success-600 flex items-center gap-1 justify-end">
                <TrendingUp className="h-2 w-2" /> +8.4%
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Expense Breakdown</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Feed & Nutrition</span>
                <span className="font-medium">$142,000 (65%)</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-warning-500" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Medication & Health</span>
                <span className="font-medium">$32,750 (15%)</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-error-500" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Labor & Staffing</span>
                <span className="font-medium">$43,600 (20%)</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary-500" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
        <div className="p-3 rounded-lg bg-background border border-border">
          <p className="text-[10px] text-muted-foreground uppercase">FCR Target</p>
          <p className="text-lg font-bold">1.75</p>
          <p className="text-[10px] text-success-600">Optimal</p>
        </div>
        <div className="p-3 rounded-lg bg-background border border-border">
          <p className="text-[10px] text-muted-foreground uppercase">Feed Cost/kg</p>
          <p className="text-lg font-bold">$0.42</p>
          <p className="text-[10px] text-error-600">+2% vs avg</p>
        </div>
        <div className="p-3 rounded-lg bg-background border border-border">
          <p className="text-[10px] text-muted-foreground uppercase">Med Cost/Bird</p>
          <p className="text-lg font-bold">$0.72</p>
          <p className="text-[10px] text-success-600">-5% vs avg</p>
        </div>
        <div className="p-3 rounded-lg bg-background border border-border">
          <p className="text-[10px] text-muted-foreground uppercase">Margin/Bird</p>
          <p className="text-lg font-bold">$2.75</p>
          <p className="text-[10px] text-success-600">+12% vs avg</p>
        </div>
      </div>
    </Card>
  )
}
