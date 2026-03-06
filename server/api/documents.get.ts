import type { DocFile } from '~/types/admin'

export default defineEventHandler((): DocFile[] => {
    return [
        {
            id: 'admin', name: 'Administrative', type: 'folder', children: [
                { id: 'a1', name: 'Hospital License 2026.pdf', type: 'file', status: 'approved', size: '2.4 MB', author: 'Dr. Santos', modified: 'Mar 1, 2026', extension: 'pdf' },
                { id: 'a2', name: 'Staff Policy Manual.docx', type: 'file', status: 'approved', size: '1.8 MB', author: 'HR Dept', modified: 'Feb 15, 2026', extension: 'docx' },
                { id: 'a3', name: 'Budget Proposal Q2.xlsx', type: 'file', status: 'pending', size: '560 KB', author: 'Finance', modified: 'Feb 28, 2026', extension: 'xlsx' },
                { id: 'a4', name: 'Board Meeting Minutes.pdf', type: 'file', status: 'draft', size: '340 KB', author: 'Admin', modified: 'Mar 3, 2026', extension: 'pdf' }
            ]
        },
        {
            id: 'medical', name: 'Medical Records', type: 'folder', children: [
                { id: 'm1', name: 'Patient Template Form.pdf', type: 'file', status: 'approved', size: '180 KB', author: 'Records', modified: 'Jan 20, 2026', extension: 'pdf' },
                { id: 'm2', name: 'Discharge Summary Template.docx', type: 'file', status: 'approved', size: '95 KB', author: 'Dr. Reyes', modified: 'Feb 10, 2026', extension: 'docx' },
                { id: 'm3', name: 'Treatment Protocol Update.pdf', type: 'file', status: 'pending', size: '1.2 MB', author: 'Dr. Cruz', modified: 'Mar 4, 2026', extension: 'pdf' }
            ]
        },
        {
            id: 'lab', name: 'Lab Reports', type: 'folder', children: [
                { id: 'l1', name: 'Equipment Calibration Log.xlsx', type: 'file', status: 'approved', size: '420 KB', author: 'Lab Tech', modified: 'Mar 2, 2026', extension: 'xlsx' },
                { id: 'l2', name: 'Quality Assurance Report.pdf', type: 'file', status: 'draft', size: '780 KB', author: 'QA Team', modified: 'Mar 5, 2026', extension: 'pdf' },
                { id: 'l3', name: 'Reagent Inventory March.xlsx', type: 'file', status: 'pending', size: '290 KB', author: 'Lab Admin', modified: 'Mar 1, 2026', extension: 'xlsx' }
            ]
        },
        {
            id: 'compliance', name: 'Compliance', type: 'folder', children: [
                { id: 'c1', name: 'DOH Compliance Checklist.pdf', type: 'file', status: 'approved', size: '1.5 MB', author: 'Compliance', modified: 'Feb 20, 2026', extension: 'pdf' },
                { id: 'c2', name: 'Fire Safety Inspection.pdf', type: 'file', status: 'approved', size: '890 KB', author: 'Safety', modified: 'Jan 30, 2026', extension: 'pdf' },
                { id: 'c3', name: 'Data Privacy Policy Draft.docx', type: 'file', status: 'draft', size: '240 KB', author: 'Legal', modified: 'Mar 6, 2026', extension: 'docx' }
            ]
        }
    ]
})
