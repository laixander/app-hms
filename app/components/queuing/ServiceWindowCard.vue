<template>
    <UCard :ui="{ body: 'sm:p-4 flex items-center justify-between gap-4' }">
        <div class="uppercase text-xs text-muted font-bold tracking-widest">
            Window {{ window }}
        </div>
        <UButton label="Active" icon="i-lucide-play" variant="soft" color="success" size="xs" :ui="{ leadingIcon: 'size-3' }" class="w-fit" />
    </UCard>
</template>
<script setup lang="ts">
interface Props {
    window?: number
}

defineProps<Props>()
</script>