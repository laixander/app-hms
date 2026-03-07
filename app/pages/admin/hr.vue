<script setup lang="ts">
import type { Staff, ShiftEntry, BiometricLog } from '~/types/admin'

const activeSection = ref<'roster' | 'shifts' | 'biometric'>('roster')

const { data: staffRoster } = await useFetch<Staff[]>('/api/hr/staff', { default: () => [] })
const { data: shiftSchedule } = await useFetch<ShiftEntry[]>('/api/hr/shifts', { default: () => [] })
const { data: biometricLogs } = await useFetch<BiometricLog[]>('/api/hr/biometric', { default: () => [] })

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const shiftConfig: Record<string, { label: string; bg: string; text: string }> = {
    morning: { label: 'AM', bg: 'bg-blue-500/20', text: 'text-blue-400' },
    afternoon: { label: 'PM', bg: 'bg-amber-500/20', text: 'text-amber-400' },
    night: { label: 'NT', bg: 'bg-indigo-500/20', text: 'text-indigo-400' }
}

const staffStatusConfig: Record<string, { color: string; label: string }> = {
    'active': { color: 'success', label: 'Active' },
    'on-leave': { color: 'warning', label: 'On Leave' },
    'off-duty': { color: 'neutral', label: 'Off Duty' }
}

const bioStatusConfig: Record<string, { color: string; label: string }> = {
    'on-time': { color: 'success', label: 'On Time' },
    'late': { color: 'error', label: 'Late' },
    'early-out': { color: 'warning', label: 'Early Out' }
}

const avatarColors = ['from-blue-400 to-blue-600', 'from-violet-400 to-violet-600', 'from-pink-400 to-pink-600', 'from-cyan-400 to-cyan-600', 'from-amber-400 to-amber-600', 'from-emerald-400 to-emerald-600', 'from-indigo-400 to-indigo-600', 'from-rose-400 to-rose-600']
</script>

<template>
    <div class="space-y-6">
        <!-- Section Toggle -->
        <div
            class="flex items-center gap-2 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-200 dark:border-white/5 rounded-xl w-fit max-w-full overflow-x-auto custom-scrollbar">
            <button v-for="section in [
                { key: 'roster', label: 'Staff Roster', icon: 'i-lucide-users' },
                { key: 'shifts', label: 'Shift Calendar', icon: 'i-lucide-calendar-days' },
                { key: 'biometric', label: 'Biometric Logs', icon: 'i-lucide-fingerprint' }
            ]" :key="section.key" :class="[
                'px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                activeSection === section.key ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
            ]" @click="activeSection = section.key as any">
                <span class="flex items-center gap-2">
                    <UIcon :name="section.icon" class="w-4 h-4" />
                    {{ section.label }}
                </span>
            </button>
        </div>

        <!-- Staff Roster -->
        <DataTable v-if="activeSection === 'roster'" :columns="[
            { key: 'staff', label: 'Staff' },
            { key: 'department', label: 'Department' },
            { key: 'position', label: 'Position' },
            { key: 'status', label: 'Status' },
            { key: 'contact', label: 'Contact' }
        ]" :rows="staffRoster">
            <template #cell-staff="{ item, index }">
                <div class="flex items-center gap-3">
                    <div
                        :class="['w-9 h-9 rounded-full bg-gradient-to-br flex items-center justify-center text-xs font-bold text-white shrink-0', avatarColors[index % avatarColors.length]]">
                        {{ item.avatar }}
                    </div>
                    <div>
                        <p class="text-sm font-medium text-slate-900 dark:text-white">{{ item.name }}</p>
                        <p class="text-xs text-slate-500">{{ item.id }}</p>
                    </div>
                </div>
            </template>
            <template #cell-status="{ value }">
                <UBadge :color="staffStatusConfig[value]?.color as any" variant="subtle" size="xs">
                    {{ staffStatusConfig[value]?.label }}
                </UBadge>
            </template>
            <template #cell-contact="{ value }">
                <span class="font-mono">{{ value }}</span>
            </template>
        </DataTable>

        <!-- Shift Calendar -->
        <div v-if="activeSection === 'shifts'"
            class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-200 dark:border-white/5 rounded-2xl">
            <div class="flex items-center gap-4 px-5 py-4">
                <h3 class="text-sm font-semibold text-slate-900 dark:text-white">Weekly Schedule</h3>
                <div class="flex items-center gap-3 ml-auto">
                    <span v-for="(config, key) in shiftConfig" :key="key" class="flex items-center gap-1.5 text-xs">
                        <span
                            :class="[config.bg, config.text, 'w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold']">{{
                                config.label }}</span>
                        <span class="text-slate-500 capitalize">{{ key }}</span>
                    </span>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="border-b border-slate-200 dark:border-slate-200 dark:border-white/5">
                            <th
                                class="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider min-w-[180px]">
                                Staff</th>
                            <th v-for="day in days" :key="day"
                                class="text-center px-2 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider min-w-[80px]">
                                {{ day }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="entry in shiftSchedule" :key="entry.staffName"
                            class="border-b border-slate-100 dark:border-white/3">
                            <td class="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">{{ entry.staffName
                                }}</td>
                            <td v-for="(shift, dayIdx) in entry.shifts" :key="dayIdx" class="px-2 py-2 text-center">
                                <span v-if="shift && shiftConfig[shift]"
                                    :class="[shiftConfig[shift].bg, shiftConfig[shift].text, 'shift-block inline-flex items-center justify-center w-full']">
                                    {{ shiftConfig[shift].label }}
                                </span>
                                <span v-else class="text-slate-800 text-xs">—</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Biometric Logs -->
        <div v-if="activeSection === 'biometric'" class="space-y-4">
            <div
                class="px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl flex items-center gap-2">
                <UIcon name="i-lucide-fingerprint" class="w-4 h-4 text-blue-400" />
                <h3 class="text-sm font-semibold text-slate-900 dark:text-white">Clock-In / Clock-Out Records</h3>
            </div>
            <DataTable :columns="[
                { key: 'staffName', label: 'Staff' },
                { key: 'date', label: 'Date' },
                { key: 'clockIn', label: 'Clock In' },
                { key: 'clockOut', label: 'Clock Out' },
                { key: 'hoursWorked', label: 'Hours' },
                { key: 'status', label: 'Status' }
            ]" :rows="biometricLogs">
                <template #cell-clockIn="{ value }">
                    <span class="text-emerald-400 font-mono">{{ value }}</span>
                </template>
                <template #cell-clockOut="{ value }">
                    <span class="text-amber-400 font-mono">{{ value }}</span>
                </template>
                <template #cell-hoursWorked="{ value }">
                    <span class="font-mono">{{ value }}</span>
                </template>
                <template #cell-status="{ value }">
                    <UBadge :color="bioStatusConfig[value]?.color as any" variant="subtle" size="xs">
                        {{ bioStatusConfig[value]?.label }}
                    </UBadge>
                </template>
            </DataTable>
        </div>
    </div>
</template>
