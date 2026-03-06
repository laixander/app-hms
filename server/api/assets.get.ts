import type { Asset } from '~/types/admin'

const itAssets: Asset[] = [
    { id: 'IT-001', name: 'Dell OptiPlex 7090', category: 'Desktop PC', location: 'Admin Office', condition: 'excellent', lastMaintenance: 'Feb 15, 2026', assignedTo: 'Reception' },
    { id: 'IT-002', name: 'HP LaserJet Pro M404', category: 'Printer', location: 'Records Room', condition: 'good', lastMaintenance: 'Jan 30, 2026', assignedTo: 'Medical Records' },
    { id: 'IT-003', name: 'Cisco Catalyst 9200', category: 'Network Switch', location: 'Server Room', condition: 'excellent', lastMaintenance: 'Mar 1, 2026', assignedTo: 'IT Dept' },
    { id: 'IT-004', name: 'APC Smart-UPS 1500', category: 'UPS', location: 'Server Room', condition: 'fair', lastMaintenance: 'Dec 10, 2025', assignedTo: 'IT Dept' },
    { id: 'IT-005', name: 'Lenovo ThinkPad T14', category: 'Laptop', location: 'Mobile', condition: 'good', lastMaintenance: 'Feb 1, 2026', assignedTo: 'Dr. Santos' },
    { id: 'IT-006', name: 'Epson L3250 Inkjet', category: 'Printer', location: 'Billing', condition: 'poor', lastMaintenance: 'Nov 20, 2025', assignedTo: 'Finance' },
    { id: 'IT-007', name: 'Ubiquiti UniFi AP', category: 'Access Point', location: 'Lobby', condition: 'excellent', lastMaintenance: 'Feb 20, 2026', assignedTo: 'IT Dept' },
    { id: 'IT-008', name: 'Dell PowerEdge R750', category: 'Server', location: 'Server Room', condition: 'good', lastMaintenance: 'Jan 15, 2026', assignedTo: 'IT Dept' }
]

const medicalAssets: Asset[] = [
    { id: 'MED-001', name: 'Philips IntelliVue MX800', category: 'Patient Monitor', location: 'ICU', condition: 'excellent', lastMaintenance: 'Mar 2, 2026', assignedTo: 'ICU Ward' },
    { id: 'MED-002', name: 'GE Vivid E95 Ultrasound', category: 'Ultrasound', location: 'OB-GYN', condition: 'good', lastMaintenance: 'Feb 10, 2026', assignedTo: 'OB-GYN Dept' },
    { id: 'MED-003', name: 'Mindray BC-6800Plus', category: 'Hematology Analyzer', location: 'Laboratory', condition: 'excellent', lastMaintenance: 'Feb 25, 2026', assignedTo: 'Lab' },
    { id: 'MED-004', name: 'Stryker 1588 AIM Camera', category: 'Surgical Equipment', location: 'OR 2', condition: 'good', lastMaintenance: 'Jan 20, 2026', assignedTo: 'Surgery' },
    { id: 'MED-005', name: 'Dräger Evita V300 Ventilator', category: 'Ventilator', location: 'ER', condition: 'fair', lastMaintenance: 'Dec 15, 2025', assignedTo: 'ER' },
    { id: 'MED-006', name: 'Siemens Artis Pheno Angio', category: 'Angiography', location: 'Cath Lab', condition: 'excellent', lastMaintenance: 'Mar 1, 2026', assignedTo: 'Cardiology' },
    { id: 'MED-007', name: 'Planmeca ProMax 3D', category: 'Dental X-Ray', location: 'Dental Clinic', condition: 'good', lastMaintenance: 'Feb 5, 2026', assignedTo: 'Dental' },
    { id: 'MED-008', name: 'Welch Allyn Connex Spot', category: 'Vital Signs Monitor', location: 'OPD', condition: 'poor', lastMaintenance: 'Oct 30, 2025', assignedTo: 'OPD' },
    { id: 'MED-009', name: 'Autoclave STE-23L', category: 'Sterilizer', location: 'CSSD', condition: 'critical', lastMaintenance: 'Sep 15, 2025', assignedTo: 'CSSD' }
]

export default defineEventHandler((event) => {
    const query = getQuery(event)
    const type = query.type as string | undefined

    if (type === 'medical') return medicalAssets
    if (type === 'it') return itAssets

    return { it: itAssets, medical: medicalAssets }
})
