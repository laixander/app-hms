<template>
    <UDashboardPanel>
        <template #header>
            <UDashboardNavbar title="Executive Dashboard" :ui="{ title: 'text-default' }">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>
                <template #trailing>
                    <UBadge label="4" variant="subtle" />
                </template>
                <template #right>
                    <UColorModeButton />
                    <UserMenu />
                </template>
            </UDashboardNavbar>
        </template>
        <template #body>
            <div>
                <h1>new</h1>
            </div>
        </template>
    </UDashboardPanel>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'new'
})
</script>