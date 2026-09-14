"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#111936] text-white font-sans">
      {/* Persistent Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Persistent Header */}
        <Header onMobileMenuClick={() => setMobileOpen(true)} />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 overflow-auto bg-[#111936]">
          {children}
        </main>
      </div>
    </div>
  );
}