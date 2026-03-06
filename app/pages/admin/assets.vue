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
        <div class="flex items-center gap-2 p-1 bg-slate-900 border border-white/5 rounded-xl w-fit">
            <button :class="[
                'px-5 py-2.5 rounded-lg text-sm font-medium transition-all',
                activeTab === 'it' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'
            ]" @click="activeTab = 'it'">
                <span class="flex items-center gap-2">
                    <UIcon name="i-lucide-monitor" class="w-4 h-4" />
                    Admin IT
                </span>
            </button>
            <button :class="[
                'px-5 py-2.5 rounded-lg text-sm font-medium transition-all',
                activeTab === 'medical' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'
            ]" @click="activeTab = 'medical'">
                <span class="flex items-center gap-2">
                    <UIcon name="i-lucide-heart-pulse" class="w-4 h-4" />
                    Medical Equipment
                </span>
            </button>
        </div>

        <!-- Summary Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="stat-card bg-slate-900 border border-white/5">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total</span>
                    <div class="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center">
                        <UIcon name="i-lucide-box" class="w-4 h-4 text-blue-400" />
                    </div>
                </div>
                <p class="text-3xl font-black text-white">{{ stats.total }}</p>
                <p class="text-xs text-slate-500 mt-1">assets</p>
            </div>
            <div class="stat-card bg-slate-900 border border-white/5">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Operational</span>
                    <div class="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                        <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-emerald-400" />
                    </div>
                </div>
                <p class="text-3xl font-black text-emerald-400">{{ stats.operational }}</p>
                <p class="text-xs text-slate-500 mt-1">running well</p>
            </div>
            <div class="stat-card bg-slate-900 border border-white/5">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Maintenance Due</span>
                    <div class="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center">
                        <UIcon name="i-lucide-wrench" class="w-4 h-4 text-amber-400" />
                    </div>
                </div>
                <p class="text-3xl font-black text-amber-400">{{ stats.maintenance }}</p>
                <p class="text-xs text-slate-500 mt-1">needs attention</p>
            </div>
            <div class="stat-card bg-slate-900 border border-white/5">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Critical</span>
                    <div class="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center">
                        <UIcon name="i-lucide-alert-triangle" class="w-4 h-4 text-red-400" />
                    </div>
                </div>
                <p class="text-3xl font-black text-red-400">{{ stats.critical }}</p>
                <p class="text-xs text-slate-500 mt-1">poor / critical</p>
            </div>
        </div>

        <!-- Inventory Table -->
        <div class="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="border-b border-white/5">
                            <th
                                class="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Asset ID</th>
                            <th
                                class="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Name</th>
                            <th
                                class="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Category</th>
                            <th
                                class="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Location</th>
                            <th
                                class="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Condition</th>
                            <th
                                class="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Last Maintenance</th>
                            <th
                                class="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Assigned To</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="asset in currentAssets" :key="asset.id"
                            class="border-b border-white/3 hover:bg-white/3 transition-colors">
                            <td class="px-5 py-3 text-sm font-mono text-blue-400">{{ asset.id }}</td>
                            <td class="px-5 py-3 text-sm text-white font-medium">{{ asset.name }}</td>
                            <td class="px-5 py-3 text-sm text-slate-400">{{ asset.category }}</td>
                            <td class="px-5 py-3 text-sm text-slate-400">{{ asset.location }}</td>
                            <td class="px-5 py-3">
                                <span
                                    :class="[conditionConfig[asset.condition]?.bg, 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize']">
                                    {{ asset.condition }}
                                </span>
                            </td>
                            <td class="px-5 py-3 text-sm text-slate-400">{{ asset.lastMaintenance }}</td>
                            <td class="px-5 py-3 text-sm text-slate-400">{{ asset.assignedTo }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
