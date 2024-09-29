<template>
  <div v-if="!loading" class="bg-white shadow-md p-4 rounded-lg">
    <Line :data="data" :options="options" :key="reactive" />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { db } from '@/db'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const loading = ref(false)
const data = reactive({
  labels: [],
  datasets: [
    {
      label: 'Total Balance',
      backgroundColor: (context) => {
        const ctx = context.chart.ctx
        const gradient = ctx.createLinearGradient(0, 0, 0, 500)
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)')
        gradient.addColorStop(0, 'rgba(16, 185, 129, 1)')
        return gradient
      },
      data: [],
      tension: 0.3,
      pointStyle: 'circle',
      pointBackgroundColor: '#0d9488',
      pointRadius: 5,
      pointHoverRadius: 15,
      fill: true
    }
  ]
})

const options = {
  responsive: true,
  scales: {
    x: {
      display: false
    },
  }
}

const fetchData = async () => {
  loading.value = true
  try {
    const results = await db.totalBalance.toArray()
    const sortedResults = results.sort((a, b) => new Date(a.date) - new Date(b.date))

    data.labels = sortedResults.map((item) => new Date(item.date).toLocaleDateString())
    data.datasets[0].data = sortedResults.map((item) => item.amount)
  } catch (error) {
    console.error('Error fetching total balance data:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>
