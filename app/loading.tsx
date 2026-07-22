export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-white text-lg font-semibold">
          Loading...
        </p>
      </div>
    </div>
  );
}