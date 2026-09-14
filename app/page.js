"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCards from "../components/StatCards";
import TotalGrowthChart from "../components/TotalGrowthChart";
import PopularStocks from "../components/PopularStocks";
import Footer from "../Components/Footer";

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#111936] text-white font-sans">

      
      <main className="flex-1 flex flex-col min-w-0">


        <div className="flex-1 p-6 overflow-auto bg-[#eef2f6] dark:bg-[#111936]">
          <StatCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TotalGrowthChart />
            <PopularStocks />
          </div>
        </div>
        
        <Footer />
      </main>
    </div>
  );
}