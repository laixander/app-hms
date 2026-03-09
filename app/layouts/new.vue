<template>
    <UDashboardGroup>
        <div class="dark flex h-full">
            <UDashboardSidebar resizable collapsible class="bg-neutral-900"
                :ui="{ root: 'w-auto', header: 'border-b border-white/5', footer: 'lg:border-t border-white/5' }">
                <template #header="{ collapsed }">
                    <div v-if="!collapsed" class="px-2.5 flex items-center gap-2">
                        <UAvatar icon="i-lucide-hospital" size="lg" class="bg-primary rounded-lg"
                            :ui="{ icon: 'text-white' }" />
                        <div class="flex flex-col">
                            <h1 class="font-bold text-white leading-tight mt-0.5">Sulu Sanitarium</h1>
                            <p class="text-xs text-slate-500 leading-tight">Hospital Management</p>
                        </div>
                    </div>
                    <div v-else class="mx-auto">
                        <UAvatar icon="i-lucide-hospital" size="lg" class="bg-primary rounded-lg"
                            :ui="{ icon: 'text-white' }" />
                    </div>
                </template>
                <template #default="{ collapsed }">
                    <UNavigationMenu
                        :ui="{ root: 'gap-2.5', label: 'text-default uppercase tracking-widest py-2.5', link: 'p-2.5 gap-2.5', list: 'space-y-0.5' }"
                        :collapsed="collapsed" :items="items[0]" orientation="vertical" tooltip popover />
                    <!-- <UNavigationMenu :ui="{ root: 'gap-2.5', link: 'p-2.5', list: 'space-y-0.5' }" :collapsed="collapsed" :items="items[1]" orientation="vertical" tooltip class="mt-auto" /> -->
                </template>
                <template #footer="{ collapsed }">
                    <UNavigationMenu :ui="{ root: 'w-full gap-2.5', link: 'p-2.5 gap-2.5', list: 'space-y-0.5' }"
                        :collapsed="collapsed" :items="items[1]" orientation="vertical" tooltip class="mt-auto" />
                </template>
            </UDashboardSidebar>
        </div>
        <slot />
    </UDashboardGroup>
</template>
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[][] = [
    [
        [
            {
                label: 'Modules',
                type: 'label'
            },
            {
                label: 'Queuing Control',
                icon: 'i-lucide-list-ordered',
                to: '/new/queuing'
            },
            {
                label: 'Documents',
                icon: 'i-lucide-folder-open',
                to: '/new/documents'
            },
            {
                label: 'Asset Management',
                icon: 'i-lucide-box',
                to: '/new/assets'
            },
            {
                label: 'Human Resources',
                icon: 'i-lucide-users',
                to: '/new/hr'
            },
            {
                label: 'Waste Management',
                icon: 'i-lucide-recycle',
                to: '/new/waste'
            }
        ]
    ],
    [
        {
            label: 'Kiosk View',
            icon: 'i-lucide-monitor',
            to: '/kiosk'
        }
    ]
]
</script>