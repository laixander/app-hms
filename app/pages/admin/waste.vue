<script setup lang="ts">
import type { DisposalLog } from '~/types/admin'

const { data: wasteData } = await useFetch<{ categories: { name: string; color: string; value: number; fillLevel: number }[]; weeklyData: { day: string; kg: number }[] }>('/api/waste/categories', {
    default: () => ({ categories: [], weeklyData: [] })
})
const wasteCategories = computed(() => wasteData.value.categories)
const weeklyData = computed(() => wasteData.value.weeklyData)

const { data: disposalLogs } = await useFetch<DisposalLog[]>('/api/waste/logs', { default: () => [] })

const logStatusConfig: Record<string, { color: string; label: string }> = {
    completed: { color: 'success', label: 'Completed' },
    pending: { color: 'warning', label: 'Pending' },
    'in-transit': { color: 'info', label: 'In Transit' }
}

function getFillColor(level: number): string {
    if (level >= 80) return '#ef4444'
    if (level >= 50) return '#f59e0b'
    return '#22c55e'
}

function getFillBg(level: number): string {
    if (level >= 80) return 'bg-red-500/15 border-red-500/20'
    if (level >= 50) return 'bg-amber-500/15 border-amber-500/20'
    return 'bg-emerald-500/15 border-emerald-200 dark:border-emerald-500/20'
}

function getFillStatus(level: number): string {
    if (level >= 80) return 'Needs immediate disposal'
    if (level >= 50) return 'Schedule disposal soon'
    return 'Adequate capacity'
}

// Pie Chart
const pieCanvas = ref<HTMLCanvasElement | null>(null)

function drawPieChart() {
    const canvas = pieCanvas.value
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const w = rect.width
    const h = rect.height
    const cx = w / 2
    const cy = h / 2
    const radius = Math.min(cx, cy) - 20

    const total = wasteCategories.value.reduce((sum: number, c: { value: number }) => sum + c.value, 0)
    let startAngle = -Math.PI / 2

    ctx.clearRect(0, 0, w, h)

    wasteCategories.value.forEach((cat) => {
        const sliceAngle = (cat.value / total) * 2 * Math.PI

        // Draw slice
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle)
        ctx.closePath()
        ctx.fillStyle = cat.color
        ctx.fill()

        // Thin white gap
        ctx.strokeStyle = '#0f172a'
        ctx.lineWidth = 2
        ctx.stroke()

        // Label
        const midAngle = startAngle + sliceAngle / 2
        const labelR = radius * 0.65
        const lx = cx + Math.cos(midAngle) * labelR
        const ly = cy + Math.sin(midAngle) * labelR
        const pct = Math.round((cat.value / total) * 100)

        if (pct >= 8) {
            ctx.fillStyle = '#ffffff'
            ctx.font = 'bold 12px Inter, sans-serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(`${pct}%`, lx, ly)
        }

        startAngle += sliceAngle
    })

    // Center hole (donut)
    ctx.beginPath()
    ctx.arc(cx, cy, radius * 0.4, 0, Math.PI * 2)
    ctx.fillStyle = '#0f172a'
    ctx.fill()

    // Center text
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 18px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`${total}`, cx, cy - 6)
    ctx.fillStyle = '#94a3b8'
    ctx.font = '10px Inter, sans-serif'
    ctx.fillText('units', cx, cy + 10)
}

// Bar Chart
const barCanvas = ref<HTMLCanvasElement | null>(null)

function drawBarChart() {
    const canvas = barCanvas.value
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const w = rect.width
    const h = rect.height
    const padding = { top: 20, right: 20, bottom: 40, left: 45 }
    const chartW = w - padding.left - padding.right
    const chartH = h - padding.top - padding.bottom

    const maxVal = Math.max(...weeklyData.value.map(d => d.kg), 1)
    const barWidth = Math.min(35, (chartW / weeklyData.value.length) - 10)

    ctx.clearRect(0, 0, w, h)

    // Grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)'
    ctx.lineWidth = 1
    for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartH * i / 4)
        ctx.beginPath()
        ctx.moveTo(padding.left, y)
        ctx.lineTo(w - padding.right, y)
        ctx.stroke()

        ctx.fillStyle = 'rgba(148, 163, 184, 0.4)'
        ctx.font = '10px Inter, sans-serif'
        ctx.textAlign = 'right'
        ctx.fillText(`${Math.round(maxVal * (4 - i) / 4)}`, padding.left - 6, y + 4)
    }

    // Bars
    const gap = chartW / weeklyData.value.length

    weeklyData.value.forEach((item, i) => {
        const x = padding.left + gap * i + (gap - barWidth) / 2
        const barH = (item.kg / maxVal) * chartH
        const y = padding.top + chartH - barH

        const gradient = ctx.createLinearGradient(x, y, x, y + barH)
        gradient.addColorStop(0, '#3b82f6')
        gradient.addColorStop(1, '#3b82f680')
        ctx.fillStyle = gradient

        const radius = Math.min(5, barWidth / 2)
        ctx.beginPath()
        ctx.moveTo(x, y + barH)
        ctx.lineTo(x, y + radius)
        ctx.quadraticCurveTo(x, y, x + radius, y)
        ctx.lineTo(x + barWidth - radius, y)
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius)
        ctx.lineTo(x + barWidth, y + barH)
        ctx.closePath()
        ctx.fill()

        // Value
        ctx.fillStyle = 'rgba(255,255,255,0.6)'
        ctx.font = 'bold 10px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(`${item.kg}`, x + barWidth / 2, y - 6)

        // Label
        ctx.fillStyle = 'rgba(148, 163, 184, 0.6)'
        ctx.font = '11px Inter, sans-serif'
        ctx.fillText(item.day, x + barWidth / 2, h - padding.bottom + 18)
    })
}

