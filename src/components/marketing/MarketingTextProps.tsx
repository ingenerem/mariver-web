import Link from "next/link";

export default function MarketingHeroText() {
  return (
    <div>

      <Link href="/" className="flex w-fit items-center gap-3 mb-8">
        <div className="h-4 w-2 rounded-full bg-blue-500" />
        <div className="h-6 w-2 rounded-full bg-blue-500" />
        <div className="h-8 w-2 rounded-full bg-blue-600" />

        <h1 className="text-3xl font-semibold tracking-tight text-blue-700">
          Mariver
        </h1>
      </Link>

      <h1 className="max-w-xl text-4xl font-bold leading-tight text-black">
        Plan your money.
        <br />
        Protect your future.
      </h1>

      <p className="mt-5 max-w-xl text-lg text-base text-slate-600">
        Mariver helps you plan each pay period with clarity. Track bills, build reserves, hit savings goals, and know your safe-to-spend amount.
      </p>
    </div>
  );
}