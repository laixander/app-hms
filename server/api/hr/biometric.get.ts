import type { BiometricLog } from '~/types/admin'

export default defineEventHandler((): BiometricLog[] => {
    return [
        { id: 'B001', staffName: 'Dr. Maria Santos', date: 'Mar 6, 2026', clockIn: '07:55 AM', clockOut: '04:02 PM', status: 'on-time', hoursWorked: '8h 07m' },
        { id: 'B002', staffName: 'Nurse Anna Cruz', date: 'Mar 6, 2026', clockIn: '06:58 AM', clockOut: '03:05 PM', status: 'on-time', hoursWorked: '8h 07m' },
        { id: 'B003', staffName: 'Dr. Juan Reyes', date: 'Mar 6, 2026', clockIn: '08:12 AM', clockOut: '04:30 PM', status: 'late', hoursWorked: '8h 18m' },
        { id: 'B004', staffName: 'Tech. Roberto Aquino', date: 'Mar 6, 2026', clockIn: '01:55 PM', clockOut: '09:45 PM', status: 'early-out', hoursWorked: '7h 50m' },
        { id: 'B005', staffName: 'Nurse Grace Tan', date: 'Mar 6, 2026', clockIn: '10:00 PM', clockOut: '06:05 AM', status: 'on-time', hoursWorked: '8h 05m' },
        { id: 'B006', staffName: 'Pharm. Lisa Garcia', date: 'Mar 6, 2026', clockIn: '07:50 AM', clockOut: '04:00 PM', status: 'on-time', hoursWorked: '8h 10m' },
        { id: 'B007', staffName: 'Dr. Maria Santos', date: 'Mar 5, 2026', clockIn: '07:58 AM', clockOut: '04:10 PM', status: 'on-time', hoursWorked: '8h 12m' },
        { id: 'B008', staffName: 'Nurse Anna Cruz', date: 'Mar 5, 2026', clockIn: '07:15 AM', clockOut: '02:50 PM', status: 'early-out', hoursWorked: '7h 35m' }
    ]
})
