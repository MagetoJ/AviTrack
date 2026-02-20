'use client'

import { Card } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

interface InventoryData {
  name: string
  live: number
  ailing: number
  dressed: number
  processed?: number
}

interface InventoryChartProps {
  data: InventoryData[]
  type?: 'bar' | 'pie'
  title: string
  height?: number
}

const COLORS = {
  live: '#10B981',
  ailing: '#F59E0B',
  dressed: '#0E5AA4',
  processed: '#6B7280',
}

export function InventoryChart({
  data,
  type = 'bar',
  title,
  height = 300,
}: InventoryChartProps) {
  if (type === 'pie') {
    // For pie chart, combine data
    const totalData = data.reduce(
      (acc, item) => ({
        live: acc.live + item.live,
        ailing: acc.ailing + item.ailing,
        dressed: acc.dressed + item.dressed,
        processed: acc.processed + (item.processed || 0),
      }),
      { live: 0, ailing: 0, dressed: 0, processed: 0 }
    )

    const pieData = [
      { name: 'Live Stock', value: totalData.live, color: COLORS.live },
      { name: 'Ailing/Quarantine', value: totalData.ailing, color: COLORS.ailing },
      { name: 'Dressed Stock', value: totalData.dressed, color: COLORS.dressed },
      { name: 'Processed', value: totalData.processed, color: COLORS.processed },
    ].filter((item) => item.value > 0)

    return (
      <Card className="p-6">
        <h3 className="mb-6 text-lg font-semibold text-foreground">{title}</h3>
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => value.toLocaleString()} />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="mb-6 text-lg font-semibold text-foreground">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="name" stroke="#64748B" />
          <YAxis stroke="#64748B" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '0.5rem',
            }}
            formatter={(value) => value.toLocaleString()}
          />
          <Legend />
          <Bar dataKey="live" fill={COLORS.live} name="Live Stock" />
          <Bar dataKey="ailing" fill={COLORS.ailing} name="Ailing/Quarantine" />
          <Bar dataKey="dressed" fill={COLORS.dressed} name="Dressed Stock" />
          {data.some((item) => item.processed) && (
            <Bar dataKey="processed" fill={COLORS.processed} name="Processed" />
          )}
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
