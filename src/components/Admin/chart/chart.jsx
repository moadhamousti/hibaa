"use client"

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Page A', visit: 4000, click: 2400, amt: 2400 },
  { name: 'Page B', visit: 3000, click: 1398, amt: 2210 },
  { name: 'Page C', visit: 2000, click: 9800, amt: 2290 },
  { name: 'Page D', visit: 2780, click: 3908, amt: 2000 },
  { name: 'Page E', visit: 1890, click: 4800, amt: 2181 },
  { name: 'Page F', visit: 2390, click: 3800, amt: 2500 },
  { name: 'Page G', visit: 3490, click: 4300, amt: 2100 },
];

const Chart = () => {
  return (
    <div className='h-[450px] px-[20px] py-[20px] rounded-sm bg-gray-200'>
      <h2 className='font-light text-[20px] text-soft mb-[20px]'>Monthly Recap</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{background:"#cccfcc", border:"none",borderRadius:"5px"}} />
          <Legend />
          <Line type="monotone" dataKey="visit" stroke="#4365b0" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="click" stroke="#ff195b" strokeDasharray="3 4 5 2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
