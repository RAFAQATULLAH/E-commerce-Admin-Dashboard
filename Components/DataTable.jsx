"use client";

import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function DataTable({
  title = "List",
  data = [],
  columns = [],
  itemsPerPage = 10,
  searchKeys = [],
  searchPlaceholder = "Search...",
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Generic Filter logic based on provided searchKeys
  const filteredData = data.filter((item) => {
    if (!searchQuery) return true;
    return searchKeys.some((key) => {
      const value = item[key];
      return value && String(value).toLowerCase().includes(searchQuery.toLowerCase());
    });
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-[#1a223f] border border-gray-800 rounded-2xl overflow-hidden shadow-xl text-white">
      {/* Table Header Controls */}
      <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800">
        <h2 className="text-xl font-bold tracking-wide">{title}</h2>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 bg-[#111936] border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Dynamic Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 text-xs font-semibold uppercase tracking-wider">
              <th className="py-4 px-6">#</th>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`py-4 px-6 ${col.align === "right" ? "text-right" : ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm">
            {currentData.length > 0 ? (
              currentData.map((row, rowIndex) => {
                const serialNum = String(startIndex + rowIndex + 1).padStart(2, "0");
                return (
                  <tr
                    key={row.id || rowIndex}
                    className="hover:bg-[#111936]/50 transition-colors"
                  >
                    <td className="py-4 px-6 text-gray-400 font-mono">{serialNum}</td>
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className={`py-4 px-6 ${col.align === "right" ? "text-right" : ""}`}
                      >
                        {col.cell ? col.cell(row) : row[col.accessor]}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="py-8 text-center text-gray-400">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="text-sm text-gray-400">
          <span>{itemsPerPage} Rows</span>
        </div>
      </div>
    </div>
  );
}