onMounted(() => {
    nextTick(() => {
        drawPieChart()
        drawBarChart()
    })
})
</script>

<template>
    <div class="space-y-6">
        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Pie Chart -->
            <div
                class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-200 dark:border-white/5 rounded-2xl p-5">
                <h3 class="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <UIcon name="i-lucide-pie-chart" class="w-4 h-4 text-blue-400" />
                    Waste by Category
                </h3>
                <div class="flex flex-col sm:flex-row items-center gap-6">
                    <div class="h-56 w-56 shrink-0">
                        <canvas ref="pieCanvas" class="chart-canvas" />
                    </div>
                    <div class="space-y-2 flex-1">
                        <div v-for="cat in wasteCategories" :key="cat.name" class="flex items-center gap-2">
                            <span class="w-3 h-3 rounded-sm shrink-0" :style="{ background: cat.color }" />
                            <span class="text-xs text-slate-500 dark:text-slate-400 flex-1">{{ cat.name }}</span>
                            <span class="text-xs font-semibold text-slate-900 dark:text-white">{{ cat.value }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Weekly Trend -->
            <div
                class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-200 dark:border-white/5 rounded-2xl p-5">
                <h3 class="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <UIcon name="i-lucide-trending-up" class="w-4 h-4 text-blue-400" />
                    Weekly Collection Trend (kg)
                </h3>
                <div class="h-56">
                    <canvas ref="barCanvas" class="chart-canvas" />
                </div>
            </div>
        </div>

        <!-- Fill Level Monitors -->
        <div
            class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-200 dark:border-white/5 rounded-2xl p-5">
            <h3 class="text-sm font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <UIcon name="i-lucide-gauge" class="w-4 h-4 text-blue-400" />
                Bin Fill Levels
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="cat in wasteCategories" :key="cat.name"
                    :class="['p-4 rounded-xl border', getFillBg(cat.fillLevel)]">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium text-slate-900 dark:text-white">{{ cat.name }}</span>
                        <span
                            :class="['text-xs font-bold', cat.fillLevel >= 80 ? 'text-red-400' : cat.fillLevel >= 50 ? 'text-amber-400' : 'text-emerald-400']">
                            {{ cat.fillLevel }}%
                        </span>
                    </div>
                    <div class="fill-bar-track">
                        <div class="fill-bar-fill"
                            :style="{ width: cat.fillLevel + '%', background: getFillColor(cat.fillLevel) }" />
                    </div>
                    <p class="text-[10px] text-slate-500 mt-2">{{ getFillStatus(cat.fillLevel) }}</p>
                </div>
            </div>
        </div>

        <!-- Disposal Logs -->
        <div class="space-y-4">
            <div
                class="px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl flex items-center gap-2">
                <UIcon name="i-lucide-clipboard-list" class="w-4 h-4 text-blue-400" />
                <h3 class="text-sm font-semibold text-slate-900 dark:text-white">Disposal Logs</h3>
            </div>
            <DataTable :columns="[
                { key: 'id', label: 'ID' },
                { key: 'date', label: 'Date' },
                { key: 'category', label: 'Category' },
                { key: 'weight', label: 'Weight' },
                { key: 'method', label: 'Method' },
                { key: 'handler', label: 'Handler' },
                { key: 'status', label: 'Status' }
            ]" :rows="disposalLogs">
                <template #cell-id="{ value }">
                    <span class="text-blue-400 font-mono">{{ value }}</span>
                </template>
                <template #cell-category="{ value }">
                    <span class="flex items-center gap-2 text-sm text-slate-900 dark:text-white">
                        <span class="w-2.5 h-2.5 rounded-full shrink-0"
                            :style="{ background: wasteCategories.find(c => c.name === value)?.color || '#94a3b8' }" />
                        {{ value }}
                    </span>
                </template>
                <template #cell-weight="{ value }">
                    <span class="font-mono">{{ value }}</span>
                </template>
                <template #cell-status="{ value }">
                    <UBadge :color="logStatusConfig[value]?.color as any" variant="subtle" size="xs">
                        {{ logStatusConfig[value]?.label }}
                    </UBadge>
                </template>
            </DataTable>
        </div>
    </div>
</template>
