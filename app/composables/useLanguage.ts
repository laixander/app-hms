type Locale = 'en' | 'fil'

const translations: Record<string, Record<Locale, string>> = {
    // Kiosk Header
    'hospital.name': {
        en: 'City General Hospital',
        fil: 'Pangkalahatang Ospital ng Lungsod'
    },
    'kiosk.title': {
        en: 'Hospital Queuing System',
        fil: 'Sistema ng Pila sa Ospital'
    },
    'kiosk.subtitle': {
        en: 'Please select your department to get a queue number',
        fil: 'Pumili ng departamento upang makakuha ng numero sa pila'
    },

    // Now Serving
    'now.serving': {
        en: 'Now Serving',
        fil: 'Kasalukuyang Pinagsisilbihan'
    },
    'none': {
        en: 'None',
        fil: 'Wala'
    },

    // Departments
    'dept.gm': { en: 'General Medicine', fil: 'Pangkalahatang Medisina' },
    'dept.pd': { en: 'Pediatrics', fil: 'Pediatriks' },
    'dept.ob': { en: 'OB-GYN', fil: 'OB-GYN' },
    'dept.dn': { en: 'Dental', fil: 'Dental' },
    'dept.lb': { en: 'Laboratory', fil: 'Laboratoryo' },
    'dept.ph': { en: 'Pharmacy', fil: 'Parmasya' },

    // Queue
    'queue.waiting': { en: 'Waiting', fil: 'Naghihintay' },
    'queue.people': { en: 'people in queue', fil: 'tao sa pila' },
    'queue.your.number': { en: 'Your Queue Number', fil: 'Ang Numero Mo sa Pila' },
    'queue.department': { en: 'Department', fil: 'Departamento' },
    'queue.date': { en: 'Date & Time', fil: 'Petsa at Oras' },
    'queue.status': { en: 'Queue Status', fil: 'Estado ng Pila' },
    'queue.next': { en: 'Upcoming', fil: 'Susunod' },

    // Ticket
    'ticket.printing': { en: 'Printing Your Ticket...', fil: 'Nag-piprint ng Ticket...' },
    'ticket.ready': { en: 'Your Ticket is Ready!', fil: 'Handa na ang Ticket Mo!' },
    'ticket.please.wait': {
        en: 'Please wait for your number to be called',
        fil: 'Maghintay na tawagin ang iyong numero'
    },
    'ticket.close': { en: 'Close', fil: 'Isara' },

    // Language
    'lang.toggle': { en: 'Filipino', fil: 'English' }
}

export function useLanguage() {
    const locale = useState<Locale>('app-locale', () => 'en')

    function t(key: string): string {
        return translations[key]?.[locale.value] || key
    }

    function toggleLocale(): void {
        locale.value = locale.value === 'en' ? 'fil' : 'en'
    }

    return {
        locale,
        t,
        toggleLocale
    }
}
