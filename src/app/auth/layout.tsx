import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
			<div
				className="min-h-screen bg-cover bg-center relative"
				style={{ backgroundImage: "url(/banner.jpg)" }} // replace with your image
			>
				<div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white px-4 text-center">
			{children}
			</div>
		</div>
	)
}

export default layout