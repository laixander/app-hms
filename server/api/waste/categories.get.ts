export default defineEventHandler(() => {
    return {
        categories: [
            { name: 'Infectious', color: '#ef4444', value: 32, fillLevel: 75 },
            { name: 'Pathological', color: '#f59e0b', value: 15, fillLevel: 45 },
            { name: 'Sharps', color: '#8b5cf6', value: 18, fillLevel: 82 },
            { name: 'Pharmaceutical', color: '#3b82f6', value: 12, fillLevel: 35 },
            { name: 'Chemical', color: '#06b6d4', value: 8, fillLevel: 60 },
            { name: 'General', color: '#22c55e', value: 25, fillLevel: 90 }
        ],
        weeklyData: [
            { day: 'Mon', kg: 45 },
            { day: 'Tue', kg: 52 },
            { day: 'Wed', kg: 38 },
            { day: 'Thu', kg: 61 },
            { day: 'Fri', kg: 55 },
            { day: 'Sat', kg: 30 },
            { day: 'Sun', kg: 22 }
        ]
    }
})
