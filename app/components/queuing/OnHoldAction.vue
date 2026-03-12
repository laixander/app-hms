<template>
    <UModal :ui="{ body: 'space-y-6' }">
        <UButton label="Hold" icon="i-lucide-pause" variant="outline" :ui="uiButtonConfig" :disabled="!current" />
        <template #header="{ close }">
            <div class="flex items-center gap-2 w-full">
                <UIcon name="i-lucide-pause" class="size-4 text-warning" />
                <div class="uppercase text-sm text-warning font-bold flex-1">
                    Put Ticket On Hold
                </div>
                <UButton icon="i-lucide-x" variant="ghost" color="neutral" @click="close" />
            </div>
        </template>
        <template #body="{ close }">
            <template v-if="current">
                <div class="text-sm text-muted leading-relaxed">
                    Ticket <span class="font-bold font-mono">{{ current.number }}</span> will be placed on hold. The patient will keep their position and can be called again later.
                </div>
                <UAlert icon="i-lucide-triangle-alert" title="Hold Notice" description="The patient will be notified that their turn is temporarily paused. The next number in the queue will be called automatically." color="warning" variant="soft" />
                <div class="w-full bg-muted rounded-lg p-6 space-y-4">
                    <div class="flex justify-between text-sm">
                        <span class="text-muted">Ticket Number</span>
                        <span class="font-bold font-mono">{{ current.number }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-muted">Status Change</span>
                        <span class="font-semibold flex items-center gap-2 text-warning">Serving <UIcon name="i-lucide-arrow-right" class="size-4" /> On Hold</span>
                    </div>
                </div>
                <div class="flex justify-end gap-2 w-full mt-6">
                    <UButton label="Cancel" variant="ghost" color="neutral" :ui="uiButtonConfig" @click="close" />
                    <UButton label="Put On Hold" variant="solid" color="warning" :ui="uiButtonConfig" @click="() => handleHold(close)" />
                </div>
            </template>
            <div v-else class="text-center py-4 text-muted">
                No ticket currently being served.
            </div>
        </template>
        <!-- <template #footer>
        </template> -->
    </UModal>
</template>
<script setup lang="ts">
const { uiButtonConfig } = useAppUI()
const { state, holdCurrent } = useQueueState()
const current = computed(() => state.value.currentServing)

const toast = useToast()

function handleHold(close: () => void) {
    if (!current.value) return
    
    const ticketNumber = current.value.number
    holdCurrent()
    
    toast.add({
        title: 'Ticket Put on Hold',
        description: `Ticket ${ticketNumber} has been moved to the hold list.`,
        icon: 'i-lucide-pause',
        color: 'warning'
    })
    close()
}
</script>