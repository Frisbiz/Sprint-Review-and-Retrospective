import { Button } from "@/components/Button";
import { insurancePlans, workersCompPlans } from "@/lib/data";

export const metadata = {
  title: "Insurance & cash-pay",
  description:
    "Accepted insurance plans, workers’ compensation coverage, and cash-pay options at Oklahoma Physical Therapy.",
};

export default function InsurancePage() {
  return (
    <div className="mx-auto max-w-content px-4 py-14 sm:px-6 sm:py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-deep">
          Cost clarity
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-brand-deep sm:text-5xl">
          Know your coverage before you walk in.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          No referral needed for evaluation and treatment. We verify benefits so co-pays and
          self-pay rates aren&apos;t a surprise — and cash-pay options are available when insurance
          isn&apos;t the right fit.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/book">Book + request benefits check</Button>
          <Button href="mailto:cchristian@oklahomaphysicaltherapy.com" variant="secondary">
            Email billing
          </Button>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <article className="rounded-2xl border border-line bg-white p-6 lg:col-span-2">
          <h2 className="font-display text-2xl font-semibold text-brand-deep">
            Health plans we accept
          </h2>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {insurancePlans.map((plan) => (
              <li key={plan} className="rounded-lg bg-mist/70 px-3 py-2.5 text-sm text-ink">
                {plan}
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-line bg-brand-deep p-6 text-mist">
          <h2 className="font-display text-2xl font-semibold text-white">Cash-pay</h2>
          <p className="mt-3 text-sm leading-relaxed text-mist/85">
            Patients regularly call out our reasonable self-pay rates. Ask the front desk for
            current visit pricing when you book — especially helpful for high-deductible plans or
            out-of-network coverage.
          </p>
          <p className="mt-6 text-sm text-mist/70">
            Billing questions: Cindy Christian · 405.749.6281 ·
            cchristian@oklahomaphysicaltherapy.com
          </p>
        </article>
      </div>

      <article className="mt-6 rounded-2xl border border-line bg-white p-6">
        <h2 className="font-display text-2xl font-semibold text-brand-deep">
          Workers&apos; compensation
        </h2>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {workersCompPlans.map((plan) => (
            <li key={plan} className="rounded-lg bg-fog px-3 py-2.5 text-sm">
              {plan}
            </li>
          ))}
        </ul>
      </article>

      <section className="mt-12 rounded-3xl border border-line bg-mist/50 p-8">
        <h2 className="font-display text-2xl font-semibold text-brand-deep">
          What to bring on day one
        </h2>
        <ul className="mt-4 grid gap-2 text-sm text-muted sm:grid-cols-2">
          <li>· Photo ID and insurance card (if using insurance)</li>
          <li>· Referral paperwork if you have one (optional)</li>
          <li>· Comfortable, loose clothing for the area being treated</li>
          <li>· Any braces, imaging reports, or post-op notes</li>
        </ul>
      </section>
    </div>
  );
}
