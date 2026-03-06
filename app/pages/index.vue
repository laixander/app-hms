<script setup lang="ts">

const links = [
    {
        label: 'Patient Kiosk',
        description: 'Get your queue number',
        icon: 'i-lucide-ticket',
        to: '/kiosk',
        color: 'bg-blue-500'
    },
    {
        label: 'Admin Dashboard',
        description: 'Staff & management portal',
        icon: 'i-lucide-layout-dashboard',
        to: '/admin',
        color: 'bg-indigo-500'
    }
]

const currentTime = ref('')

onMounted(() => {
    const update = () => {
        currentTime.value = new Date().toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    }
    update()
    setInterval(update, 1000)
})
</script>

<template>
    <div
        class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-6">
        <!-- Floating orbs background -->
        <div class="fixed inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
            <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <div class="relative z-10 max-w-2xl w-full text-center">
            <!-- Logo area -->
            <div class="mb-8">
                <div
                    class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 mb-6 shadow-lg shadow-blue-500/25">
                    <UIcon name="i-lucide-hospital" class="w-10 h-10 text-white" />
                </div>
                <h1 class="text-4xl font-bold text-white mb-2">City General Hospital</h1>
                <p class="text-lg text-blue-200/70">Hospital Management System</p>
            </div>

            <!-- Time -->
            <p class="text-sm text-slate-400 mb-10 font-mono">{{ currentTime }}</p>

            <!-- Entry Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <NuxtLink v-for="link in links" :key="link.to" :to="link.to"
                    class="group glass-card p-8 text-left hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer block">
                    <div class="flex items-start gap-4">
                        <div
                            :class="[link.color, 'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg']">
                            <UIcon :name="link.icon" class="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 class="text-xl font-semibold text-white mb-1">{{ link.label }}</h2>
                            <p class="text-sm text-slate-400">{{ link.description }}</p>
                        </div>
                    </div>
                    <div
                        class="mt-4 flex items-center gap-1 text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Enter</span>
                        <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
                    </div>
                </NuxtLink>
            </div>

            <!-- Footer -->
            <p class="mt-12 text-xs text-slate-500">© {{ new Date().getFullYear() }} City General Hospital. All rights
                reserved.</p>
        </div>
    </div>
</template>
