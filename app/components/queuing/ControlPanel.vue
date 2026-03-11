<template>
    <!-- <UCard :ui="{ root:'flex divide-y-0 divide-x', header: 'flex items-center', body: 'sm:py-4 flex-1' }">
        <template #header>
            <div class="flex items-center gap-4">
                <UIcon name="i-lucide-settings-2" class="size-4 text-primary" />
                <div class="uppercase text-xs text-muted font-bold tracking-widest">
                    Control Panel
                </div>
            </div>
        </template>
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                    <UButton label="Call Next Number" icon="i-lucide-phone-forwarded" @click="showToast" :ui="uiButtonConfig" />
                    <UButton label="Hold" icon="i-lucide-pause" variant="outline" :ui="uiButtonConfig" />
                    <UButton label="Skip" icon="i-lucide-skip-forward" variant="outline" :ui="uiButtonConfig" />
                    <UButton label="Re-announce Current" icon="i-lucide-refresh-cw" variant="outline" :ui="uiButtonConfig" />
                </div>
            </div>
            <UBadge label="System Online" variant="subtle" color="success" class="w-fit rounded-full" :ui="uiBadgeConfig">
                <template #leading>
                    <UChip standalone inset color="success" size="xs" />
                </template>
            </UBadge>
        </div>
    </UCard> -->
    <div class="flex justify-between items-center py-2">
        <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
                <UButton label="Call Next Number" icon="i-lucide-phone-forwarded" @click="showToast" :ui="uiButtonConfig" />
                <UButton label="Hold" icon="i-lucide-pause" variant="outline" :ui="uiButtonConfig" />
                <UButton label="Skip" icon="i-lucide-skip-forward" variant="outline" :ui="uiButtonConfig" />
                <UButton label="Re-announce Current" icon="i-lucide-refresh-cw" variant="outline" :ui="uiButtonConfig" />
            </div>
        </div>
        <UBadge label="System Online" variant="subtle" color="success" class="w-fit rounded-full" :ui="uiBadgeConfig">
            <template #leading>
                <UChip standalone inset color="success" size="xs" />
            </template>
        </UBadge>
    </div>
</template>

<script setup lang="ts">
const { uiBadgeConfig, uiButtonConfig } = useAppUI()
const toast = useToast()

function showToast() {
    toast.add({
        title: 'Action Triggered',
        description: 'Calling the next number in the queue.',
        icon: 'i-lucide-phone-forwarded'
    })
}
</script>