<template>
  <div>
    <Line :data="data" :options="options" class="bg-white shadow-md rounded-lg relative" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40],
      tension: '0.3',
      pointRadius: 0,
      interaction: {
        intersect: false,
      },
      borderColor: "#fffff",
    }
  ],
  options: {
    responsive: true,
    scales: {
      y: {
        ticks: {
          color: "#ffff",
        },
        grid: {
          display: true,
          drawOnChartArea: false,
          drawTicks: false,
        },
        border: {
            display: false
        }
      },
      x: {
        ticks: {
          color: "#b6baca",
        },
        grid: {
          display: false, // Disable grid lines on the X axis
        },
        border: {
          display: false,
        },
      },
    },
  },
}

</script>

<style scoped>
canvas {
  max-width: auto;
  max-height: auto;
  position: relative;
}
</style>
