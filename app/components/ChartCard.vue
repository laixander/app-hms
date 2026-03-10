<template>
    <UCard :ui="{ header: 'flex items-center gap-4' }">
        <template #header>
            <UIcon :name="icon || 'i-lucide-bar-chart-3'" class="size-4 text-primary" />
            <div class="uppercase text-xs text-muted font-bold tracking-widest">
                {{ title }}
            </div>
        </template>
        <slot />
    </UCard>
</template>
<script setup lang="ts">
interface Props {
    title?: string
    icon?: string
}

defineProps<Props>()
</script>