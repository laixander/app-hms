<template>
    <UCard :ui="{ root: 'cursor-pointer hover:bg-muted transition duration-200', body: 'sm:p-4 flex items-center gap-2' }" @click="open = true">
        <UBadge :icon="icon" :color="color" class="flex justify-center rounded-lg size-9" />
        <div class="flex flex-col flex-1">
            <div class="text-sm font-bold font-mono leading-5 tracking-wide">{{ ticketNumber }}</div>
            <div class="text-xs text-muted leading-4">{{ department }}</div>
        </div>
        <div class="text-xs text-muted font-mono">{{ time }}</div>
    </UCard>

    <UModal v-model:open="open" :title="ticketNumber" :description="department">
        <template #content>
            <div class="p-6">
                <div class="flex flex-col items-center gap-4">
                    <UBadge :icon="icon" :color="color" size="xl" class="rounded-xl size-16 flex justify-center text-4xl" />
                    <div class="text-center">
                        <div class="text-3xl font-extrabold font-mono">{{ ticketNumber }}</div>
                        <div class="text-sm text-muted">{{ department }}</div>
                    </div>
                    <div class="w-full bg-muted rounded-lg p-6 space-y-4">
                        <div class="flex justify-between text-sm">
                            <span class="text-muted">Time Issued</span>
                            <span class="font-semibold font-mono">{{ time }}</span>
                        </div>
                        <!-- <div class="flex justify-between text-sm">
                            <span class="text-muted">Status</span>
                            <span class="font-semibold">{{ status }}</span>
                        </div> -->
                        <div class="flex justify-between text-sm">
                            <span class="text-muted">Position in Queue</span>
                            <span class="font-semibold font-mono">#{{ position }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-muted">Est. Wait Time</span>
                            <span class="font-semibold font-mono">~{{ estWaitTime }} min</span>
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
    // status?: string
    position?: number
    estWaitTime?: string
}

defineProps<Props>()

const open = ref(false)
</script>
