'use client';

import Image from "next/image";
import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main>
      <div className="min-h-[calc(100vh-94px-77px)] flex items-center flex-col justify-center text-center">
        <Image
          src="/images/404.png"
          alt="Stran ni bila najdena"
          width={453}
          height={453}
        />
        <h1>Ups, prišlo je do napake</h1>
        <p className="text-md font-medium pt-3 pb-3">Nekaj ​​je šlo narobe. Težavo bomo kmalu preučili. <br /> Opravičujemo se za nevšečnosti!</p>
       {/*  onClick={() => reset()} */}
        <Link href="/" className="btn btn-dark btn-lg">Nazaj na domačo stran</Link>
      </div>
    </main>
  );
}
