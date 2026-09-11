import React from "react";
import { Package, LayoutDashboard, User, ShoppingCart, PlusSquare } from "lucide-react";
import Image from 'next/image';

function NavItem({ icon, label, active = false }) {
  return (
    <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? 'bg-purple-600/20 text-purple-400' : 'text-gray-400 hover:bg-[#1a223f] hover:text-white'}`}>
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </a>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#111936] border-r border-gray-800 flex flex-col hidden md:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-purple-600 rounded-full p-1.5">
          <Package className="w-6 h-6 text-white" />
        </div>
         <Image
      src="/Logo.png"
      alt="Logo"
      width={92}
      height={32}
    />
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Dashboard</p>
        <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={true} />
        <NavItem icon={<User size={20} />} label="User" />
        <NavItem icon={<ShoppingCart size={20} />} label="Order" />
        <NavItem icon={<PlusSquare size={20} />} label="Create Order" />
        <NavItem icon={<Package size={20} />} label="Products" />
      </nav>
    </aside>
  );
}