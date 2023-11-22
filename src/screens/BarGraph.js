import React, { useState } from 'react';
import { PieChart, Pie, LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const BarGraph = () => {
  const [chartType, setChartType] = useState('pie');

  const renderChart = () => {
    if (chartType === 'pie') {
      return (
        <PieChart width={400} height={400}>
          <Pie data={data} dataKey="amt" outerRadius={80} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      );
    } else if (chartType === 'bar') {
      return (
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amt" fill="#8884d8" />
        </BarChart>
      );
    } else if (chartType === 'line') {
      return (
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      );
    }
  };

  return (
    <div style={{ paddingTop: '100px'  }}>
  <select onChange={(e) => setChartType(e.target.value)}>
    <option value="line">Line Chart</option>
    <option value="bar">Bar Chart</option>
    <option value="pie">Pie Chart</option>
  </select>
  {renderChart()}
</div>

  );
}

export default BarGraph;
