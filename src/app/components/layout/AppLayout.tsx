'use client';

import NavBar from "./NavBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<NavBar />
			<main
				className="min-h-screen bg-cover bg-center relative"
				style={{ backgroundImage: "url('/banner.jpg')" }}
			>
				<div className="relative z-10 flex flex-col items-center justify-center text-white px-4 text-center py-20">
					{children}
				</div>
				<div className="absolute inset-0 bg-black/70" />
			</main>
		</>
	);
}