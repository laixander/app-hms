<template>
    <UCard
        :ui="{ root: 'cursor-pointer hover:bg-muted transition duration-200', body: 'sm:p-4 flex items-center gap-2' }"
        @click="status === 'on_hold' ? openHold = true : openDetails = true">
        <UBadge :icon="icon" :color="color" class="flex justify-center rounded-lg size-9" />
        <div class="flex flex-col flex-1">
            <div class="text-sm font-bold font-mono leading-5 tracking-wide">{{ ticketNumber }}</div>
            <div class="text-xs text-muted leading-4">{{ department }}</div>
        </div>
        <div class="text-xs text-muted font-mono">{{ time }}</div>
    </UCard>

    <!-- Details Modal for Waiting Tickets -->
    <UModal v-model:open="openDetails" :title="ticketNumber" :description="department">
        <template #content>
            <div class="p-6">
                <div class="flex flex-col items-center gap-4">
                    <UBadge :icon="icon" :color="color" size="xl"
                        class="rounded-xl size-16 flex justify-center text-4xl" />
                    <div class="text-center">
                        <div class="text-3xl font-extrabold font-mono">{{ ticketNumber }}</div>
                        <div class="text-sm text-muted">{{ department }}</div>
                    </div>
                    <div class="w-full bg-muted rounded-lg p-6 space-y-4">
                        <div class="flex justify-between text-sm">
                            <span class="text-muted">Time Issued</span>
                            <span class="font-semibold font-mono">{{ time }}</span>
                        </div>
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

    <!-- Management Modal for On Hold Tickets -->
    <UModal v-model:open="openHold">
        <template #header="{ close }">
            <div class="flex justify-between items-center gap-2 w-full">
                <div>
                    <div class="flex items-center gap-2">
                        <UIcon name="i-lucide-pause" class="size-4 text-warning" />
                        <div class="uppercase text-sm text-warning font-bold">
                            Manage Held Ticket
                        </div>
                    </div>
                    <div class="text-sm text-muted leading-relaxed">
                        Resume or cancel this held patient ticket
                    </div>
                </div>
                <UButton icon="i-lucide-x" variant="ghost" color="neutral" @click="close" />
            </div>
        </template>
        <template #body>
            <div class="flex flex-col items-center gap-4">
                <UBadge :icon="icon" :color="color" size="xl" class="rounded-xl size-16 flex justify-center text-4xl" />
                <div class="text-center">
                    <div class="text-3xl font-extrabold font-mono">{{ ticketNumber }}</div>
                    <div class="text-sm text-muted">{{ department }}</div>
                    <UBadge label="On Hold" color="warning" variant="subtle" class="rounded-full mt-2" />
                </div>
                <div class="w-full bg-muted rounded-lg p-6 space-y-4">
                    <div class="flex justify-between text-sm">
                        <span class="text-muted">Time Issued</span>
                        <span class="font-semibold font-mono">{{ time }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-muted">Time On Hold</span>
                        <span class="font-semibold font-mono">~{{ estWaitTime }} min</span>
                    </div>
                </div>
                <UAlert icon="i-lucide-phone-forwarded" title="Resume Service"
                    description="Call this ticket back to serving. Current serving patient will be completed first."
                    variant="soft" />
                <UAlert icon="i-lucide-user-x" title="Skip Ticket"
                    description="Permanently skip this patient. They will need to get a new ticket." variant="soft"
                    color="error" />
            </div>
            <div class="flex justify-end gap-2 w-full mt-6">
                <UButton label="Cancel" variant="ghost" color="neutral" :ui="uiButtonConfig"
                    @click="openHold = false" />
                <UButton label="Skip" variant="solid" color="error" :ui="uiButtonConfig" @click="handleSkip" />
                <UButton label="Resume" variant="solid" :ui="uiButtonConfig" @click="handleResume" />
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import type { AppColor } from '~/types/ui'

interface Props {
    id: number
    ticketNumber: string
    department?: string
    time?: string
    icon?: string
    color?: AppColor
    status?: 'waiting' | 'serving' | 'on_hold' | 'skipped' | 'completed'
    position?: number
    estWaitTime?: string
}

const props = defineProps<Props>()

const openDetails = ref(false)
const openHold = ref(false)
const { uiButtonConfig } = useAppUI()
const { resumeTicket, skipTicket } = useQueueState()
const toast = useToast()

function handleResume() {
    resumeTicket(props.id)
    openHold.value = false
    toast.add({
        title: `Resuming Ticket: ${props.ticketNumber}`,
        description: 'Ticket moved back to active service.',
        icon: 'i-lucide-phone-forwarded',
        color: 'success'
    })
}

function handleSkip() {
    skipTicket(props.id)
    openHold.value = false
    toast.add({
        title: `Skipped Ticket: ${props.ticketNumber}`,
        description: 'Ticket marked as skipped.',
        icon: 'i-lucide-user-x',
        color: 'error'
    })
}
</script>
