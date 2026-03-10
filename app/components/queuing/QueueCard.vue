<template>
    <UAlert variant="subtle" color="neutral" orientation="horizontal" :ui="{ title: 'text-lg font-extrabold leading-4 mt-1', description: 'text-xs leading-3 opacity-60', actions: 'text-xs opacity-60' }" class="rounded-xl">
        <template #leading>
            <UBadge :icon="icon" :color="color" size="lg" class="flex justify-center rounded-lg size-10" />
        </template>
        <template #title>
            {{ ticketNumber }}
        </template>
        <template #description>
            {{ department }}
        </template>
        <template #actions>
            {{ time }}
        </template>
    </UAlert>
</template>

<script setup lang="ts">
interface Props {
    ticketNumber?: string
    department?: string
    time?: string
    icon?: string
    color?: "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral" | "purple" | "pink" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "fuchsia" | "rose"
}

defineProps<Props>()
</script>