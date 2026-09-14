"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Home,
  ChevronRight,
  UploadCloud,
  Plus,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    oldPrice: "",
    category: "Electronics",
    image: "",
  });

  const categories = ["Electronics", "Fashion", "Kitchen", "Books", "Toys"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.price) {
      alert("Please fill in required fields (Title and Price).");
      return;
    }

    const newProduct = {
      id: Date.now(),
      title: formData.title,
      description: formData.description || "No description provided.",
      price: parseFloat(formData.price),
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
      category: formData.category,
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
      rating: 5.0,
      reviews: 1,
    };

    // Save product to LocalStorage for persistence across pages
    const existing = JSON.parse(localStorage.getItem("app_products") || "[]");
    localStorage.setItem(
      "app_products",
      JSON.stringify([newProduct, ...existing])
    );

    setIsSuccess(true);

    // Redirect to Products Page after submission
    setTimeout(() => {
      router.push("/products");
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 bg-[#151d3b] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              Add New Product
            </h1>
            <p className="text-xs text-gray-400">
              Create and publish a new item to your store catalog.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Home size={14} className="text-purple-400 cursor-pointer" />
          <ChevronRight size={14} />
          <span>E-commerce</span>
          <ChevronRight size={14} />
          <span className="text-gray-200">Add Product</span>
        </div>
      </div>

      {/* Success Banner */}
      {isSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-400 text-sm font-medium animate-in fade-in">
          <CheckCircle2 size={20} />
          <span>Product added successfully! Redirecting to products list...</span>
        </div>
      )}

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left Section - Main Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#151d3b] border border-gray-800 rounded-2xl p-6 space-y-5">
            <h2 className="text-base font-semibold text-white border-b border-gray-800 pb-3">
              General Information
            </h2>

            {/* Product Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Product Title <span className="text-purple-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Wireless Noise Canceling Headphones"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#0e152e] border border-gray-700/60 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                placeholder="Write a brief overview of product specifications, features, etc."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#0e152e] border border-gray-700/60 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
              />
            </div>

            {/* Pricing Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Regular Price ($) <span className="text-purple-400">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  required
                  placeholder="29.99"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#0e152e] border border-gray-700/60 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Old / Original Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="oldPrice"
                  placeholder="35.00"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#0e152e] border border-gray-700/60 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Category, Image & Submit */}
        <div className="space-y-6">
          {/* Category Selector */}
          <div className="bg-[#151d3b] border border-gray-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-semibold text-white border-b border-gray-800 pb-3">
              Category
            </h2>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Select Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#0e152e] border border-gray-700/60 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Link & Live Preview */}
          <div className="bg-[#151d3b] border border-gray-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-semibold text-white border-b border-gray-800 pb-3">
              Product Image
            </h2>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#0e152e] border border-gray-700/60 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Live Image Preview */}
            <div className="relative w-full h-44 bg-[#0e152e] rounded-xl border border-dashed border-gray-700 overflow-hidden flex flex-col items-center justify-center">
              {formData.image ? (
                <Image
                  src={formData.image}
                  alt="Product preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="text-center p-4">
                  <UploadCloud size={28} className="mx-auto text-purple-400 mb-2" />
                  <p className="text-xs text-gray-400">
                    Paste an image URL above to preview your product photo.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSuccess}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl font-medium text-sm transition-colors shadow-lg shadow-purple-600/30 cursor-pointer"
            >
              <Plus size={18} />
              <span>Publish Product</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}