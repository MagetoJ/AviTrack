'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, Clock, XCircle } from 'lucide-react'

const mockStaff = [
  {
    id: 'ST-001',
    name: 'Ahmed Hassan',
    role: 'Shed Lead',
    onTimeRate: 98,
    tasksCompleted: 45,
    tasksTotal: 48,
    status: 'active',
  },
  {
    id: 'ST-002',
    name: 'Sarah Mwangi',
    role: 'Farm Hand',
    onTimeRate: 85,
    tasksCompleted: 38,
    tasksTotal: 45,
    status: 'active',
  },
  {
    id: 'ST-003',
    name: 'John Doe',
    role: 'Technician',
    onTimeRate: 92,
    tasksCompleted: 42,
    tasksTotal: 43,
    status: 'on-leave',
  },
]

export function StaffPerformance() {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground">Staff Performance</h3>
          <p className="text-sm text-muted-foreground">Monitoring efficiency and task completion</p>
        </div>
        <Badge variant="outline" className="border-primary/50 text-primary">
          Weekly Report
        </Badge>
      </div>

      <div className="space-y-6">
        {mockStaff.map((staff) => (
          <div key={staff.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                  {staff.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{staff.name}</p>
                  <p className="text-xs text-muted-foreground">{staff.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">{staff.onTimeRate}%</p>
                <p className="text-[10px] text-muted-foreground uppercase">On-Time</p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Tasks: {staff.tasksCompleted}/{staff.tasksTotal}</span>
                <span className="font-medium">{Math.round((staff.tasksCompleted / staff.tasksTotal) * 100)}%</span>
              </div>
              <Progress value={(staff.tasksCompleted / staff.tasksTotal) * 100} className="h-1.5" />
            </div>

            <div className="flex gap-2">
              {staff.onTimeRate > 90 ? (
                <Badge className="bg-success-50 text-success-700 hover:bg-success-50 text-[10px] py-0 h-5 border-success-200">
                  <CheckCircle2 className="mr-1 h-3 w-3" /> Top Performer
                </Badge>
              ) : staff.onTimeRate < 80 ? (
                <Badge className="bg-error-50 text-error-700 hover:bg-error-50 text-[10px] py-0 h-5 border-error-200">
                  <XCircle className="mr-1 h-3 w-3" /> Needs Review
                </Badge>
              ) : (
                <Badge className="bg-warning-50 text-warning-700 hover:bg-warning-50 text-[10px] py-0 h-5 border-warning-200">
                  <Clock className="mr-1 h-3 w-3" /> On Track
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
