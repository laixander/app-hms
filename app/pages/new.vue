<template>
    <UDashboardPanel :ui="{ body: 'bg-neutral-50 dark:bg-neutral-950/20' }">
        <template #header>
            <UDashboardNavbar title="Queuing Control" :ui="{ title: 'text-default' }">
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
definePageMeta({
    layout: 'new'
})
</script>