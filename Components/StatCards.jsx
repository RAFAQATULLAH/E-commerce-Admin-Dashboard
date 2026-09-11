"use client";

import React from "react";
import { ResponsiveContainer, LineChart, Line } from "recharts";
import { LayoutDashboard, MoreHorizontal, ArrowUpRight, ShoppingCart, ArrowDownRight, Store } from "lucide-react";

const miniLineData = [
  { value: 10 }, { value: 25 }, { value: 15 }, { value: 30 }, { value: 20 }, { value: 35 }
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-gradient-to-br from-[#5e35b1] to-[#4527a0] rounded-2xl p-6 relative overflow-hidden shadow-lg">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <LayoutDashboard className="text-white" size={24} />
          </div>
          <MoreHorizontal className="text-white/70" />
        </div>
        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
          $500.00 <ArrowUpRight size={20} className="text-blue-300" />
        </h2>
        <p className="text-white/70 mt-1">Total Earning</p>
      </div>

      <div className="bg-gradient-to-br from-[#1e88e5] to-[#1565c0] rounded-2xl p-6 shadow-lg relative">
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 bg-white/20 rounded-lg">
            <ShoppingCart className="text-white" size={24} />
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 text-xs text-white bg-white/20 rounded-l-md">Month</button>
            <button className="px-3 py-1 text-xs text-blue-200 bg-white/10 rounded-r-md">Year</button>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-2">
              $961 <ArrowDownRight size={20} className="text-red-300" />
            </h2>
            <p className="text-white/70 mt-1">Total Order</p>
          </div>
          <div className="w-24 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={miniLineData}>
                <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-[#1e88e5] rounded-2xl p-5 flex items-center gap-4 shadow-lg">
          <div className="p-3 bg-white/20 rounded-lg">
            <Store className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">$203k</h3>
            <p className="text-white/70 text-sm">Total Income</p>
          </div>
        </div>
        <div className="bg-[#1a223f] border border-gray-700 rounded-2xl p-5 flex items-center gap-4 shadow-lg">
          <div className="p-3 bg-yellow-500/20 text-yellow-500 rounded-lg">
            <Store size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold">$203k</h3>
            <p className="text-gray-400 text-sm">Total Income</p>
          </div>
        </div>
      </div>
    </div>
  );
}