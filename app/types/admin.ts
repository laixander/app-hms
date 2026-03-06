export interface DocFile {
    id: string
    name: string
    type: 'file' | 'folder'
    status?: 'approved' | 'draft' | 'pending' | 'archived'
    size?: string
    author?: string
    modified?: string
    extension?: string
    children?: DocFile[]
}

export interface Asset {
    id: string
    name: string
    category: string
    location: string
    condition: 'excellent' | 'good' | 'fair' | 'poor' | 'critical'
    lastMaintenance: string
    assignedTo: string
}

export interface Staff {
    id: string
    name: string
    department: string
    position: string
    status: 'active' | 'on-leave' | 'off-duty'
    contact: string
    avatar: string
}

export interface ShiftEntry {
    staffName: string
    shifts: (string | null)[] // Mon-Sun: 'morning' | 'afternoon' | 'night' | null
}

export interface BiometricLog {
    id: string
    staffName: string
    date: string
    clockIn: string
    clockOut: string
    status: 'on-time' | 'late' | 'early-out'
    hoursWorked: string
}

export interface DisposalLog {
    id: string
    date: string
    category: string
    weight: string
    method: string
    handler: string
    status: 'completed' | 'pending' | 'in-transit'
}
