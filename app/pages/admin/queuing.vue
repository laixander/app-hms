<script setup lang="ts">
const { state, departments, callNext, skipCurrent, getWaitingEntries, getWaitTimeByDept } = useQueueState()

const toast = useToast()

const paAlertPlaying = ref(false)
const lastCalledNumber = ref('')

function handleCallNext() {
    const entry = callNext()
    if (entry) {
        lastCalledNumber.value = entry.number
        paAlertPlaying.value = true

        // PA System Alert
        toast.add({
            title: `🔊 Now Serving: ${entry.number}`,
            description: `${entry.department} — Please proceed to the counter`,
            color: 'info',
            duration: 5000
        })

        // Audio beep simulation via AudioContext
        if (typeof AudioContext !== 'undefined') {
            try {
                const ctx = new AudioContext()
                const osc = ctx.createOscillator()
                const gain = ctx.createGain()
                osc.connect(gain)
                gain.connect(ctx.destination)
                osc.frequency.value = 880
                gain.gain.value = 0.3
                osc.start()
                setTimeout(() => {
                    osc.stop()
                    ctx.close()
                }, 300)
            } catch { }
        }

        setTimeout(() => {
            paAlertPlaying.value = false
        }, 3000)
    } else {
        toast.add({
            title: 'Queue Empty',
            description: 'No more patients waiting in the queue',
            color: 'neutral',
            duration: 3000
        })
    }
}

function handleSkip() {
    skipCurrent()
    toast.add({
        title: 'Patient Skipped',
        description: 'Current patient has been skipped',
        color: 'warning',
        duration: 3000
    })
}

const waitingList = computed(() => getWaitingEntries())

const deptColors: Record<string, string> = {
    GM: 'bg-blue-500',
    PD: 'bg-violet-500',
    OB: 'bg-pink-500',
    DN: 'bg-cyan-500',
    LB: 'bg-amber-500',
    PH: 'bg-emerald-500'
}

const statusColors: Record<string, string> = {
    waiting: 'neutral',
    serving: 'info',
    completed: 'success',
    skipped: 'warning'
}

function formatTime(ts: number): string {
    return new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

function getWaitDuration(ts: number): string {
    const mins = Math.round((Date.now() - ts) / 60000)
    if (mins < 1) return '<1 min'
    return `${mins} min`
}

// Chart rendering
const chartCanvas = ref<HTMLCanvasElement | null>(null)

function drawChart() {
    const canvas = chartCanvas.value
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const data = getWaitTimeByDept()
    const codes = departments.map(d => d.code)
    const values = codes.map(c => data[c] || 0)
    const maxVal = Math.max(...values, 1)

    const w = rect.width
    const h = rect.height
    const padding = { top: 20, right: 20, bottom: 40, left: 50 }
    const chartW = w - padding.left - padding.right
    const chartH = h - padding.top - padding.bottom
    const barWidth = Math.min(40, (chartW / codes.length) - 10)

    // Clear
    ctx.clearRect(0, 0, w, h)

    // Grid lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)'
    ctx.lineWidth = 1
    for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartH * i / 4)
        ctx.beginPath()
        ctx.moveTo(padding.left, y)
        ctx.lineTo(w - padding.right, y)
        ctx.stroke()

        // Y-axis labels
        ctx.fillStyle = 'rgba(148, 163, 184, 0.5)'
        ctx.font = '11px Inter, sans-serif'
        ctx.textAlign = 'right'
        ctx.fillText(`${Math.round(maxVal * (4 - i) / 4)}m`, padding.left - 8, y + 4)
    }

    // Bars
    const barColors = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b', '#22c55e']
    const gap = chartW / codes.length

    codes.forEach((code, i) => {
        const x = padding.left + gap * i + (gap - barWidth) / 2
        const val = values[i] ?? 0
        const barH = (val / maxVal) * chartH
        const y = padding.top + chartH - barH

        // Bar gradient
        const color = barColors[i] || '#3b82f6'
        const gradient = ctx.createLinearGradient(x, y, x, y + barH)
        gradient.addColorStop(0, color)
        gradient.addColorStop(1, color + '80')
        ctx.fillStyle = gradient

        // Rounded top bar
        const radius = Math.min(6, barWidth / 2)
        ctx.beginPath()
        ctx.moveTo(x, y + barH)
        ctx.lineTo(x, y + radius)
        ctx.quadraticCurveTo(x, y, x + radius, y)
        ctx.lineTo(x + barWidth - radius, y)
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius)
        ctx.lineTo(x + barWidth, y + barH)
        ctx.closePath()
        ctx.fill()

        // Value label on top
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
        ctx.font = 'bold 11px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(`${val}`, x + barWidth / 2, y - 6)

        // X-axis label
        ctx.fillStyle = 'rgba(148, 163, 184, 0.6)'
        ctx.font = '11px Inter, sans-serif'
        ctx.fillText(code, x + barWidth / 2, h - padding.bottom + 20)
    })
}

