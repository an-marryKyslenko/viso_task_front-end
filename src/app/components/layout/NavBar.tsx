'use client';

import { useUser } from "@/app/user-provider";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/')
  }
  return (
    <nav className="bg-black/80 text-gray-300 px-6 py-4 flex items-center justify-between shadow-md">
      <a href="/" className="font-semibold text-lg tracking-wide">
        Recipe Portal
      </a>

      <div className="space-x-6 hidden sm:flex">
        <Link href="/recipes" className="hover:text-white transition">All Recipes</Link>
        <Link href="/recipes/my-recipes" className="hover:text-white transition">My Recipes</Link>
        <Link href="/recipes/create" className="hover:text-white transition">Create Recipe</Link>
      </div>

      <button
        onClick={handleLogout}
        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-white transition"
      >
        Logout
      </button>
    </nav>
  );
}