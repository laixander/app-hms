<template>
    <UCard :ui="{ body: 'flex flex-col gap-4' }">
        <div class="flex items-center justify-between">
            <div class="uppercase text-xs text-muted font-bold tracking-widest">
                {{ title }}
            </div>
            <UBadge :icon="icon" :color="color" class="size-10 rounded-lg flex justify-center" variant="soft" />
        </div>
        <div>
            <div class="text-4xl font-extrabold font-mono">{{ value || 0 }}</div>
            <div class="text-xs text-dimmed">{{ description }}</div>
        </div>
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
