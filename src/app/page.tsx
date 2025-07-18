import Link from 'next/link';

export default function HomePage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url(/banner.jpg)" }}
    >
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Delicious Recipes
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl">
          Explore, create, and share your favorite dishes with the world.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/auth/register">
            <button className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded font-semibold transition w-full sm:w-auto">
              Sign Up
            </button>
          </Link>

          <Link href="/auth/login">
            <button className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded font-semibold transition w-full sm:w-auto">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
