<template>
    <div class="flex flex-col gap-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <UCard v-for="queuing in queuings" :key="queuing.title"
                :ui="{ root: 'divide-none', header: 'flex items-center justify-between pb-0' }">
                <template #header>
                    <div class="uppercase text-xs text-muted font-bold tracking-widest">{{ queuing.title }}
                    </div>
                    <UBadge :icon="queuing.icon" :color="queuing.color" class="size-10 rounded-lg flex justify-center"
                        variant="soft" />
                </template>
                <div class="text-4xl font-bold">{{ queuing.value || 0 }}</div>
                <div class="text-xs text-dimmed">{{ queuing.description }}</div>
            </UCard>
        </div>
        <div>
            <UButton label="Call Next Number" icon="i-lucide-phone-forwarded" size="lg" @click="showToast" />
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <UCard
                :ui="{ root: 'flex flex-col', header: 'flex items-center gap-4', body: 'flex-1 flex flex-col items-center justify-center' }"
                class="col-span-2">
                <template #header>
                    <UIcon name="i-lucide-list" class="size-4 text-primary" />
                    <div class="uppercase text-xs text-muted font-bold tracking-widest">Live Queue</div>
                </template>
                <UIcon name="i-lucide-inbox" class="size-12 text-dimmed" />
                <div class="text-dimmed font-medium leading-8">No patients waiting</div>
                <div class="text-xs text-dimmed tracking-wide">Tickets will appear here when generated from the
                    kiosk
                </div>
            </UCard>
            <UCard :ui="{ header: 'flex items-center gap-4' }">
                <template #header>
                    <UIcon name="i-lucide-bar-chart-3" class="size-4 text-primary" />
                    <div class="uppercase text-xs text-muted font-bold tracking-widest">
                        Average Wait time
                    </div>
                </template>
                <div class="h-64">
                    <WaitTimeBarChart />
                </div>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
const toast = useToast()

function showToast() {
    toast.add({
        title: 'Queue Empty',
        description: 'No more patients waiting in the queue.',
        icon: 'i-lucide-info'
    })
}

const queuings = [
    {
        title: 'Now Serving',
        icon: 'i-lucide-user',
        color: 'primary',
        value: 0,
        description: 'No patient'
    },
    {
        title: 'Waiting',
        icon: 'i-lucide-clock',
        color: 'error',
        value: 0,
        description: 'patients in queue'
    },
    {
        title: 'Served Today',
        icon: 'i-lucide-check-circle',
        color: 'success',
        value: 0,
        description: 'completed'
    },
    {
        title: 'Total Tickets',
        icon: 'i-lucide-ticket',
        color: 'warning',
        value: 0,
        description: 'today'
    }
] as const
</script>