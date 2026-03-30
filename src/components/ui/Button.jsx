"use client";

import React from "react";
import { motion } from "framer-motion";

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  // Define plain Tailwind styles manually
  const variants = {
    primary: "inline-flex items-center justify-center px-8 py-3 font-semibold rounded-full text-white bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300",
    secondary: "inline-flex items-center justify-center px-8 py-3 font-semibold rounded-full text-white border border-gray-700 hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-300",
    ghost: "inline-flex items-center justify-center px-8 py-3 font-semibold rounded-full text-white bg-transparent border border-white/20 hover:bg-white/10 transition-all duration-300",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;