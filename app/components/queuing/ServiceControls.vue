<script setup lang="ts">
import { useSlots, computed, Comment, Text } from 'vue'

const slots = useSlots()

const hasContent = (slotName: string) => {
    const slot = slots[slotName]
    if (!slot) return false
    
    return slot().some(vnode => {
        if (vnode.type === Comment) return false
        if (vnode.type === Text && !vnode.children?.toString().trim()) return false
        if (Array.isArray(vnode.children) && vnode.children.length === 0) return false
        return true
    })
}

const hasOnHold = computed(() => hasContent('onHold'))
const hasServiceWindows = computed(() => hasContent('serviceWindows'))
</script>

<template>
    <UCard v-if="hasOnHold || hasServiceWindows" :ui="{ root: 'flex flex-col', header: 'flex items-center gap-4', body: 'p-0 sm:p-0 divide-y divide-default' }">
        <template #header>
            <UIcon name="i-lucide-monitor" class="size-4 text-primary" />
            <div class="uppercase text-xs text-muted font-bold tracking-widest">
                Service Controls
            </div>
        </template>
        <!-- this is to show the on hold section if it has content -->
        <div v-if="hasOnHold" class="space-y-4 p-6">
            <div class="text-xs text-warning uppercase">
                On Hold <UBadge label="1" variant="outline" color="warning" size="sm"  />
            </div>
            <div class="flex flex-col gap-2">
                <slot name="onHold" />
            </div>
        </div>
        <!-- this is to show the service windows section if it has content -->
        <div v-if="hasServiceWindows" class="space-y-4 p-6">
            <div class="text-xs text-muted uppercase">
                Service Windows
            </div>
            <div class="flex flex-col gap-2">
                <slot name="serviceWindows" />
            </div>
        </div>
    </UCard>
</template>