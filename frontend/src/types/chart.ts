import type { ChartData } from "chart.js";

export interface SalesChartData extends ChartData<'line'> {
  labels: string[];
  datasets: {
    label: string;
    backgroundColor: string;
    data: number[];
  }[];
}

export interface ProductsChartData extends ChartData<'bar'> {
  labels: string[];
  datasets: {
    label: string;
    backgroundColor: string;
    data: number[];
  }[];
}