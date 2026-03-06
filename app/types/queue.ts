export interface QueueEntry {
  id: number
  number: string
  department: string
  departmentCode: string
  timestamp: number
  status: 'waiting' | 'serving' | 'completed' | 'skipped'
  calledAt?: number
}

export interface QueueState {
  entries: QueueEntry[]
  counters: Record<string, number>
  currentServing: QueueEntry | null
  lastUpdate: number
}

export type DepartmentCode = 'GM' | 'PD' | 'OB' | 'DN' | 'LB' | 'PH'
