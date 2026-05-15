"use client";

import { useState } from "react";
import Link from "next/link";

 const navItems = ["Home", "Features", "Security", "About"];

export default function NavBAr() {

   

     const [activeItem, setActiveItem] = useState("Home");

    return (
        <nav className="flex items-center justify-between border-b border-slate-200 px-4 py-2">

            <div className="flex items-end gap-1">
                <Link href="/" className="flex w-fit items-center gap-3">
                        <div className="h-4 w-2 rounded-full bg-blue-500" />
                        <div className="h-6 w-2 rounded-full bg-blue-500" />
                        <div className="h-8 w-2 rounded-full bg-blue-600" />

                        <h1 className="text-3xl font-semibold tracking-tight text-blue-700">
                            Mariver
                        </h1>
                    </Link>

            </div>
            <div className="hidden items-center gap-10  text-base text-slate-700 md:flex">
          {navItems.map((item) => {
          const isActive = activeItem === item;

          return (
            <button
              key={item}
              onClick={() => setActiveItem(item)}
              className={`border-b-2 pb-1 transition ${
                isActive
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent hover:border-blue-600 hover:text-blue-600"
              }`}
            >
              {item}
            </button>
          );
        })}

            </div>

            <div className="flex items-center gap-4">
                <Link href="/login" className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-900">
                    Log in
                </Link>

                <Link href="/register" className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white">
                    Sign up
                </Link>
            </div>


        </nav>
    )

}