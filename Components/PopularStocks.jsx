"use client";

import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { MoreHorizontal, ArrowUpRight, ChevronDown } from "lucide-react";

const areaChartData = [
  { name: "A", value: 30 }, { name: "B", value: 45 }, { name: "C", value: 25 },
  { name: "D", value: 60 }, { name: "E", value: 40 }, { name: "F", value: 70 }
];

function StockItem({ name, value, status, percentage, up }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h5 className="font-medium">{name}</h5>
        <p className={`text-xs mt-1 ${up ? 'text-green-500' : 'text-red-500'}`}>{percentage} {status}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-semibold">{value}</span>
        <div className={`p-1 rounded bg-[#111936] border border-gray-700 ${up ? 'text-green-500' : 'text-red-500'}`}>
          {up ? <ChevronDown size={14} className="rotate-180" /> : <ChevronDown size={14} />}
        </div>
      </div>
    </div>
  );
}

export default function PopularStocks() {
  return (
    <div className="bg-[#1a223f] border border-gray-700 rounded-2xl p-6 shadow-lg flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Popular Stocks</h3>
        <MoreHorizontal className="text-gray-400" />
      </div>
      
      <div className="bg-purple-900/40 border border-purple-500/30 rounded-xl p-4 mb-4 relative overflow-hidden">
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h4 className="text-purple-300 font-semibold">Bajaj Finery</h4>
            <p className="text-xs text-gray-400 mt-1">10% Profit</p>
          </div>
          <span className="font-bold">$1839.00</span>
        </div>
        <div className="h-24 mt-2 -mx-4 -mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaChartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="#a78bfa" fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <StockItem name="Bajaj Finserv" value="$1839.00" status="Profit" percentage="10%" up={true} />
        <div className="h-px bg-gray-800 w-full my-2"></div>
        <StockItem name="TTML" value="$100.00" status="Loss" percentage="10%" up={false} />
        <div className="h-px bg-gray-800 w-full my-2"></div>
        <StockItem name="Stolon" value="$189.00" status="Loss" percentage="10%" up={false} />
      </div>

      <div className="pt-4 text-center mt-auto">
        <button className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center justify-center w-full gap-1">
          View All <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}