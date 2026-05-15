import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";


export default function LoginForm() {
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
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Register
                    </Link>
                </p>

            </div>

            {/*Form headers */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-blue-600">
                    Welcome back
                </h1>

            </div>
            <button className="flex w-full cursor-pointer items-center justify-center gap-3 mb-3 rounded-xl border border-slate-300 bg-white py-3 font-medium text-blue-600 transition hover:bg-slate-100">
                <FcGoogle className="text-2xl" />
                <span>Login with Google</span>
            </button>

            <div className="flex items-center gap-4 mb-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-medium text-slate-400">OR</span>
                <div className="h-px flex-1 bg-slate-200" />
            </div>

            <form className="space-y-3">


                <div>
                    <label className="mb-2 block text-xs font-medium text-slate-700">
                        Email address
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Create a password"
                        className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    Login
                </button>
            </form>


        </section>
    );
}