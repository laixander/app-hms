<template>
    <div class="flex flex-col gap-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard v-for="stat in queuings" :key="stat.title" v-bind="stat" />
        </div>
        <ControlPanel />
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <ServiceControls>
                <template #onHold>
                    <QueueCard 
                        v-for="queue in getHeldEntries()" 
                        :key="queue.id" 
                        :ticket-number="queue.number"
                        :department="queue.department"
                        :time="new Date(queue.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })"
                        :icon="getDeptIcon(queue.departmentCode)"
                        :color="getDeptColor(queue.departmentCode)"
                        status="on_hold"
                    />
                </template>
                <template #serviceWindows>
                    <ServiceWindowCard v-for="window in 4" :key="window" :window="window" />
                </template>
            </ServiceControls>
            <WaitingQueue>
                <Empty v-if="getWaitingEntries().length === 0" />
                <QueueCard 
                    v-for="(queue, index) in getWaitingEntries()" 
                    :key="queue.id" 
                    :ticket-number="queue.number"
                    :department="queue.department"
                    :time="new Date(queue.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })"
                    :icon="getDeptIcon(queue.departmentCode)"
                    :color="getDeptColor(queue.departmentCode)"
                    :position="index + 1"
                    :est-wait-time="(index * 5).toString()"
                />
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

const { state, getWaitingCount, getServedEntries, getWaitingEntries, getHeldEntries } = useQueueState()

const queuings = computed(() => [
    {
        title: 'Now Serving',
        icon: 'i-lucide-user',
        color: 'primary' as const,
        value: state.value.currentServing ? state.value.currentServing.number : '--',
        description: state.value.currentServing ? state.value.currentServing.department : 'No patient'
    },
    {
        title: 'Waiting',
        icon: 'i-lucide-clock',
        color: 'error' as const,
        value: getWaitingCount(),
        description: 'patients in queue'
    },
    {
        title: 'Served Today',
        icon: 'i-lucide-check-circle',
        color: 'success' as const,
        value: getServedEntries().length,
        description: 'completed'
    },
    {
        title: 'Total Tickets',
        icon: 'i-lucide-ticket',
        color: 'warning' as const,
        value: state.value.entries.length,
        description: 'today'
    }
])

const deptMap: Record<string, { icon: string, color: any }> = {
    GM: { icon: 'i-lucide-stethoscope', color: 'primary' },
    PD: { icon: 'i-lucide-baby', color: 'purple' },
    OB: { icon: 'i-lucide-heart-pulse', color: 'pink' },
    DN: { icon: 'i-lucide-smile', color: 'sky' },
    LB: { icon: 'i-lucide-flask-conical', color: 'orange' },
    PH: { icon: 'i-lucide-pill', color: 'emerald' }
}

const getDeptIcon = (code: string) => deptMap[code]?.icon || 'i-lucide-help-circle'
const getDeptColor = (code: string) => deptMap[code]?.color || 'gray'

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