onMounted(() => {
    nextTick(() => drawChart())
})

watch(() => state.value.lastUpdate, () => {
    nextTick(() => drawChart())
})
</script>

<template>
    <div class="space-y-6">
        <!-- Stats Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="stat-card bg-slate-900 border border-white/5" style="--accent: #3b82f6;">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Now Serving</span>
                    <div class="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center">
                        <UIcon name="i-lucide-volume-2" class="w-4 h-4 text-blue-400"
                            :class="{ 'animate-pulse': paAlertPlaying }" />
                    </div>
                </div>
                <p class="text-3xl font-black text-white">
                    {{ state.currentServing?.number || '---' }}
                </p>
                <p class="text-xs text-slate-500 mt-1">{{ state.currentServing?.department || 'No patient' }}</p>
            </div>

            <div class="stat-card bg-slate-900 border border-white/5">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Waiting</span>
                    <div class="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center">
                        <UIcon name="i-lucide-clock" class="w-4 h-4 text-amber-400" />
                    </div>
                </div>
                <p class="text-3xl font-black text-white">{{ waitingList.length }}</p>
                <p class="text-xs text-slate-500 mt-1">patients in queue</p>
            </div>

            <div class="stat-card bg-slate-900 border border-white/5">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Served Today</span>
                    <div class="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                        <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-emerald-400" />
                    </div>
                </div>
                <p class="text-3xl font-black text-white">{{state.entries.filter(e => e.status === 'completed').length
                }}</p>
                <p class="text-xs text-slate-500 mt-1">completed</p>
            </div>

            <div class="stat-card bg-slate-900 border border-white/5">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Tickets</span>
                    <div class="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center">
                        <UIcon name="i-lucide-ticket" class="w-4 h-4 text-violet-400" />
                    </div>
                </div>
                <p class="text-3xl font-black text-white">{{ state.entries.length }}</p>
                <p class="text-xs text-slate-500 mt-1">today</p>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-3">
            <button
                class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm hover:from-blue-600 hover:to-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                @click="handleCallNext">
                <UIcon name="i-lucide-phone-forwarded" class="w-5 h-5" />
                Call Next Number
            </button>

            <button v-if="state.currentServing"
                class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all active:scale-95"
                @click="handleSkip">
                <UIcon name="i-lucide-skip-forward" class="w-4 h-4" />
                Skip Current
            </button>
        </div>

        <!-- PA Alert Banner -->
        <Transition name="slide">
            <div v-if="paAlertPlaying"
                class="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 animate-fade-in-up">
                <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center animate-pulse">
                    <UIcon name="i-lucide-volume-2" class="w-5 h-5 text-blue-400" />
                </div>
                <div>
                    <p class="text-sm font-semibold text-blue-300">PA System Alert</p>
                    <p class="text-xs text-blue-400/70">Number {{ lastCalledNumber }}, please proceed to the counter</p>
                </div>
            </div>
        </Transition>

        <div class="flex flex-col lg:grid lg:grid-cols-3 gap-6">
            <!-- Live Queue List -->
            <div class="w-full lg:col-span-2 bg-slate-900 border border-white/5 rounded-2xl p-5">
                <h3 class="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <UIcon name="i-lucide-list" class="w-4 h-4 text-blue-400" />
                    Live Queue
                </h3>

                <div v-if="waitingList.length > 0" class="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                    <div v-for="entry in waitingList" :key="entry.id"
                        class="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-colors">
                        <div
                            :class="[deptColors[entry.departmentCode], 'w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0']">
                            {{ entry.departmentCode }}
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-semibold text-white">{{ entry.number }}</p>
                            <p class="text-xs text-slate-500">{{ entry.department }}</p>
                        </div>
                        <div class="text-right shrink-0">
                            <p class="text-xs text-slate-500">{{ formatTime(entry.timestamp) }}</p>
                            <p class="text-xs text-amber-400/70">{{ getWaitDuration(entry.timestamp) }}</p>
                        </div>
                        <UBadge :color="statusColors[entry.status] as any" variant="subtle" size="xs">
                            {{ entry.status }}
                        </UBadge>
                    </div>
                </div>

                <div v-else class="text-center py-12 text-slate-600">
                    <UIcon name="i-lucide-inbox" class="w-10 h-10 mx-auto mb-3" />
                    <p class="text-sm">No patients waiting</p>
                    <p class="text-xs text-slate-700">Tickets will appear here when generated from the kiosk</p>
                </div>
            </div>

            <!-- Wait Time Chart -->
            <div class="bg-slate-900 border border-white/5 rounded-2xl p-5">
                <h3 class="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <UIcon name="i-lucide-bar-chart-3" class="w-4 h-4 text-blue-400" />
                    Avg. Wait Time by Dept
                </h3>
                <div class="h-64">
                    <canvas ref="chartCanvas" class="chart-canvas" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
