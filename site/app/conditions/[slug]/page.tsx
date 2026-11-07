import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { InsuranceStrip } from "@/components/InsuranceStrip";
import {
  clinics,
  conditions,
  getCondition,
  getTherapist,
  reviews,
} from "@/lib/data";

export function generateStaticParams() {
  return conditions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const condition = getCondition(slug);
  if (!condition) return {};
  return {
    title: condition.title,
    description: condition.summary,
  };
}

export default async function ConditionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const condition = getCondition(slug);
  if (!condition) notFound();

  const team = condition.therapistIds.map(getTherapist).filter(Boolean);
  const relatedReviews = reviews.filter((r) =>
    condition.slug.includes("pelvic")
      ? r.focus.includes("Pelvic")
      : condition.slug.includes("sports")
        ? r.focus.includes("Sports") || r.focus.includes("Cash")
        : r.focus.includes("Spine") || r.focus.includes("Cash"),
  );

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={condition.image}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-deep/78" />
        </div>
        <div className="relative mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mist/75">
            {condition.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold text-white sm:text-5xl">
            {condition.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-mist/90">{condition.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`/book?reason=${condition.slug}`} variant="onDark">
              {condition.cta}
            </Button>
            <Button
              href="/insurance"
              variant="secondary"
              className="!border-white/20 !bg-white/10 !text-white hover:!bg-white/20"
            >
              Insurance & pricing
            </Button>
          </div>
        </div>
      </section>

      <InsuranceStrip />

      <div className="mx-auto grid max-w-content gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-12">
          <section>
            <h2 className="font-display text-3xl font-semibold text-brand-deep">
              Common symptoms we treat
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {condition.symptoms.map((s) => (
                <li key={s} className="rounded-xl border border-line bg-white px-4 py-3 text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl font-semibold text-brand-deep">
              What care looks like
            </h2>
            <ol className="mt-6 space-y-4">
              {condition.approach.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-base text-ink/90">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {relatedReviews.length > 0 && (
            <section>
              <h2 className="font-display text-3xl font-semibold text-brand-deep">
                From patients
              </h2>
              <div className="mt-6 space-y-4">
                {relatedReviews.map((r) => (
                  <blockquote
                    key={r.name}
                    className="rounded-2xl border border-line bg-mist/40 p-5 text-sm leading-relaxed text-ink/90"
                  >
                    “{r.quote}”
                    <footer className="mt-3 font-semibold text-brand">
                      {r.name} · {r.clinic}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-line bg-white p-6">
            <h3 className="font-display text-xl font-semibold text-brand-deep">
              Clinicians for this care
            </h3>
            <ul className="mt-5 space-y-5">
              {team.map((t) =>
                t ? (
                  <li key={t.id}>
                    <div className="font-semibold text-ink">{t.name}</div>
                    <div className="text-sm text-muted">{t.credentials}</div>
                    <p className="mt-2 text-sm text-muted">{t.blurb}</p>
                    <div className="mt-2 text-xs text-muted">
                      {t.clinics.map((id) => clinics.find((c) => c.id === id)?.shortName).join(" · ")}
                    </div>
                  </li>
                ) : null,
              )}
            </ul>
            <Button href={`/book?reason=${condition.slug}`} className="mt-6 w-full">
              Book this care
            </Button>
          </div>

          <div className="rounded-2xl bg-brand-deep p-6 text-mist">
            <h3 className="font-display text-xl font-semibold text-white">Explore more</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {conditions
                .filter((c) => c.slug !== condition.slug)
                .map((c) => (
                  <li key={c.slug}>
                    <Link href={`/conditions/${c.slug}`} className="hover:text-white">
                      {c.title} →
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
