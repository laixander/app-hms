<script setup lang="ts">
const route = useRoute()
const isSidebarOpen = ref(false)
const isCollapsed = ref(false)

watch(() => route.path, () => {
    isSidebarOpen.value = false
})

const navItems = [
    { label: 'Queuing Control', icon: 'i-lucide-list-ordered', to: '/admin/queuing' },
    { label: 'Documents', icon: 'i-lucide-folder-open', to: '/admin/documents' },
    { label: 'Asset Management', icon: 'i-lucide-box', to: '/admin/assets' },
    { label: 'Human Resources', icon: 'i-lucide-users', to: '/admin/hr' },
    { label: 'Waste Management', icon: 'i-lucide-recycle', to: '/admin/waste' }
]

const isActive = (path: string) => route.path === path || route.path.startsWith(path + '/')

const currentTime = ref('')

const colorMode = useColorMode()
const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
})

onMounted(() => {
    const update = () => {
        currentTime.value = new Date().toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }
    update()
    setInterval(update, 1000)
})
</script>

<template>
    <div :class="['min-h-screen bg-slate-50 dark:bg-slate-950', { 'sidebar-collapsed': isCollapsed }]">
        <!-- Mobile Sidebar Overlay -->
        <div v-if="isSidebarOpen"
            class="fixed inset-0 bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
            @click="isSidebarOpen = false" />

        <!-- Sidebar -->
        <aside :class="['admin-sidebar', { 'is-open': isSidebarOpen, 'is-collapsed': isCollapsed }]">
            <!-- Logo -->
            <div class="p-5 border-b border-white/5">
                <NuxtLink to="/" class="admin-sidebar-logo flex items-center gap-3 group">
                    <div
                        class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                        <UIcon name="i-lucide-hospital" class="w-5 h-5 text-white" />
                    </div>
                    <div class="sidebar-text">
                        <h1 class="text-sm font-bold text-white leading-tight mt-0.5">City General</h1>
                        <p class="text-[10px] text-slate-500 leading-tight">Hospital Management</p>
                    </div>
                </NuxtLink>
            </div>

            <!-- Navigation -->
            <nav class="flex flex-col flex-1 py-4 overflow-y-auto custom-scrollbar">
                <p class="px-6 text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-2 sidebar-text">
                    Modules</p>
                <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to"
                    :class="['admin-sidebar-link', { active: isActive(item.to) }]">
                    <UIcon :name="item.icon" class="w-5 h-5 shrink-0" />
                    <span class="sidebar-text">{{ item.label }}</span>
                </NuxtLink>
            </nav>

            <!-- Sidebar Footer -->
            <div class="p-4 border-t border-white/5">
                <div class="flex items-center gap-3 px-3 py-2">
                    <div
                        class="w-8 h-8 rounded-full shrink-0 bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                        AD
                    </div>
                    <div class="flex-1 min-w-0 sidebar-text">
                        <p class="text-xs font-medium text-white truncate">Admin User</p>
                        <p class="text-[10px] text-slate-500">Administrator</p>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <div class="admin-content">
            <!-- Top Bar -->
            <header
                class="sticky top-0 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-white/5 px-4 lg:px-8 py-4 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <button
                        class="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        @click="isSidebarOpen = true">
                        <UIcon name="i-lucide-menu" class="w-6 h-6 flex" />
                    </button>
                    <button
                        class="hidden lg:block p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        @click="isCollapsed = !isCollapsed">
                        <UIcon name="i-lucide-menu" class="w-5 h-5 flex" />
                    </button>
                    <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
                        {{navItems.find(n => isActive(n.to))?.label || 'Dashboard'}}
                    </h2>
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-xs text-slate-500 font-mono">{{ currentTime }}</span>

                    <!-- Color Mode Switch -->
                    <ClientOnly>
                        <button
                            class="relative w-9 h-9 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                            @click="isDark = !isDark">
                            <UIcon :name="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
                                class="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        </button>
                        <template #fallback>
                            <div class="w-9 h-9" />
                        </template>
                    </ClientOnly>

                    <!-- Notifications -->
                    <button
                        class="relative w-9 h-9 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                        <UIcon name="i-lucide-bell" class="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <span
                            class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-950" />
                    </button>
                    <NuxtLink to="/kiosk"
                        class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1">
                        <UIcon name="i-lucide-monitor" class="w-3.5 h-3.5" />
                        Kiosk View
                    </NuxtLink>
                </div>
            </header>

            <!-- Page Content -->
            <main class="p-6 lg:p-8">
                <slot />
            </main>
        </div>
    </div>
</template>
