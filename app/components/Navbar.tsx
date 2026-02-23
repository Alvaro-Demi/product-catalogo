"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type StoredUser = {
    id: number;
    email: string;
    name: string;
};

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const [user, setUser] = useState<StoredUser | null>(null);



    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between p-4 sm:p-6">
                <Link href="/" className="text-lg font-semibold hover:opacity-90">
                    DemiMark 🛒
                </Link>

                <nav className="flex items-center gap-2">
                    <Link
                        href="/"
                    >
                        <div className="p-2 ">
                            <button
                                className="relative flex items-center px-6 py-2 overflow-hidden font-medium transition-all bg-purple-600 rounded-md group"
                            >
                                <span
                                    className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-purple-800 rounded group-hover:-mr-4 group-hover:-mt-4"
                                >
                                    <span
                                        className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-purple-500"
                                    ></span>
                                </span>
                                <span
                                    className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-purple-800 rounded group-hover:-ml-4 group-hover:-mb-4"
                                >
                                    <span
                                        className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-purple-500"
                                    ></span>
                                </span>
                                <span
                                    className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-purple-800 rounded-md group-hover:translate-x-0"
                                ></span>
                                <span
                                    className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
                                >Home
                                </span>
                            </button>
                        </div>
                    </Link>







                </nav>
            </div>
        </header>
    );
}