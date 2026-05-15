import Link from "next/link";

export default function HeroPage(){

     return (
    <section className="px-3 py-6 lg:py-12 text-center">
      <div className="mx-auto max-w-2xl">
        <p className="mx-auto mb-4 w-fit rounded-full bg-blue-50 px-4 py-2 text-lg font-medium text-blue-600">
          Plan today. Live tomorrow.
        </p>

        <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-950">
          Plan your money.
          <br />
          Protect your future.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600">
          Mariver helps you plan each pay period with clarity. Track bills,
          build reserves, hit savings goals, and know your safe-to-spend amount.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <Link href="/register" className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700">
            Get started
          </Link>

        </div>
      </div>
    </section>
  );
}