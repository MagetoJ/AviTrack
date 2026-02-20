import { Batch, TreatmentRecord } from '@/types/erp';

// Real-time calculation logic for 2026 ERP
export function calculateInventory(
  batches: Batch[],
  treatmentRecords: TreatmentRecord[]
) {
  return batches.map(batch => {
    // Deduct isolated birds from healthy stock
    const activeIsolations = treatmentRecords.filter(
      r => r.flockId === batch.batchId && r.status === 'Isolated'
    ).length;

    const healthyCount = batch.liveCount - activeIsolations;

    // Check withdrawal periods for slaughter-ready status
    const now = new Date();
    const batchIsReady = batch.withdrawalEndDate 
      ? new Date(batch.withdrawalEndDate) < now 
      : true;

    return {
      ...batch,
      healthyCount,
      activeIsolations,
      slaughterReady: batchIsReady && healthyCount > 0,
      medicationStatus: activeIsolations > 0 ? 'Under Treatment' : 'Clear',
    };
  });
}

export function getStaffEfficiency(checkIns: { status: string }[]) {
  // Logic to calculate staff performance based on QR check-ins
  const totalPlanned = checkIns.length;
  const onTime = checkIns.filter(c => c.status === 'on-time').length;
  return (onTime / totalPlanned) * 100;
}
