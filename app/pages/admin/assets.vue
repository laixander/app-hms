<script setup lang="ts">
import type { Asset } from '~/types/admin'

const activeTab = ref<'it' | 'medical'>('it')

const { data: itAssets } = await useFetch<Asset[]>('/api/assets', { query: { type: 'it' }, default: () => [] })
const { data: medicalAssets } = await useFetch<Asset[]>('/api/assets', { query: { type: 'medical' }, default: () => [] })

const currentAssets = computed(() => activeTab.value === 'it' ? itAssets.value : medicalAssets.value)

const conditionConfig: Record<string, { color: string; bg: string }> = {
    excellent: { color: 'success', bg: 'bg-emerald-500/15 text-emerald-400' },
    good: { color: 'info', bg: 'bg-blue-500/15 text-blue-400' },
    fair: { color: 'warning', bg: 'bg-amber-500/15 text-amber-400' },
    poor: { color: 'error', bg: 'bg-red-500/15 text-red-400' },
    critical: { color: 'error', bg: 'bg-purple-500/15 text-purple-400' }
}

const stats = computed(() => {
    const assets = currentAssets.value
    return {
        total: assets.length,
        operational: assets.filter(a => a.condition === 'excellent' || a.condition === 'good').length,
        maintenance: assets.filter(a => a.condition === 'fair').length,
        critical: assets.filter(a => a.condition === 'poor' || a.condition === 'critical').length
    }
})
</script>

<template>
    <div class="space-y-6">
        <!-- Tab Toggle -->
        <div
            class="flex items-center gap-2 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl w-fit">
            <button :class="[
                'px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                activeTab === 'it' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
            ]" @click="activeTab = 'it'">
                <span class="flex items-center gap-2">
                    <UIcon name="i-lucide-monitor" class="w-4 h-4" />
                    Admin IT
                </span>
            </button>
            <button :class="[
                'px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                activeTab === 'medical' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
            ]" @click="activeTab = 'medical'">
                <span class="flex items-center gap-2">
                    <UIcon name="i-lucide-heart-pulse" class="w-4 h-4" />
                    Medical Equipment
                </span>
            </button>
        </div>

        <!-- Summary Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total" :value="stats.total" subtext="assets" icon="i-lucide-box" color="blue" />

            <StatCard title="Operational" :value="stats.operational" subtext="running well" icon="i-lucide-check-circle"
                color="emerald" value-class="text-emerald-500 dark:text-emerald-400" />

            <StatCard title="Maintenance Due" :value="stats.maintenance" subtext="needs attention"
                icon="i-lucide-wrench" color="amber" value-class="text-amber-500 dark:text-amber-400" />

            <StatCard title="Critical" :value="stats.critical" subtext="poor / critical" icon="i-lucide-alert-triangle"
                color="red" value-class="text-red-500 dark:text-red-400" />
        </div>

        <!-- Inventory Table -->
        <DataTable :columns="[
            { key: 'id', label: 'Asset ID' },
            { key: 'name', label: 'Name' },
            { key: 'category', label: 'Category' },
            { key: 'location', label: 'Location' },
            { key: 'condition', label: 'Condition' },
            { key: 'lastMaintenance', label: 'Last Maintenance' },
            { key: 'assignedTo', label: 'Assigned To' }
        ]" :rows="currentAssets">
            <template #cell-id="{ value }">
                <span class="font-mono text-blue-500 dark:text-blue-400">{{ value }}</span>
            </template>
            <template #cell-name="{ value }">
                <span class="text-slate-900 dark:text-white font-medium">{{ value }}</span>
            </template>
            <template #cell-condition="{ value }">
                <span
                    :class="[conditionConfig[value]?.bg, 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize']">
                    {{ value }}
                </span>
            </template>
        </DataTable>
    </div>
</template>
