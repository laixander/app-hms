<template>
    <UDropdownMenu :items="items" :ui="{
        content: 'w-48'
    }">
        <UButton
            :avatar="{
                src: 'https://github.com/benjamincanac.png',
                size: 'lg'
            }"
            color="neutral"
            variant="ghost"
        />
    </UDropdownMenu>
</template>
<script setup lang="ts">
const items = ref([
    [
        {
            label: 'Profile',
            icon: 'i-lucide-user'
        },
        {
            label: 'Settings',
            icon: 'i-lucide-settings'
        }
    ],
    [
        {
            label: 'Logout',
            icon: 'i-lucide-log-out'
        }
    ]
])
</script>