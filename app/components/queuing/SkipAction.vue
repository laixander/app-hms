<template>
    <UModal :ui="{ body: 'space-y-6' }">
        <UButton label="Skip" icon="i-lucide-skip-forward" variant="outline" :ui="uiButtonConfig" :disabled="!current" />
        <template #header="{ close }">
            <div class="flex items-center gap-2 w-full">
                <UIcon name="i-lucide-skip-forward" class="size-4 text-error" />
                <div class="uppercase text-sm text-error font-bold flex-1">
                    Skip Current Ticket
                </div>
                <UButton icon="i-lucide-x" variant="ghost" color="neutral" @click="close" />
            </div>
        </template>
        <template #body="{ close }">
            <template v-if="current">
                <div class="text-sm text-muted leading-relaxed">
                    Ticket <span class="font-bold font-mono">{{ current.number }}</span> will be marked as skipped. This action is typically used when a patient doesn't respond after being called.
                </div>
                <UAlert icon="i-lucide-triangle-alert" title="Skip Warning" description="The skipped patient will need to request a new ticket number if they return. This action cannot be undone." color="error" variant="soft" />
                <div class="w-full bg-muted rounded-lg p-6 space-y-4">
                    <div class="flex justify-between text-sm">
                        <span class="text-muted">Ticket Number</span>
                        <span class="font-bold font-mono">{{ current.number }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-muted">Status Change</span>
                        <span class="font-semibold flex items-center gap-2 text-error">Serving <UIcon name="i-lucide-arrow-right" class="size-4" /> Skipped</span>
                    </div>
                    <div class="flex justify-between text-sm" v-if="nextInQueue">
                        <span class="text-muted">Next In Queue</span>
                        <span class="font-bold font-mono">{{ nextInQueue.number }}</span>
                    </div>
                </div>
                <div class="flex justify-end gap-2 w-full mt-6">
                    <UButton label="Cancel" variant="ghost" color="neutral" :ui="uiButtonConfig" @click="close" />
                    <UButton label="Confirm Skip" variant="solid" color="error" :ui="uiButtonConfig" @click="() => handleSkip(close)" />
                </div>
            </template>
            <div v-else class="text-center py-4 text-muted">
                No ticket currently being served.
            </div>
        </template>
    </UModal>
</template>
<script setup lang="ts">
const { uiButtonConfig } = useAppUI()
const { state, skipCurrent } = useQueueState()

const current = computed(() => state.value.currentServing)
const nextInQueue = computed(() => state.value.entries.find(e => e.status === 'waiting'))

const toast = useToast()

function handleSkip(close: () => void) {
    if (!current.value) return
    
    const ticketNumber = current.value.number
    skipCurrent()
    
    toast.add({
        title: 'Ticket Skipped',
        description: `Ticket ${ticketNumber} has been marked as skipped.`,
        icon: 'i-lucide-skip-forward',
        color: 'error'
    })
    close()
}
</script>