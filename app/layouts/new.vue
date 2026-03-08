<template>
    <UDashboardGroup>
        <div class="dark flex h-full">
            <UDashboardSidebar resizable collapsible class="bg-[#0f1a2e]"
                :ui="{ root: 'w-auto', header: 'border-b border-white/5', footer: 'lg:border-t border-white/5' }">
                <template #header="{ collapsed }">
                    <div v-if="!collapsed" class="px-2.5">
                        <AppLogo class="h-5 w-auto shrink-0 text-neutral-50" />
                    </div>
                    <div v-else class="mx-auto">
                        <UIcon name="i-simple-icons-nuxtdotjs" class="flex size-6 text-primary" />
                    </div>
                </template>
                <template #default="{ collapsed }">
                    <UNavigationMenu
                        :ui="{ root: 'gap-2.5', label: 'text-default uppercase tracking-widest py-2.5', link: 'p-2.5', list: 'space-y-0.5' }"
                        :collapsed="collapsed" :items="items[0]" orientation="vertical" tooltip popover />
                    <!-- <UNavigationMenu :ui="{ root: 'gap-2.5', link: 'p-2.5', list: 'space-y-0.5' }" :collapsed="collapsed" :items="items[1]" orientation="vertical" tooltip class="mt-auto" /> -->
                </template>
                <template #footer="{ collapsed }">
                    <UNavigationMenu :ui="{ root: 'w-full gap-2.5', link: 'p-2.5', list: 'space-y-0.5' }"
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
                label: 'Overview',
                type: 'label'
            },
            {
                label: 'Executive Dashboard',
                icon: 'i-lucide-pie-chart',
                to: '/'
            }
        ],
        [
            {
                label: 'Modules',
                type: 'label'
            },
            {
                label: 'Business Permits',
                icon: 'i-lucide-building-2',
                to: '/business-permits'
            },
            {
                label: 'Real Property',
                icon: 'i-lucide-map-pin',
                to: '/real-property'
            }
        ],
        [
            {
                label: 'System Management',
                type: 'label'
            },
            {
                label: 'Departments',
                icon: 'i-lucide-landmark',
                to: '/departments'
            },
            {
                label: 'Permit Types',
                icon: 'i-lucide-list-checks',
                to: '/permit-types'
            },
            {
                label: 'Line of Business',
                icon: 'i-lucide-layers',
                to: '/line-of-business'
            },
            {
                label: 'Requirements Library',
                icon: 'i-lucide-book-open',
                to: '/requirements-library'
            },
            {
                label: 'References',
                icon: 'i-lucide-bookmark',
                to: '/references'
            }
        ],
        [
            {
                label: 'User & Access',
                type: 'label'
            },
            {
                label: 'User Management',
                icon: 'i-lucide-users'
            },
            {
                label: 'Roles & Permissions',
                icon: 'i-lucide-shield-check'
            }
        ]
    ],
    [
        {
            label: 'Documentation',
            icon: 'i-lucide-book-marked',
            to: '/documentation/platform-overview',
            target: '_blank'
        }
    ]
]
</script>