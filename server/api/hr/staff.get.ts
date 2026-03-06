import type { Staff } from '~/types/admin'

export default defineEventHandler((): Staff[] => {
    return [
        { id: 'S001', name: 'Dr. Maria Santos', department: 'General Medicine', position: 'Senior Physician', status: 'active', contact: '0917-xxx-1234', avatar: 'MS' },
        { id: 'S002', name: 'Dr. Juan Reyes', department: 'Pediatrics', position: 'Pediatrician', status: 'active', contact: '0918-xxx-5678', avatar: 'JR' },
        { id: 'S003', name: 'Nurse Anna Cruz', department: 'ER', position: 'Head Nurse', status: 'active', contact: '0919-xxx-9012', avatar: 'AC' },
        { id: 'S004', name: 'Dr. Patricia Lim', department: 'OB-GYN', position: 'OB-GYN Specialist', status: 'on-leave', contact: '0920-xxx-3456', avatar: 'PL' },
        { id: 'S005', name: 'Tech. Roberto Aquino', department: 'Laboratory', position: 'Senior Lab Tech', status: 'active', contact: '0921-xxx-7890', avatar: 'RA' },
        { id: 'S006', name: 'Nurse Grace Tan', department: 'ICU', position: 'ICU Nurse', status: 'active', contact: '0922-xxx-2345', avatar: 'GT' },
        { id: 'S007', name: 'Dr. Carlos Mendoza', department: 'Dental', position: 'Dentist', status: 'off-duty', contact: '0923-xxx-6789', avatar: 'CM' },
        { id: 'S008', name: 'Pharm. Lisa Garcia', department: 'Pharmacy', position: 'Chief Pharmacist', status: 'active', contact: '0924-xxx-0123', avatar: 'LG' }
    ]
})
