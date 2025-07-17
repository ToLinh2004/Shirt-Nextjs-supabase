"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LogOut, User, Settings, ShoppingCart, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/app/(auth)/login/actions";

export default function AccountMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full border hover:bg-gray-100 transition cursor-pointer"
      >
        <Avatar className="w-8 h-8">
          <AvatarImage src="/avatar.png" alt="User Avatar" />
          <AvatarFallback>L</AvatarFallback>
        </Avatar>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg py-2 z-50"
          >
            <Link
              href="/profile"
              className="flex items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Link>
            <Link
              href="/orders"
              className="flex items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Orders
            </Link>
            <Link
              href="/wishlists"
              className="flex items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setIsOpen(false)}
            >
              <Heart className="w-4 h-4 mr-2" />
              Wishlist
            </Link>
            <Link
              href="/settings"
              className="flex items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Link>
            <hr className="border-t" />
            <button
              onClick={signOut}
              className="flex items-center w-full px-2 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
