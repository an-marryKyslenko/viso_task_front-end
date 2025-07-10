'use client';

import { useUser } from "@/app/user-provider";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useUser();

  // if (!user) return null;

  return (
    <nav className="bg-black/80 text-gray-300 px-6 py-4 flex items-center justify-between shadow-md">
      <div className="font-semibold text-lg tracking-wide">
        Recipe Portal
      </div>

      <div className="space-x-6 hidden sm:flex">
        <Link href="/recipes" className="hover:text-white transition">All Recipes</Link>
        <Link href="/recipes/my-recipes" className="hover:text-white transition">My Recipes</Link>
        <Link href="/recipes/create" className="hover:text-white transition">Create Recipe</Link>
      </div>

      <button
        onClick={logout}
        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-white transition"
      >
        Logout
      </button>
    </nav>
  );
}