"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Package,
  LayoutDashboard,
  User,
  ShoppingCart,
  PlusSquare,
  Menu,
  X,
} from "lucide-react";

// Single definition of NavItem component
function NavItem({ icon, label, href, isCollapsed = false }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      title={isCollapsed ? label : ""}
      className={`flex items-center ${
        isCollapsed ? "justify-center px-0" : "gap-3 px-4"
      } py-3 rounded-lg transition-all ${
        active
          ? "bg-purple-600/20 text-purple-400 font-semibold"
          : "text-gray-400 hover:bg-[#1a223f] hover:text-white"
      }`}
    >
      <div className="shrink-0">{icon}</div>
      {!isCollapsed && (
        <span className="text-sm whitespace-nowrap overflow-hidden transition-all">
          {label}
        </span>
      )}
    </Link>
  );
}

export default function Sidebar({ mobileOpen = false, setMobileOpen = () => {} }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/", icon: <LayoutDashboard size={20} /> },
    { label: "User", href: "/user", icon: <User size={20} /> },
    { label: "Order", href: "/order", icon: <ShoppingCart size={20} /> },
    { label: "Add Product", href: "/addproduct", icon: <PlusSquare size={20} /> },
    { label: "Products", href: "/products", icon: <Package size={20} /> },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 bg-[#111936] border-r border-gray-800 flex flex-col transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        } ${
          mobileOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header Section */}
        <div
          className={`p-4 flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-3">
              <Image src="/Logo.png" alt="Logo" width={92} height={32} priority />
            </Link>
          )}

          <div className="flex items-center gap-2">
            {/* Collapse button on Desktop */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 hidden md:block"
            >
              <Menu size={20} />
            </button>

            {/* Close button on Mobile */}
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 md:hidden"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-2">
          {!isCollapsed && (
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
              Dashboard
            </p>
          )}

          {navItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}