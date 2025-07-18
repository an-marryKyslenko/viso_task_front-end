# FlavorAI Frontend

	This is the client-side of the VISO recipe app, built with **Next.js 15** and fully integrated with cookie-based authentication via SSR and client components. Users can view recipes, leave comments, and interact securely with the backend.

## Links
	
	- Demo [flavorAI](https://flavorai.vercel.app/)

	- Backend [repo](https://github.com/an-marryKyslenko/viso_task_back-end)

## 🧰 Tech Stack

- Next.js 15 with App Router
- TypeScript
- TailwindCSS
- Axios with `withCredentials`
- SSR Cookie Authentication

## Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/viso_task_front-end.git

2. Install dependencies:

```bash
npm install
Add your environment config:
```

3. Run locally:

```bash
npm run dev
```

## Authentication

- Access and Refresh tokens stored in secure HTTP-only cookies

- Automatic token refresh on 401 via /auth/refresh

- Client fetch uses Axios with withCredentials: true

- SSR fetch uses headers() to access cookies from incoming requests

## Features

- Recipe listing with SSR

- Commenting system with auto refresh

- Cookie-based secure authentication

- Dynamic metadata with generateMetadata

- Error handling and toast notifications

##END