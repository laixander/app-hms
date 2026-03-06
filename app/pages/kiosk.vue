<script setup lang="ts">

const { t, locale, toggleLocale } = useLanguage()
const { state, departments, generateTicket, getWaitingCount } = useQueueState()

const currentTime = ref('')
const showTicketModal = ref(false)
const isPrinting = ref(false)
const printedTicket = ref<{ number: string; department: string; timestamp: number } | null>(null)

onMounted(() => {
    const update = () => {
        currentTime.value = new Date().toLocaleString(locale.value === 'en' ? 'en-US' : 'fil-PH', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    }
    update()
    setInterval(update, 1000)
})

const deptIcons: Record<string, string> = {
    GM: 'i-lucide-stethoscope',
    PD: 'i-lucide-baby',
    OB: 'i-lucide-heart-pulse',
    DN: 'i-lucide-smile',
    LB: 'i-lucide-flask-conical',
    PH: 'i-lucide-pill'
}

const deptColors: Record<string, string> = {
    GM: 'from-blue-500 to-blue-600',
    PD: 'from-violet-500 to-violet-600',
    OB: 'from-pink-500 to-pink-600',
    DN: 'from-cyan-500 to-cyan-600',
    LB: 'from-amber-500 to-amber-600',
    PH: 'from-emerald-500 to-emerald-600'
}

const deptBgColors: Record<string, string> = {
    GM: 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40',
    PD: 'bg-violet-500/10 border-violet-500/20 hover:bg-violet-500/20 hover:border-violet-500/40',
    OB: 'bg-pink-500/10 border-pink-500/20 hover:bg-pink-500/20 hover:border-pink-500/40',
    DN: 'bg-cyan-500/10 border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/40',
    LB: 'bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/40',
    PH: 'bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40'
}

const deptTranslationKeys: Record<string, string> = {
    GM: 'dept.gm',
    PD: 'dept.pd',
    OB: 'dept.ob',
    DN: 'dept.dn',
    LB: 'dept.lb',
    PH: 'dept.ph'
}

function handleDepartmentClick(code: string) {
    const entry = generateTicket(code)
    printedTicket.value = {
        number: entry.number,
        department: entry.department,
        timestamp: entry.timestamp
    }
    isPrinting.value = true
    showTicketModal.value = true

    setTimeout(() => {
        isPrinting.value = false
    }, 1500)
}

function closeTicketModal() {
    showTicketModal.value = false
    printedTicket.value = null
    isPrinting.value = false
}

function formatTime(ts: number): string {
    return new Date(ts).toLocaleTimeString(locale.value === 'en' ? 'en-US' : 'fil-PH', {
        hour: '2-digit',
        minute: '2-digit'
    })
}

const waitingEntries = computed(() => {
    return state.value.entries.filter(e => e.status === 'waiting').slice(0, 8)
})
</script>

<template>
    <div class="kiosk-fullscreen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white">
        <!-- Background effects -->
        <div class="fixed inset-0 overflow-hidden pointer-events-none">
            <div class="absolute -top-20 -right-20 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-3xl" />
            <div class="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-indigo-500/8 rounded-full blur-3xl" />
        </div>

        <div class="relative z-10 flex flex-col min-h-screen">
            <!-- HEADER -->
            <header
                class="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-5 border-b border-white/5 gap-4">
                <div class="flex items-center gap-4">
                    <div
                        class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <UIcon name="i-lucide-hospital" class="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 class="text-xl font-bold">{{ t('hospital.name') }}</h1>
                        <p class="text-xs text-blue-300/60">{{ t('kiosk.title') }}</p>
                    </div>
                </div>

                <div class="flex items-center gap-6">
                    <span class="text-sm text-slate-400 font-mono hidden sm:block">{{ currentTime }}</span>
                    <button
                        class="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium"
                        @click="toggleLocale">
                        <UIcon name="i-lucide-languages" class="w-4 h-4" />
                        {{ t('lang.toggle') }}
                    </button>
                </div>
            </header>

            <!-- MAIN CONTENT -->
            <div class="flex-1 flex flex-col lg:flex-row">
                <!-- LEFT: Now Serving + Departments -->
                <div class="flex-1 p-6 lg:p-10 flex flex-col">
                    <!-- Now Serving Card -->
                    <div class="glass-card p-6 lg:p-8 mb-8 text-center">
                        <p class="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-3">{{
                            t('now.serving') }}</p>
                        <div class="relative inline-block">
                            <div v-if="state.currentServing" class="now-serving-number animate-count-up"
                                :key="state.currentServing.number">
                                {{ state.currentServing.number }}
                            </div>
                            <div v-else class="text-4xl font-bold text-slate-600">
                                ---
                            </div>
                            <div v-if="state.currentServing"
                                class="absolute inset-0 rounded-full animate-pulse-ring border-2 border-blue-500/30 pointer-events-none"
                                style="margin: -20px;" />
                        </div>
                        <p v-if="state.currentServing" class="text-sm text-slate-400 mt-3">{{
                            state.currentServing.department }}</p>
                    </div>

                    <!-- Department Selection -->
                    <p class="text-sm text-slate-400 mb-5 text-center lg:text-left">{{ t('kiosk.subtitle') }}</p>

                    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
                        <button v-for="dept in departments" :key="dept.code"
                            :class="[deptBgColors[dept.code], 'kiosk-btn rounded-2xl border p-6 flex flex-col items-center justify-center gap-3 transition-all duration-200']"
                            @click="handleDepartmentClick(dept.code)">
                            <div
                                :class="['w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center', deptColors[dept.code]]">
                                <UIcon :name="deptIcons[dept.code]" class="w-7 h-7 text-white" />
                            </div>
                            <span class="text-sm font-semibold text-white/90">{{ t(deptTranslationKeys[dept.code] ?? '')
                                }}</span>
                            <span class="text-xs text-slate-500">{{ dept.code }}</span>
                        </button>
                    </div>
                </div>

                <!-- RIGHT: Queue Status -->
                <div class="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/5 p-6 flex flex-col">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-sm font-semibold text-slate-300">{{ t('queue.status') }}</h3>
                        <span class="text-xs px-2 py-1 rounded-full bg-blue-500/15 text-blue-400 font-semibold">
                            {{ getWaitingCount() }} {{ t('queue.people') }}
                        </span>
                    </div>

                    <p class="text-xs text-slate-500 uppercase tracking-wider mb-3">{{ t('queue.next') }}</p>

                    <div class="flex-1 overflow-y-auto custom-scrollbar space-y-2">
                        <template v-if="waitingEntries.length > 0">
                            <div v-for="(entry, idx) in waitingEntries" :key="entry.id"
                                class="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 animate-fade-in-up"
                                :style="{ animationDelay: `${idx * 50}ms` }">
                                <div class="w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-xs font-bold text-white shrink-0"
                                    :class="deptColors[entry.departmentCode]">
                                    {{ entry.departmentCode }}
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-semibold text-white">{{ entry.number }}</p>
                                    <p class="text-xs text-slate-500 truncate">{{ entry.department }}</p>
                                </div>
                                <span class="text-xs text-slate-500 shrink-0">{{ formatTime(entry.timestamp) }}</span>
                            </div>
                        </template>
                        <template v-else>
                            <div class="text-center py-12 text-slate-600">
                                <UIcon name="i-lucide-inbox" class="w-8 h-8 mx-auto mb-2" />
                                <p class="text-sm">{{ t('queue.waiting') }}...</p>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <!-- TICKET PRINTING MODAL -->
        <KioskTicketModal :show="showTicketModal" :is-printing="isPrinting" :ticket="printedTicket"
            @close="closeTicketModal" />
    </div>
</template>
