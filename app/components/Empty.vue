<template>
    <div class="flex flex-col items-center gap-2 py-8">
        <UIcon :name="icon" class="size-12 text-dimmed" />
        <div class="text-center space-y-1">
            <div class="text-xs text-dimmed uppercase tracking-wider font-bold">
                {{ title }}
            </div>
            <div class="text-xs text-dimmed tracking-wide">
                {{ description }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
interface Props {
    icon?: string
    title?: string
    description?: string
}

const props = withDefaults(defineProps<Props>(), {
    icon: 'i-lucide-inbox',
    title: 'No patients waiting',
    description: 'Tickets will appear here when generated from the kiosk'
})
</script>