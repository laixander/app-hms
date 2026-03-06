import type { ShiftEntry } from '~/types/admin'

export default defineEventHandler((): ShiftEntry[] => {
    return [
        { staffName: 'Dr. Maria Santos', shifts: ['morning', 'morning', null, 'morning', 'morning', null, null] },
        { staffName: 'Dr. Juan Reyes', shifts: ['morning', null, 'morning', 'morning', null, 'morning', null] },
        { staffName: 'Nurse Anna Cruz', shifts: ['morning', 'morning', 'morning', null, 'afternoon', 'afternoon', null] },
        { staffName: 'Dr. Patricia Lim', shifts: [null, null, null, null, null, null, null] },
        { staffName: 'Tech. Roberto Aquino', shifts: ['afternoon', 'afternoon', 'afternoon', null, 'morning', 'morning', null] },
        { staffName: 'Nurse Grace Tan', shifts: ['night', 'night', null, null, 'night', 'night', 'night'] },
        { staffName: 'Dr. Carlos Mendoza', shifts: [null, 'afternoon', 'afternoon', 'afternoon', 'afternoon', null, null] },
        { staffName: 'Pharm. Lisa Garcia', shifts: ['morning', 'morning', 'morning', 'morning', 'morning', null, null] }
    ]
})
