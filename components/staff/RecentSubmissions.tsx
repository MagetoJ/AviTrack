'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Trash2, Edit } from 'lucide-react'

interface Submission {
  id: string
  date: string
  type: 'daily_entry' | 'slaughter' | 'isolation'
  batchId: string
  details: string
  status: 'recorded' | 'pending'
}

interface RecentSubmissionsProps {
  submissions?: Submission[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

const defaultSubmissions: Submission[] = [
  {
    id: '1',
    date: 'Today, 10:30 AM',
    type: 'daily_entry',
    batchId: 'BATCH-2024-001',
    details: 'Feed: 500kg, Water: 1200L, Mortality: 2',
    status: 'recorded',
  },
  {
    id: '2',
    date: 'Today, 2:15 PM',
    type: 'isolation',
    batchId: 'BATCH-2024-001',
    details: '5 birds isolated - respiratory symptoms',
    status: 'recorded',
  },
  {
    id: '3',
    date: 'Yesterday, 4:45 PM',
    type: 'slaughter',
    batchId: 'BATCH-2024-001',
    details: '150 birds, 450kg live weight, 340kg dressed',
    status: 'recorded',
  },
  {
    id: '4',
    date: 'Yesterday, 10:00 AM',
    type: 'daily_entry',
    batchId: 'BATCH-2024-001',
    details: 'Feed: 510kg, Water: 1250L, Mortality: 0',
    status: 'recorded',
  },
]

export function RecentSubmissions({
  submissions = defaultSubmissions,
  onEdit,
  onDelete,
}: RecentSubmissionsProps) {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'daily_entry':
        return (
          <Badge className="bg-primary-100 text-primary-800 hover:bg-primary-100">
            Daily Entry
          </Badge>
        )
      case 'slaughter':
        return (
          <Badge className="bg-warning-100 text-warning-800 hover:bg-warning-100">
            Slaughter
          </Badge>
        )
      case 'isolation':
        return (
          <Badge className="bg-error-100 text-error-800 hover:bg-error-100">
            Isolation
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-foreground">Recent Submissions</h3>
        <p className="text-sm text-muted-foreground">
          Your last 4 entries and records
        </p>
      </div>

      {submissions.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="text-sm">{submission.date}</TableCell>
                  <TableCell>{getTypeBadge(submission.type)}</TableCell>
                  <TableCell className="font-medium">{submission.batchId}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {submission.details}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(submission.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(submission.id)}
                          className="text-error-600 hover:text-error-700 hover:bg-error-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No submissions yet</p>
        </div>
      )}
    </Card>
  )
}
