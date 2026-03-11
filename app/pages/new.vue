<template>
    <UDashboardPanel :ui="{ body: 'bg-neutral-50 dark:bg-neutral-950/50' }">
        <template #header>
            <UDashboardNavbar :title="(route.meta.title as string) || 'Page Title'" :ui="{ title: 'text-default' }">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>
                <template #right>
                    <UColorModeButton />
                    <UserMenu />
                </template>
            </UDashboardNavbar>
        </template>
        <template #body>
            <NuxtPage />
        </template>
    </UDashboardPanel>
</template>
<script setup lang="ts">
const route = useRoute()
definePageMeta({
    layout: 'new'
})
</script>