import { z } from 'zod'

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: 'Passwords do not match',
  path: ['passwordConfirm'],
})

// Staff Dashboard Schemas
export const dailyEntrySchema = z.object({
  batchId: z.string().min(1, 'Batch ID is required'),
  shedId: z.string().min(1, 'Shed is required'),
  date: z.date(),
  feedIntake: z.number().min(0, 'Feed intake must be non-negative'),
  waterIntake: z.number().min(0, 'Water intake must be non-negative'),
  mortalityCount: z.number().min(0, 'Mortality count must be non-negative'),
  mortalityReason: z.enum(['disease', 'injury', 'weakness', 'unknown']),
  notes: z.string().optional(),
})

export const sickBirdSchema = z.object({
  batchId: z.string().min(1, 'Batch ID is required'),
  count: z.number().min(1, 'At least 1 bird must be isolated'),
  symptoms: z.string().min(5, 'Symptoms must be at least 5 characters'),
  medicationName: z.string().min(1, 'Medication name is required'),
  dosage: z.string().min(1, 'Dosage is required'),
  withdrawalPeriodDays: z.number().min(0, 'Withdrawal period must be non-negative'),
})

export const slaughterSchema = z.object({
  batchId: z.string().min(1, 'Batch ID is required'),
  headCount: z.number().min(1, 'Head count must be at least 1'),
  liveWeight: z.number().min(0.1, 'Live weight must be greater than 0'),
  dressedWeight: z.number().min(0.1, 'Dressed weight must be greater than 0'),
  notes: z.string().optional(),
})

// Batch Schemas
export const batchSchema = z.object({
  batchId: z.string().min(1, 'Batch ID is required'),
  breed: z.string().min(1, 'Breed is required'),
  hatchDate: z.date(),
  houseLocation: z.string().min(1, 'House location is required'),
  initialCount: z.number().min(1, 'Initial count must be at least 1'),
  status: z.enum(['active', 'completed', 'culled']),
})

// Customer Portal Schemas
export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  weight: z.number().optional(),
})

export const orderSchema = z.object({
  items: z.array(cartItemSchema).min(1, 'Order must contain at least one item'),
  shippingAddress: z.string().min(5, 'Shipping address is required'),
  notes: z.string().optional(),
})

// Type exports
export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type DailyEntryInput = z.infer<typeof dailyEntrySchema>
export type SickBirdInput = z.infer<typeof sickBirdSchema>
export type SlaughterInput = z.infer<typeof slaughterSchema>
export type BatchInput = z.infer<typeof batchSchema>
export type CartItemInput = z.infer<typeof cartItemSchema>
export type OrderInput = z.infer<typeof orderSchema>
