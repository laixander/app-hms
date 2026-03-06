<script setup lang="ts">
interface Props {
    title: string
    value: string | number
    subtext?: string
    icon: string
    color?: 'blue' | 'amber' | 'emerald' | 'violet' | 'red' | 'cyan' | 'pink'
    iconClass?: string
    valueClass?: string
}

const props = withDefaults(defineProps<Props>(), {
    color: 'blue'
})

const colorClasses = {
    blue: 'bg-blue-500/15 text-blue-500 dark:text-blue-400',
    amber: 'bg-amber-500/15 text-amber-500 dark:text-amber-400',
    emerald: 'bg-emerald-500/15 text-emerald-500 dark:text-emerald-400',
    violet: 'bg-violet-500/15 text-violet-500 dark:text-violet-400',
    red: 'bg-red-500/15 text-red-500 dark:text-red-400',
    cyan: 'bg-cyan-500/15 text-cyan-500 dark:text-cyan-400',
    pink: 'bg-pink-500/15 text-pink-500 dark:text-pink-400'
}

const iconColorClass = computed(() => colorClasses[props.color] || colorClasses.blue)
</script>

<template>
    <div class="stat-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-5">
        <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {{ title }}
            </span>
            <div :class="[iconColorClass, 'w-8 h-8 rounded-lg flex items-center justify-center']">
                <UIcon :name="icon" :class="['w-4 h-4', iconClass]" />
            </div>
        </div>
        <p :class="['text-3xl font-black text-slate-900 dark:text-white', valueClass]">
            {{ value }}
        </p>
        <p v-if="subtext" class="text-xs text-slate-500 mt-1">
            {{ subtext }}
        </p>
    </div>
</template>
