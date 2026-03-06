import type { DisposalLog } from '~/types/admin'

export default defineEventHandler((): DisposalLog[] => {
    return [
        { id: 'WD-001', date: 'Mar 6, 2026', category: 'Infectious', weight: '12.5 kg', method: 'Incineration', handler: 'BioWaste Corp', status: 'completed' },
        { id: 'WD-002', date: 'Mar 6, 2026', category: 'Sharps', weight: '5.2 kg', method: 'Autoclaving', handler: 'MedDispose Inc', status: 'in-transit' },
        { id: 'WD-003', date: 'Mar 6, 2026', category: 'General', weight: '18.0 kg', method: 'Landfill', handler: 'City Sanitation', status: 'completed' },
        { id: 'WD-004', date: 'Mar 5, 2026', category: 'Pharmaceutical', weight: '3.8 kg', method: 'Chemical Treatment', handler: 'PharmWaste Ltd', status: 'completed' },
        { id: 'WD-005', date: 'Mar 5, 2026', category: 'Pathological', weight: '7.1 kg', method: 'Incineration', handler: 'BioWaste Corp', status: 'completed' },
        { id: 'WD-006', date: 'Mar 5, 2026', category: 'Chemical', weight: '2.4 kg', method: 'Neutralization', handler: 'ChemSafe PH', status: 'pending' },
        { id: 'WD-007', date: 'Mar 4, 2026', category: 'Infectious', weight: '15.2 kg', method: 'Incineration', handler: 'BioWaste Corp', status: 'completed' },
        { id: 'WD-008', date: 'Mar 4, 2026', category: 'General', weight: '22.0 kg', method: 'Landfill', handler: 'City Sanitation', status: 'completed' }
    ]
})
