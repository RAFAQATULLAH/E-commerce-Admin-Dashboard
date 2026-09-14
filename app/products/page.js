"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Home,
  ChevronRight,
  Search,
  Filter,
  Star,
  ShoppingCart,
  X,
  Plus,
} from "lucide-react";

// Default Initial Product Dataset
const defaultProducts = [
  {
    id: 1,
    title: "Canon EOS 1500D 24.1 Digital SLR",
    description: "SLR Camera (Black) with EF S18-55mm lens",
    price: 12.99,
    oldPrice: 15.99,
    rating: 4.5,
    reviews: 13,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Apple MacBook Pro with iPhone",
    description: "11th Generation Intel® Core™ i5-11320H...",
    price: 14.59,
    oldPrice: null,
    rating: 4.0,
    reviews: 15,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Luxury Watches Centrix Gold",
    description: "7655 Couple (Refurbished)...",
    price: 29.99,
    oldPrice: 36.00,
    rating: 5.0,
    reviews: 30,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Wireless Noise Canceling Headphones",
    description: "High-fidelity audio with active noise control",
    price: 49.99,
    oldPrice: 65.00,
    rating: 4.8,
    reviews: 42,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(defaultProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("low-to-high");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Load dynamically added products from localStorage on mount
  useEffect(() => {
    const storedProducts = localStorage.getItem("app_products");
    if (storedProducts) {
      try {
        const parsed = JSON.parse(storedProducts);
        setProducts([...parsed, ...defaultProducts]);
      } catch (err) {
        console.error("Failed to parse custom products", err);
      }
    }
  }, []);

  const categories = ["All", "Electronics", "Fashion", "Kitchen", "Books", "Toys"];

  // Filter & Search Logic
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "low-to-high") return a.price - b.price;
      if (sortBy === "high-to-low") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Header & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white tracking-wide">Products</h1>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Home size={14} className="text-purple-400 cursor-pointer" />
          <ChevronRight size={14} />
          <span>E-commerce</span>
          <ChevronRight size={14} />
          <span className="text-gray-200">Products</span>
        </div>
      </div>

      {/* Control Bar: Shop Title, Search, Functional Filter Toggle, and Sort */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-[#151d3b] p-4 rounded-xl border border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-white">Shop</span>
          <ChevronRight size={18} className="text-gray-400" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search Product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#0e152e] border border-gray-700/60 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="h-6 w-[1px] bg-gray-800 hidden sm:block" />

          {/* Functional Filter Toggle Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isFilterOpen || selectedCategory !== "All"
                ? "bg-purple-600 text-white"
                : "bg-[#0e152e] text-purple-400 border border-gray-700/60 hover:bg-purple-600/20"
            }`}
          >
            <Filter size={16} />
            <span>Filter</span>
            {selectedCategory !== "All" && (
              <span className="ml-1 text-xs bg-white text-purple-600 px-1.5 py-0.5 rounded-full font-bold">
                1
              </span>
            )}
          </button>

          <div className="h-6 w-[1px] bg-gray-800 hidden sm:block" />

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-gray-400 text-xs sm:text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#0e152e] border border-gray-700/60 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="low-to-high">Price: Low To High</option>
              <option value="high-to-low">Price: High To Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Functional Dynamic Filter Collapsible Panel */}
      {isFilterOpen && (
        <div className="bg-[#151d3b] border border-gray-800 p-5 rounded-xl space-y-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <h3 className="text-sm font-semibold text-white">Category Filter</h3>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-lg"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "bg-[#0e152e] text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Product Grid (4 Columns Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#151d3b] border border-gray-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-gray-700 transition-all shadow-lg group"
            >
              <div>
                {/* Product Image */}
                <div className="relative w-full h-52 bg-[#0e152e] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>

                {/* Card Details */}
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-white text-sm line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < Math.floor(product.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-600"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">
                      ({product.reviews}+)
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer: Price & Cart Button */}
              <div className="p-4 pt-0 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-bold text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  title="Add to Cart"
                  className="p-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-colors shadow-md shadow-sky-500/20"
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-400 bg-[#151d3b] rounded-2xl border border-gray-800">
            No products found matching your filter criteria.
          </div>
        )}
      </div>
    </div>
  );
}