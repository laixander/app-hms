<template>
  <div class="h-64">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    type ChartOptions,
    type ChartData
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const { departments, getWaitTimeByDept } = useQueueState()

const waitTimeData = computed(() => getWaitTimeByDept())

const chartData = computed<ChartData<'bar'>>(() => {
    const data = waitTimeData.value
    const labels = departments.map(d => d.code)
    const values = labels.map(code => data[code] || 0)
    const backgroundColors = departments.map(d => d.color)

    return {
        labels,
        datasets: [
            {
                label: 'Wait Time (min)',
                data: values,
                backgroundColor: backgroundColors,
                borderRadius: 6,
                borderSkipped: false
            }
        ]
    }
})

const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            backgroundColor: '#0f172a',
            titleFont: { size: 12, weight: 'bold' },
            bodyFont: { size: 12 },
            padding: 10,
            displayColors: false,
            callbacks: {
                label: (context) => `${context.parsed.y} mins`
            }
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            },
            border: {
                display: false
            },
            ticks: {
                color: '#94a3b8',
                font: { size: 11 }
            }
        },
        y: {
            grid: {
                color: 'rgba(148, 163, 184, 0.1)'
            },
            border: {
                display: false,
                // dash: [4, 4]
            },
            ticks: {
                color: '#94a3b8',
                font: { size: 11 },
                stepSize: 5,
                callback: (value) => `${value}m`
            }
        }
    }
}
</script>
