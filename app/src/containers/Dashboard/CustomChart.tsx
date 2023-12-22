import React from 'react';
import "./CustomChart.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export interface ChartData {
  date: string;
  engagement: number;
  impressions: number;
}

interface CustomChartProps {
  data: ChartData[];
}

const CustomChart: React.FC<CustomChartProps> = ({ data }) => (
  <div className="chart-card">
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="engagement" stroke="#8884d8" />
        <Line type="monotone" dataKey="impressions" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default CustomChart;
