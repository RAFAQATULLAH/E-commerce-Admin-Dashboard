import React from "react";
import { Search, Bell, Settings, Menu, Maximize, Radio, Languages } from "lucide-react";

function IconButton({ icon }) {
  return (
    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
      {icon}
    </button>
  );
}

export default function Header() {
  return (
    <header className="h-20 flex items-center justify-between px-6 bg-[#111936]">
      <div className="flex items-center gap-4">
        <button className="p-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30">
          <Menu size={20} />
        </button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search" 
            className="pl-10 pr-4 py-2 bg-[#1a223f] border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-sm w-64"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-gray-700 rounded">
            <Settings size={14} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <IconButton icon={<Radio size={18} />} />
        <IconButton icon={<Languages size={18} />} />
        <IconButton icon={<Bell size={18} />} />
        <IconButton icon={<Maximize size={18} />} />
        <div className="flex items-center gap-2 bg-[#1a223f] p-1.5 rounded-full border border-gray-700 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center overflow-hidden">
             <img src="https://i.pravatar.cc/100?img=11" alt="User" />
          </div>
          <Settings size={18} className="text-gray-400 mr-2" />
        </div>
      </div>
    </header>
  );
}