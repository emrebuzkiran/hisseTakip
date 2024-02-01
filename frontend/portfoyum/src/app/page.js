import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gradient-radial">
      <h1 className="text-3xl font-bold text-white">Portfoyum</h1>
      <div className="flex space-x-4 mt-5">
        <Link
          className="bg-white text-black px-4 py-2 rounded-lg"
          href="/login"
        >
          Login
        </Link>
        <Link
          className="bg-black-500 text-white px-4 py-2 rounded-lg"
          href="/about"
        >
          About
        </Link>
      </div>
    </main>
  );
}
