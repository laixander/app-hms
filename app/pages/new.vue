<template>
    <UDashboardPanel :ui="{ root: 'bg-neutral-50 dark:bg-neutral-950/50' }">
        <template #header>
            <UDashboardNavbar :title="(route.meta.title as string) || 'Page Title'" :ui="{ root: 'relative z-10 bg-default', title: 'text-default' }">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>
                <template #right>
                    <UColorModeButton />
                    <UserMenu />
                </template>
            </UDashboardNavbar>
            <QueuingPaAnnouncement v-if="hasQueue" />
        </template>
        <template #body>
            <NuxtPage />
        </template>
    </UDashboardPanel>
</template>
<script setup lang="ts">
const route = useRoute()
const { state } = useQueueState()
const hasQueue = computed(() => state.value.entries.length > 0)

definePageMeta({
    layout: 'new'
})
</script>