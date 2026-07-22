import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="text-center">

        <h1 className="text-8xl font-extrabold text-red-500">
          404
        </h1>

        <h2 className="mt-6 text-3xl font-bold">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-400 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-xl font-semibold"
        >
          Go Back Home
        </Link>

      </div>
    </main>
  );
}