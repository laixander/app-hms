import type { QueueEntry, QueueState, DepartmentCode } from '~/types/queue'

export type { QueueEntry, QueueState, DepartmentCode }

const DEPARTMENTS = [
    { name: 'General Medicine', code: 'GM', color: '#3b82f6' },
    { name: 'Pediatrics', code: 'PD', color: '#8b5cf6' },
    { name: 'OB-GYN', code: 'OB', color: '#ec4899' },
    { name: 'Dental', code: 'DN', color: '#06b6d4' },
    { name: 'Laboratory', code: 'LB', color: '#f59e0b' },
    { name: 'Pharmacy', code: 'PH', color: '#22c55e' }
] as const

const STORAGE_KEY = 'hqs-queue-state'
const CHANNEL_NAME = 'hqs-queue-sync'

function getDefaultState(): QueueState {
    return {
        entries: [],
        counters: Object.fromEntries(DEPARTMENTS.map(d => [d.code, 0])),
        currentServing: null,
        lastUpdate: Date.now()
    }
}

function loadState(): QueueState {
    if (import.meta.server) return getDefaultState()
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
            const parsed = JSON.parse(raw) as QueueState
            // Reset if data is from a different day
            const today = new Date().toDateString()
            const stateDate = new Date(parsed.lastUpdate).toDateString()
            if (today !== stateDate) {
                return getDefaultState()
            }
            return parsed
        }
    } catch { }
    return getDefaultState()
}

function saveState(state: QueueState) {
    if (import.meta.server) return
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch { }
}

let channel: BroadcastChannel | null = null

export function useQueueState() {
    const state = useState<QueueState>('queue-state', () => loadState())

    // Setup BroadcastChannel for cross-tab sync
    if (import.meta.client && !channel) {
        try {
            channel = new BroadcastChannel(CHANNEL_NAME)
            channel.onmessage = (event) => {
                if (event.data && event.data.type === 'queue-sync') {
                    state.value = event.data.state
                }
            }
        } catch { }
    }

    function broadcast() {
        state.value.lastUpdate = Date.now()
        saveState(state.value)
        try {
            channel?.postMessage({ type: 'queue-sync', state: toRaw(state.value) })
        } catch { }
    }

    function generateTicket(departmentCode: string): QueueEntry {
        const dept = DEPARTMENTS.find(d => d.code === departmentCode)
        if (!dept) throw new Error(`Unknown department: ${departmentCode}`)

        const counter = (state.value.counters[departmentCode] || 0) + 1
        state.value.counters[departmentCode] = counter

        const entry: QueueEntry = {
            id: Date.now() + Math.random(),
            number: `${departmentCode}-${String(counter).padStart(3, '0')}`,
            department: dept.name,
            departmentCode: departmentCode,
            timestamp: Date.now(),
            status: 'waiting'
        }

        state.value.entries.push(entry)
        broadcast()
        return entry
    }

    function callNext(): QueueEntry | null {
        // Mark current serving as completed
        if (state.value.currentServing) {
            const current = state.value.entries.find(
                e => e.id === state.value.currentServing!.id
            )
            if (current) current.status = 'completed'
        }

        // Find next waiting entry (FIFO)
        const next = state.value.entries.find(e => e.status === 'waiting')
        if (next) {
            next.status = 'serving'
            next.calledAt = Date.now()
            state.value.currentServing = { ...next }
            broadcast()
            return next
        }

        state.value.currentServing = null
        broadcast()
        return null
    }

    function holdCurrent(): void {
        if (state.value.currentServing) {
            const current = state.value.entries.find(
                e => e.id === state.value.currentServing!.id
            )
            if (current) current.status = 'on_hold'
            state.value.currentServing = null
            broadcast()
        }
    }

    function skipCurrent(): void {
        if (state.value.currentServing) {
            const current = state.value.entries.find(
                e => e.id === state.value.currentServing!.id
            )
            if (current) current.status = 'skipped'
            state.value.currentServing = null
            broadcast()
        }
    }

    function resumeTicket(id: number): void {
        const entry = state.value.entries.find(e => e.id === id)
        if (entry && entry.status === 'on_hold') {
            // If something is currently serving, we move it back to 'waiting' or 'completed'?
            // Usually, resuming a held ticket means it becomes the 'currentServing' again.
            // If the counter is busy, we might need a different logic, but for simplicity:
            
            // Mark current serving as waiting if it exists
            if (state.value.currentServing) {
                const current = state.value.entries.find(e => e.id === state.value.currentServing!.id)
                if (current) current.status = 'waiting'
            }

            entry.status = 'serving'
            entry.calledAt = Date.now()
            state.value.currentServing = { ...entry }
            broadcast()
        }
    }

    function skipTicket(id: number): void {
        const entry = state.value.entries.find(e => e.id === id)
        if (entry) {
            entry.status = 'skipped'
            // If it was the current serving, clear it
            if (state.value.currentServing?.id === id) {
                state.value.currentServing = null
            }
            broadcast()
        }
    }

    function getWaitingCount(): number {
        return state.value.entries.filter(e => e.status === 'waiting').length
    }

    function getWaitingEntries(): QueueEntry[] {
        return state.value.entries.filter(e => e.status === 'waiting')
    }

    function getServedEntries(): QueueEntry[] {
        return state.value.entries.filter(e => e.status === 'completed')
    }

    function getHeldEntries(): QueueEntry[] {
        return state.value.entries.filter(e => e.status === 'on_hold')
    }

    function getWaitTimeByDept(): Record<string, number> {
        const result: Record<string, number> = {}
        for (const dept of DEPARTMENTS) {
            const served = state.value.entries.filter(
                e => e.departmentCode === dept.code && e.status === 'completed' && e.calledAt
            )
            if (served.length > 0) {
                const totalWait = served.reduce((sum, e) => sum + ((e.calledAt || e.timestamp) - e.timestamp), 0)
                result[dept.code] = Math.round(totalWait / served.length / 60000) // minutes
            } else {
                result[dept.code] = Math.round(Math.random() * 15 + 3) // mock data fallback
            }
        }
        return result
    }

    function resetQueue(): void {
        state.value = getDefaultState()
        broadcast()
    }

    return {
        state,
        departments: DEPARTMENTS,
        generateTicket,
        callNext,
        holdCurrent,
        skipCurrent,
        getWaitingCount,
        getWaitingEntries,
        getHeldEntries,
        getServedEntries,
        getWaitTimeByDept,
        resumeTicket,
        skipTicket,
        resetQueue
    }
}
