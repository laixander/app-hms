<script setup lang="ts" generic="T extends Record<string, any>">
interface Column {
    key: string
    label: string
    align?: 'left' | 'center' | 'right'
}

interface Props {
    columns: Column[]
    rows: T[]
    rowClass?: (row: T) => string
}

defineProps<Props>()

defineSlots<{
    [key: `cell-${string}`]: (props: {
        value: any
        item: T
        index: number
    }) => any
}>()
</script>

<template>
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden">
        <div class="overflow-x-auto custom-scrollbar">
            <table class="w-full">
                <thead>
                    <tr class="border-b border-slate-200 dark:border-white/5">
                        <th v-for="col in columns" :key="col.key" :class="[
                            'px-5 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider',
                            col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                        ]">
                            {{ col.label }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in rows" :key="index" :class="[
                        'border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors',
                        rowClass?.(row)
                    ]">
                        <td v-for="col in columns" :key="col.key" :class="[
                            'px-5 py-3 text-sm',
                            col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                        ]">
                            <slot :name="`cell-${col.key}`" :value="row[col.key]" :item="row" :index="index">
                                <span class="text-slate-500 dark:text-slate-400">
                                    {{ row[col.key] }}
                                </span>
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.1);
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(148, 163, 184, 0.2);
}
</style>
