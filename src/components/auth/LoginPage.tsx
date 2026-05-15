import Features from "@/components/marketing/Features";
import MarketingHeroText from "@/components/marketing/MarketingTextProps";
import Link from "next/link";
import LoginForm from "./LoginForm";

export default function LoginPage() {
    return (
        <main className="bg-slate-50 ">


            {/*Left side of the page (Marketing)*/}
            <section className="mx-auto grid min-h-screen overflow-hidden shadow-xl lg:grid-cols-2">

                <div className="hidden flex-col gap-10  p-10 text-white lg:flex">

                    {/*Logo and home link*/}
                    <div className="flex flex-col gap-10 px-10 py-10">

                        {/*Component calls*/}

                        <MarketingHeroText />
                        <Features layout="vertical" />

                    </div>

                </div>

                {/* Right of the page (signup/register page) */}
                <div className="flex items-center justify-center ">

                    <LoginForm />

                </div>
            </section>
        </main>
    );
}