<template>
    <!-- <UAlert variant="subtle" color="neutral" orientation="horizontal"
        :ui="{ title: 'text-md text-default font-bold leading-4', description: 'text-xs leading-3 opacity-60', actions: 'text-xs opacity-60' }"
        class="rounded-xl">
        <template #leading>
            <UBadge :icon="icon" :color="color" size="lg" class="flex justify-center rounded-lg size-10" />
        </template>z
        <template #title>
            {{ ticketNumber }}
        </template>
        <template #description>
            {{ department }}
        </template>
        <template #actions>
            {{ time }}
        </template>
    </UAlert> -->
    <UCard :ui="{ body: 'sm:p-4 flex items-center gap-2' }" class="cursor-pointer" @click="open = true">
        <UBadge :icon="icon" :color="color" class="flex justify-center rounded-lg size-9" />
        <div class="flex flex-col flex-1">
            <div class="text-sm font-bold leading-5 tracking-wide">{{ ticketNumber }}</div>
            <div class="text-xs text-muted leading-4">{{ department }}</div>
        </div>
        <div class="text-xs text-muted">{{ time }}</div>
    </UCard>

    <UModal v-model:open="open" :title="ticketNumber" :description="department">
        <template #content>
            <div class="p-6">
                <div class="flex flex-col items-center gap-4">
                    <UBadge :icon="icon" :color="color" size="xl" class="rounded-xl size-16 flex justify-center text-4xl" />
                    <div class="text-center">
                        <div class="text-3xl font-extrabold">{{ ticketNumber }}</div>
                        <div class="text-sm text-muted">{{ department }}</div>
                    </div>
                    <div class="w-full bg-muted rounded-lg p-6">
                        <div class="flex justify-between text-sm">
                            <span class="text-muted">Wait Time</span>
                            <span class="font-semibold">{{ time }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import type { AppColor } from '~/types/ui'

interface Props {
    ticketNumber?: string
    department?: string
    time?: string
    icon?: string
    color?: AppColor
}

defineProps<Props>()

const open = ref(false)
</script>
