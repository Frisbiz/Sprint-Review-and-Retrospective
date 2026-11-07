import Link from "next/link";

export function InsuranceStrip() {
  return (
    <section
      aria-label="Insurance and access"
      className="border-y border-line bg-white/70"
    >
      <div className="mx-auto flex max-w-content flex-col gap-3 px-4 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-ink/85">
          <span className="font-semibold text-brand">No doctor referral needed</span>
          <span className="hidden h-1 w-1 rounded-full bg-line sm:inline-block" />
          <span>In-network with BCBS, Aetna, UHC, SoonerCare & more</span>
          <span className="hidden h-1 w-1 rounded-full bg-line sm:inline-block" />
          <span>Cash-pay options available</span>
        </div>
        <div className="flex flex-wrap gap-3 font-semibold">
          <Link href="/insurance" className="text-brand hover:underline">
            Check coverage
          </Link>
          <Link href="/book" className="text-amber-deep hover:underline">
            Book online →
          </Link>
        </div>
      </div>
    </section>
  );
}
