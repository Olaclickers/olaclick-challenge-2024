<template>
    <div>
      <canvas ref="chart"></canvas>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, PropType } from 'vue';
  import { Chart, registerables } from 'chart.js';
  import { SalesChartData } from '../../types/chart';
  
  Chart.register(...registerables);
  
  export default defineComponent({
    name: 'LineChart',
    props: {
      chartData: {
        type: Object as PropType<SalesChartData>,
        required: true,
      },
    },
    setup(props) {
      const chart = ref<HTMLCanvasElement | null>(null);
  
      onMounted(() => {
        if (chart.value) {
          new Chart(chart.value, {
            type: 'line',
            data: props.chartData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
            },
          });
        }
      });
  
      return {
        chart,
      };
    },
  });
  </script>