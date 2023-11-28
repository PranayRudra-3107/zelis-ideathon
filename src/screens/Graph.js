import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, ScatterChart, Scatter, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import axios from 'axios';

//const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#f22fc3', '#f64c3d'];

const Graph = () => {
  const [chartType, setChartType] = useState('line');
  const [data, setData] = useState([]);
  //const total = data.reduce((acc, cur) => acc + cur.count, 0);

  useEffect(() => {
    axios.get('http://localhost:3001/graphs')
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // const renderTooltip = (props) => {
  //   const { active, payload } = props;
  //   if (active && payload && payload.length) {
  //     const data = payload[0].payload;
  //     const percentage = ((data.count / total) * 100).toFixed(2);
  //     return (
  //       <div style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
  //         <p>{`Count: ${data.count}`}</p>
  //         <p>{`Percentage: ${percentage}%`}</p>
  //       </div>
  //     );
  //   }
  //   return null;
  // };

  const renderAreaChart = () => {
    return (
      <AreaChart width={500} height={400} data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type='monotone' dataKey='count' stroke='#8884d8' fill='#8884d8' />
      </AreaChart>
    );
  };

  const renderScatterChart = () => {
    return (
      <ScatterChart width={400} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis dataKey={'name'} name='name' />
        <YAxis dataKey={'count'} name='count' />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name='Count' data={data} fill='#8884d8' />
      </ScatterChart>
    );
  };

  const renderRadarChart = () => {
    return (
      <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis angle={30} domain={[0, 5]} /> 
        <Radar name="Count" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
    );
};


  const renderChart = () => {
    switch (chartType) {
      // case 'pie':
      //   return (
      //     <PieChart width={400} height={400}>
      //       <Pie
      //         data={data}
      //         dataKey="count"
      //         nameKey="name"
      //         cx="50%"
      //         cy="50%"
      //         outerRadius={80}
      //         fill="#8884d8"
      //         label
      //       >
      //         {data.map((entry, index) => (
      //           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      //         ))}
      //       </Pie>
      //       <Tooltip content={renderTooltip} />
      //       <Legend />
      //     </PieChart>
      //   );
      case 'bar':
        return (
          <BarChart width={1000} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart width={1000} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        );
      case 'area':
        return renderAreaChart();
      case 'scatter':
        return renderScatterChart();
      case 'radar':
        return renderRadarChart();
      default:
        return null;
    }
  };

  return (
    <div style={{ paddingTop: '100px' }}>
      <b>Graph showing status count</b><br/>
      <select onChange={(e) => setChartType(e.target.value)}>
        <option value="line">Line Chart</option>
        <option value="bar">Bar Chart</option>
        {/* <option value="pie">Pie Chart</option> */}
        <option value="area">Area Chart</option>
        <option value="scatter">Scatter Plot</option>
        <option value="radar">Radar Chart</option>
      </select>
      {renderChart()}
    </div>
  );
}

export default Graph;
