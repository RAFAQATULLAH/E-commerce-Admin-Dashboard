"use client";

import React, { useState } from "react";
import Image from "next/image";
import DataTable from "@/components/DataTable";
import {
  Users,
  UserCheck,
  Clock, // Replaced UserClock with Clock
  UserX,
  Plus,
  CheckCircle2,
  MessageSquare,
  Ban,
} from "lucide-react";

// Mock User Dataset
const initialUsers = [
  { id: 1, name: "Curtis", verified: true, email: "wiegand@hotmail.com", avatar: "https://i.pravatar.cc/100?img=11", country: "Saucerize", friends: 834, followers: 3645, status: "Active", isBlocked: false },
  { id: 2, name: "Xavier", verified: false, email: "tyrell86@company.com", avatar: "https://i.pravatar.cc/100?img=5", country: "South Bradfordstad", friends: 634, followers: 2345, status: "Pending", isBlocked: false },
  { id: 3, name: "Lola", verified: false, email: "aufderhar56@yahoo.com", avatar: "https://i.pravatar.cc/100?img=9", country: "North Tannermouth", friends: 164, followers: 9345, status: "Rejected", isBlocked: false },
  { id: 4, name: "Milton", verified: false, email: "dikinson49@hotmail.com", avatar: "https://i.pravatar.cc/100?img=12", country: "North Anika", friends: 684, followers: 3654, status: "Pending", isBlocked: false },
  { id: 5, name: "Lysanne", verified: true, email: "zack.turner49@company.com", avatar: "https://i.pravatar.cc/100?img=13", country: "Betteland", friends: 842, followers: 5863, status: "Active", isBlocked: false },
  { id: 6, name: "Bonita", verified: false, email: "keebler57@company.com", avatar: "https://i.pravatar.cc/100?img=20", country: "Alexburgh", friends: 543, followers: 8965, status: "Rejected", isBlocked: false },
  { id: 7, name: "Retta", verified: true, email: "retta_h@hotmail.com", avatar: "https://i.pravatar.cc/100?img=23", country: "East Bryceland", friends: 871, followers: 9321, status: "Active", isBlocked: false },
  { id: 8, name: "Karianne", verified: true, email: "karianne.w@gmail.com", avatar: "https://i.pravatar.cc/100?img=32", country: "Port Westly", friends: 912, followers: 4102, status: "Active", isBlocked: false },
  { id: 9, name: "Easton", verified: true, email: "hilpert66@hotmail.com", avatar: "https://i.pravatar.cc/100?img=53", country: "North Pedromouth", friends: 546, followers: 9562, status: "Active", isBlocked: false },
  { id: 10, name: "Brianne", verified: true, email: "noe45@hotmail.com", avatar: "https://i.pravatar.cc/100?img=60", country: "New Alexanderborough", friends: 1482, followers: 10865, status: "Active", isBlocked: false },
  { id: 11, name: "Marcus", verified: false, email: "marcus.k@company.com", avatar: "https://i.pravatar.cc/100?img=68", country: "Lake Felicity", friends: 420, followers: 1200, status: "Active", isBlocked: false },
];

export default function UserPage() {
  const [users, setUsers] = useState(initialUsers);

  const toggleBlock = (userId) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isBlocked: !u.isBlocked } : u))
    );
  };

  const stats = [
    { title: "Total Users", count: users.length, icon: <Users size={22} className="text-blue-400" />, bg: "bg-blue-500/10" },
    { title: "Active Users", count: users.filter((u) => u.status === "Active" && !u.isBlocked).length, icon: <UserCheck size={22} className="text-emerald-400" />, bg: "bg-emerald-500/10" },
    { title: "Pending Approval", count: users.filter((u) => u.status === "Pending").length, icon: <Clock size={22} className="text-amber-400" />, bg: "bg-amber-500/10" },
    { title: "Blocked Users", count: users.filter((u) => u.isBlocked).length, icon: <UserX size={22} className="text-rose-400" />, bg: "bg-rose-500/10" },
  ];

  const userColumns = [
    {
      header: "User Profile",
      cell: (row) => (
        <div className={`flex items-center gap-3 ${row.isBlocked ? "opacity-40" : ""}`}>
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-700">
            <Image src={row.avatar} alt={row.name} fill className="object-cover" unoptimized />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-semibold text-white">
              <span>{row.name}</span>
              {row.verified && <CheckCircle2 size={16} className="text-emerald-500" />}
            </div>
            <p className="text-xs text-gray-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    { header: "Country", accessor: "country" },
    { header: "Friends", accessor: "friends" },
    { header: "Followers", accessor: "followers" },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
            row.status === "Active"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : row.status === "Pending"
              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Actions",
      align: "right",
      cell: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            title="Message User"
            className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
          >
            <MessageSquare size={18} />
          </button>
          <button
            onClick={() => toggleBlock(row.id)}
            title={row.isBlocked ? "Unblock User" : "Block User"}
            className={`p-1.5 rounded-lg transition-colors ${
              row.isBlocked
                ? "text-gray-400 hover:bg-gray-700/50"
                : "text-rose-500 hover:bg-rose-500/10"
            }`}
          >
            <Ban size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">User Management</h1>
          <p className="text-sm text-gray-400">View, search, and manage registered system accounts.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium text-sm transition-colors shadow-lg shadow-purple-600/30">
          <Plus size={18} />
          <span>Add New User</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-5 bg-[#1a223f] border border-gray-800 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-400">{stat.title}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stat.count}</h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg}`}>{stat.icon}</div>
          </div>
        ))}
      </div>

      <DataTable
        title="User List"
        data={users}
        columns={userColumns}
        searchKeys={["name", "email", "country", "status"]}
        searchPlaceholder="Search by name, email, or country..."
      />
    </div>
  );
}