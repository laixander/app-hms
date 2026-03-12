<template>
    <div class="flex flex-col gap-8 p-12 min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <div class="space-y-2 text-center">
            <h1 class="text-4xl font-black tracking-tight">Select Department</h1>
            <p class="text-muted tracking-wide">Choose the service you need today</p>
        </div>

        <!-- Now Serving Section -->
        <div class="max-w-6xl mx-auto w-full">
            <UCard class="bg-primary/5 dark:bg-primary/10 border-primary/20 backdrop-blur-sm shadow-lg rounded-3xl overflow-hidden">
                <div class="flex flex-col md:flex-row items-center justify-between p-4 gap-8">
                    <div class="flex flex-col gap-2 text-center md:text-left">
                        <div class="flex items-center justify-center md:justify-start gap-2 text-primary font-medium uppercase tracking-widest text-sm">
                            <span class="relative flex h-3 w-3">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>
                            Now Serving
                        </div>
                        <h2 class="text-2xl font-extrabold tracking-tight">Please proceed to the counter</h2>
                    </div>
                    
                    <div v-if="current" class="flex flex-col items-center md:items-end gap-1 px-8 py-4 bg-white dark:bg-neutral-900 rounded-2xl border border-primary/10 shadow-xl">
                        <div class="text-5xl font-mono font-black text-primary tracking-tighter">{{ current.number }}</div>
                        <div class="text-sm font-semibold uppercase tracking-widest text-primary/70">{{ current.department }}</div>
                    </div>
                    <div v-else class="flex flex-col items-center md:items-end gap-1 px-12 py-6 bg-white/50 dark:bg-neutral-900/50 rounded-2xl border border-dashed border-primary/20 border-3">
                        <div class="font-mono text-2xl font-bold text-muted">Waiting for next...</div>
                    </div>
                </div>
            </UCard>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
            <UButton 
                v-for="dept in departmentsWithIcons" 
                :key="dept.code"
                variant="subtle" 
                :color="dept.uiColor" 
                class="flex flex-col justify-center items-center gap-6 p-12 h-64 rounded-3xl transition-all hover:scale-105"
                @click="handleGenerateTicket(dept)"
            >
                <UBadge 
                    :icon="dept.icon" 
                    :color="dept.uiColor" 
                    size="xl" 
                    class="rounded-2xl size-18 flex justify-center text-5xl shadow-sm" 
                />
                <div class="flex flex-col gap-1 text-center">
                    <div class="text-sm uppercase tracking-[.15em] font-extrabold">{{ dept.name }}</div>
                    <div class="text-xs opacity-60 uppercase tracking-widest">{{ dept.code }}</div>
                </div>
            </UButton>
        </div>
    </div>
</template>

<script setup lang="ts">
const { generateTicket, departments, state } = useQueueState()
const toast = useToast()

const current = computed(() => state.value.currentServing)

const deptIcons: Record<string, string> = {
    GM: 'i-lucide-stethoscope',
    PD: 'i-lucide-baby',
    OB: 'i-lucide-heart-pulse',
    DN: 'i-lucide-smile',
    LB: 'i-lucide-flask-conical',
    PH: 'i-lucide-pill'
}

const deptColors: Record<string, any> = {
    GM: 'primary',
    PD: 'purple',
    OB: 'pink',
    DN: 'sky',
    LB: 'orange',
    PH: 'emerald'
}

const departmentsWithIcons = computed(() => departments.map(d => ({
    ...d,
    icon: deptIcons[d.code] || 'i-lucide-circle-help',
    uiColor: deptColors[d.code] || 'neutral'
})))

function handleGenerateTicket(dept: any) {
    const ticket = generateTicket(dept.code)
    toast.add({
        title: 'Ticket Generated',
        description: `Your ticket number for ${dept.name} is ${ticket.number}.`,
        icon: 'i-lucide-ticket',
        color: 'success'
    })
}
</script>