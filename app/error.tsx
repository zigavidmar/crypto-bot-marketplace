'use client';

import Image from "next/image";
import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen">
        <Image src="/error.svg" width={200} height={200} alt="Error" />
        <h1 className="text-3xl font-bold mt-4">An error occurred</h1>
        <p className="text-gray-600 mt-2">Please try again later</p>
        <button
          onClick={reset}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Try again
        </button>
        <Link href="/">
          <a className="text-blue-500 hover:underline mt-2">Go back home</a>
        </Link>
      </div>
    </main>
  );
}
