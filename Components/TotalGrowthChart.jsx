"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChevronDown } from "lucide-react";

const barChartData = [
  { name: "Jan", investment: 40, loss: 24, profit: 24, maintenance: 10 },
  { name: "Feb", investment: 30, loss: 13, profit: 22, maintenance: 20 },
  { name: "Mar", investment: 20, loss: 48, profit: 29, maintenance: 15 },
  { name: "Apr", investment: 27, loss: 39, profit: 20, maintenance: 25 },
  { name: "May", investment: 18, loss: 48, profit: 21, maintenance: 18 },
  { name: "Jun", investment: 23, loss: 38, profit: 25, maintenance: 22 },
  { name: "Jul", investment: 34, loss: 43, profit: 21, maintenance: 15 },
  { name: "Aug", investment: 24, loss: 20, profit: 45, maintenance: 12 },
  { name: "Sep", investment: 30, loss: 30, profit: 20, maintenance: 20 },
  { name: "Oct", investment: 45, loss: 25, profit: 35, maintenance: 10 },
  { name: "Nov", investment: 35, loss: 20, profit: 30, maintenance: 15 },
  { name: "Dec", investment: 50, loss: 15, profit: 40, maintenance: 10 },
];

export default function TotalGrowthChart() {
  return (
    <div className="lg:col-span-2 bg-[#1a223f] border border-gray-700 rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-400 text-sm">Total Growth</p>
          <h3 className="text-2xl font-bold">$2,324.00</h3>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#111936] text-gray-300 rounded-lg border border-gray-700">
          Today <ChevronDown size={16} />
        </button>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barChartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2d3748" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#a0aec0' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a0aec0' }} />
            <Tooltip cursor={{ fill: '#2d3748' }} contentStyle={{ backgroundColor: '#1a223f', borderColor: '#4a5568', color: '#fff' }} />
            <Legend iconType="square" wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="investment" name="Investment" stackId="a" fill="#1e88e5" radius={[0, 0, 4, 4]} />
            <Bar dataKey="loss" name="Loss" stackId="a" fill="#90caf9" />
            <Bar dataKey="profit" name="Profit" stackId="a" fill="#5e35b1" />
            <Bar dataKey="maintenance" name="Maintenance" stackId="a" fill="#b39ddb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}