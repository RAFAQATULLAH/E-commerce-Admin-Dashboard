"use client";

import React, { useState } from "react";
import {
  Home,
  ChevronRight,
  ChevronLeft,
  Search,
  ArrowUp,
  MoreVertical,
} from "lucide-react";

// Mock Order Dataset
const initialOrders = [
  { id: "#790955", customer: "Joseph William", branch: "USA", paymentType: "Card", quantity: 6, date: "13 Sept 2026", status: "Pending" },
  { id: "#790956", customer: "Emma Watson", branch: "Canada", paymentType: "Card", quantity: 1, date: "12 Sept 2026", status: "Complete" },
  { id: "#790957", customer: "Rahul Sharma", branch: "India", paymentType: "UPI", quantity: 2, date: "11 Sept 2026", status: "Pending" },
  { id: "#790958", customer: "Oliver Smith", branch: "UK", paymentType: "COD", quantity: 1, date: "10 Sept 2026", status: "Cancel" },
  { id: "#790959", customer: "Liam Brown", branch: "Australia", paymentType: "Card", quantity: 1, date: "09 Sept 2026", status: "Hold" },
  { id: "#790960", customer: "Sophia Garcia", branch: "USA", paymentType: "Card", quantity: 3, date: "08 Sept 2026", status: "Complete" },
  { id: "#790961", customer: "Noah Martinez", branch: "Germany", paymentType: "UPI", quantity: 4, date: "07 Sept 2026", status: "Pending" },
  { id: "#790962", customer: "Isabella Davis", branch: "France", paymentType: "Card", quantity: 2, date: "06 Sept 2026", status: "Complete" },
  { id: "#790963", customer: "James Wilson", branch: "Canada", paymentType: "COD", quantity: 5, date: "05 Sept 2026", status: "Pending" },
  { id: "#790964", customer: "Mia Taylor", branch: "USA", paymentType: "UPI", quantity: 1, date: "04 Sept 2026", status: "Hold" },
  { id: "#790965", customer: "Ethan Anderson", branch: "UK", paymentType: "Card", quantity: 3, date: "03 Sept 2026", status: "Complete" },
  { id: "#790966", customer: "Ava Thomas", branch: "Australia", paymentType: "COD", quantity: 2, date: "02 Sept 2026", status: "Cancel" },
];

const ITEMS_PER_PAGE = 5;

export default function OrderPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Search Filter
  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.paymentType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Calculations
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Checkbox Selection Logic for active page
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(currentOrders.map((o) => o.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Status Badge Styling Helper
  const getStatusBadge = (status) => {
    switch (status) {
      case "Complete":
        return "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20";
      case "Pending":
        return "bg-amber-950/40 text-amber-400 border border-amber-500/20";
      case "Cancel":
        return "bg-rose-950/40 text-rose-400 border border-rose-500/20";
      case "Hold":
        return "bg-blue-950/40 text-blue-400 border border-blue-500/20";
      default:
        return "bg-gray-800 text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white tracking-wide">List</h1>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Home size={14} className="text-purple-400 cursor-pointer" />
          <ChevronRight size={14} />
          <span>Order</span>
          <ChevronRight size={14} />
          <span className="text-gray-200">List</span>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-[#151d3b] border border-gray-800 rounded-xl overflow-hidden shadow-xl text-white">
        {/* Search Header */}
        <div className="p-5 flex items-center justify-between border-b border-gray-800/80">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-[#0e152e] border border-gray-700/60 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 text-xs font-semibold tracking-wider">
                <th className="py-4 px-6 w-12 text-center">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      currentOrders.length > 0 &&
                      currentOrders.every((o) => selectedIds.includes(o.id))
                    }
                    className="w-4 h-4 rounded border-gray-700 bg-[#0e152e] accent-purple-600 cursor-pointer"
                  />
                </th>
                <th className="py-4 px-6">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                    <span>ID</span>
                    <ArrowUp size={14} />
                  </div>
                </th>
                <th className="py-4 px-6">Customer Name</th>
                <th className="py-4 px-6">Branch</th>
                <th className="py-4 px-6">Payment Type</th>
                <th className="py-4 px-6 text-center">Quantity</th>
                <th className="py-4 px-6">Order Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-sm">
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => {
                  const isSelected = selectedIds.includes(order.id);
                  return (
                    <tr
                      key={order.id}
                      className={`hover:bg-[#1a223f]/50 transition-colors ${
                        isSelected ? "bg-[#1a223f]/70" : ""
                      }`}
                    >
                      <td className="py-4 px-6 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(order.id)}
                          className="w-4 h-4 rounded border-gray-700 bg-[#0e152e] accent-purple-600 cursor-pointer"
                        />
                      </td>
                      <td className="py-4 px-6 font-semibold text-gray-200">{order.id}</td>
                      <td className="py-4 px-6 font-medium text-gray-100">{order.customer}</td>
                      <td className="py-4 px-6 text-gray-300">{order.branch}</td>
                      <td className="py-4 px-6 text-gray-300">{order.paymentType}</td>
                      <td className="py-4 px-6 text-center text-gray-300">{order.quantity}</td>
                      <td className="py-4 px-6 text-gray-300">{order.date}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-lg transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-gray-400">
                    No orders matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-800/80">
          <div className="flex items-center gap-1.5">
            {/* Previous Page Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-white hover:bg-[#0e152e] rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Page Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                  currentPage === page
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "text-gray-400 hover:bg-[#0e152e] hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Page Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-white hover:bg-[#0e152e] rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="text-xs text-gray-400">
            Showing {filteredOrders.length > 0 ? startIndex + 1 : 0} to{" "}
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredOrders.length)} of{" "}
            {filteredOrders.length} entries
          </div>
        </div>
      </div>
    </div>
  );
}