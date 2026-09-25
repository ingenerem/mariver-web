"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");
    return (
        <section className="w-full max-w-xl rounded-3xl bg-white p-2 my-2 shadow-lg">

            {/* Topf of the form (back home plus login) */}
            <div className="flex flex-row items-center justify-between px-4 py-4 sm:px-6 sm:py-6 lg:px-10 lg:py-10">

                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-medium text-blue-700">
                    <ArrowLeft size={18} />
                    <span>Back to home</span>

                </Link>
                <p className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Log in
                    </Link>
                </p>

            </div>

            {/*Form headers */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-blue-600">
                    Create your account
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Join Mariver and take control of your financial future.
                </p>
            </div>
            <button className="flex w-full cursor-pointer items-center justify-center gap-3 mb-3 rounded-xl border border-slate-300 bg-white py-3 font-medium text-blue-600 transition hover:bg-slate-100">
                <FcGoogle className="text-2xl" />
                <span>Sign up with Google</span>
            </button>

            <div className="flex items-center gap-4 mb-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-medium text-slate-400">OR</span>
                <div className="h-px flex-1 bg-slate-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3" >
                <div>
                    <label className="mb-2 text-sm font-medium text-slate-700">
                        Username <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="displayName"
                        type="text"
                        placeholder="Enter your username"
                        className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-xs font-medium text-slate-700">
                        Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Confirm password <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
                    />
                </div>

                {errorMessage && (
                    <p className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                        {errorMessage}
                    </p>
                )}
                <button
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    Create account
                </button>
            </form>


        </section>
    );



    async function handleSubmit(event: any) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const displayName = formData.get("displayName");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        if (!displayName || !email || !password || !confirmPassword) {
            setErrorMessage("Please fill all required fields.");
            return;
        }

        const response = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                displayName,
                email,
                password,
            }),
        });

        if (!response.ok) {
            setErrorMessage("An account with this email already exists, please login.");
            return;
        }

        const result = await response.json();
        localStorage.setItem("mariver_token", result.token);

        localStorage.setItem(
            "mariver_user",
            JSON.stringify({
                displayName: result.displayName,
                email: result.email,
            })
        );
        
        router.push("/dashboard");
    }
}


