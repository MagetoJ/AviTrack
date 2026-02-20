export type BirdStatus = 'Healthy' | 'Isolated' | 'Recovered' | 'Dead';

export interface TreatmentRecord {
  caseId: string;
  flockId: string;
  symptoms: string[];
  medicationGiven: string;
  dosage: string;
  isolationDate: string;
  recoveryDate?: string;
  mortalityDate?: string;
  withdrawalPeriodDays: number;
  status: BirdStatus;
}

export interface Staff {
  id: string;
  name: string;
  role: 'admin' | 'staff';
  shiftLogs: ShiftLog[];
}

export interface ShiftLog {
  date: string;
  checkIn: string;
  checkOut: string;
  tasksCompleted: string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  orderHistory: Order[];
  creditLimit: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unit: 'bird' | 'kg';
  price: number;
}

export interface Batch {
  batchId: string;
  breed: string;
  hatchDate: string;
  daysOld: number;
  location: string;
  liveCount: number;
  isolatedCount: number;
  mortalityRate: number;
  fcr: number;
  status: 'active' | 'closed';
  medicationActive: boolean;
  withdrawalEndDate?: string;
}
