<template>
    <div class="flex flex-col gap-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard v-for="stat in queuings" :key="stat.title" v-bind="stat" />
        </div>
        <ControlPanel />
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <ServiceControls>
                <template #onHold>
                    <QueueCard v-for="queue in holds" :key="queue.ticketNumber" v-bind="queue" />
                </template>
                <template #serviceWindows>
                    <ServiceWindowCard v-for="window in 4" :key="window" :window="window" />
                </template>
            </ServiceControls>
            <WaitingQueue>
                <Empty />
                <QueueCard v-for="queue in queues" :key="queue.ticketNumber" v-bind="queue" />
            </WaitingQueue>
            <ChartCard title="Average Wait time">
                <WaitTimeBarChart />
            </ChartCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import ControlPanel from '~/components/queuing/ControlPanel.vue'
import ServiceControls from '~/components/queuing/ServiceControls.vue';
import StatCard from '~/components/queuing/StatCard.vue';
import ServiceWindowCard from '~/components/queuing/ServiceWindowCard.vue';
import WaitingQueue from '~/components/queuing/WaitingQueue.vue';
import QueueCard from '~/components/queuing/QueueCard.vue';

definePageMeta({
    title: 'Queuing Control'
})

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

const queues = [
    {
        ticketNumber: 'PD-002',
        department: 'Pediatrics',
        time: '11:13 AM',
        icon: 'i-lucide-baby',
        color: 'purple'
    },
    {
        ticketNumber: 'GM-001',
        department: 'General Medicine',
        time: '11:13 AM',
        icon: 'i-lucide-stethoscope',
        color: 'primary'
    },
    {
        ticketNumber: 'OB-001',
        department: 'OB-GYN',
        time: '11:13 AM',
        icon: 'i-lucide-heart-pulse',
        color: 'pink'
    }
] as const

const holds = [
    {
        ticketNumber: 'DN-001',
        department: 'Dental',
        time: '11:13 AM',
        icon: 'i-lucide-smile',
        color: 'sky'
    },
    {
        ticketNumber: 'LB-001',
        department: 'Laboratory',
        time: '11:13 AM',
        icon: 'i-lucide-flask-conical',
        color: 'orange'
    },
    {
        ticketNumber: 'PH-001',
        department: 'Pharmacy',
        time: '11:13 AM',
        icon: 'i-lucide-pill',
        color: 'emerald'
    }
] as const
</script>