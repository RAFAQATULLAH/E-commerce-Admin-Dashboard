import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#111936] p-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center border-t border-gray-800">
      <p>© All rights reserved <span className="text-purple-500 font-medium">CodedThemes</span></p>
      <div className="flex gap-4 mt-2 md:mt-0">
        <a href="#" className="hover:text-white transition">License</a>
        <a href="#" className="hover:text-white transition">Hire us</a>
        <a href="#" className="hover:text-white transition">Terms</a>
        <a href="#" className="hover:text-white transition">Figma Design System</a>
      </div>
    </footer>
  );
}