<template>
    <UCard :ui="{ root: 'divide-none', header: 'flex items-center justify-between pb-0' }">
        <template #header>
            <div class="uppercase text-xs text-muted font-bold tracking-widest">
                {{ title }}
            </div>
            <UBadge :icon="icon" :color="color" class="size-10 rounded-lg flex justify-center" variant="soft" />
        </template>
        <div class="text-4xl font-bold">{{ value || 0 }}</div>
        <div class="text-xs text-dimmed">{{ description }}</div>
    </UCard>
</template>

<script setup lang="ts">
import type { AppColor } from '~/types/ui'

interface Props {
    title?: string
    value?: string | number
    description?: string
    icon?: string
    color?: AppColor
}

defineProps<Props>()
</script>
