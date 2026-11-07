import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { InsuranceStrip } from "@/components/InsuranceStrip";
import {
  brand,
  clinics,
  conditions,
  reviews,
  techniques,
  therapists,
} from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[min(92vh,860px)] overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Physical therapist working one-on-one with a patient"
          fill
          priority
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/92 via-brand-deep/72 to-brand-deep/35" />
        <div className="absolute inset-0 grain opacity-40" />

        <div className="relative mx-auto flex min-h-[min(92vh,860px)] max-w-content flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.22em] text-mist/80">
            {brand.name}
          </p>
          <h1 className="animate-fade-up delay-1 mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-white text-balance sm:text-6xl">
            Get back to the life pain keeps interrupting.
          </h1>
          <p className="animate-fade-up delay-2 mt-5 max-w-xl text-base leading-relaxed text-mist/90 sm:text-lg">
            Hands-on physical therapy in South OKC, Norman, and Noble — no referral needed.
            Book online and start with a licensed clinician, not a tech.
          </p>
          <div className="animate-fade-up delay-3 mt-8 flex flex-wrap gap-3">
            <Button href="/book" variant="onDark">
              Book an evaluation
            </Button>
            <Button
              href="/insurance"
              variant="secondary"
              className="!border-white/25 !bg-white/10 !text-white hover:!bg-white/20"
            >
              Insurance & cash-pay
            </Button>
          </div>
        </div>
      </section>

      <InsuranceStrip />

      <section className="mx-auto max-w-content px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-deep">
            I need help with…
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-brand-deep sm:text-4xl">
            Start with your problem, not our techniques.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {conditions.map((condition, i) => (
            <Link
              key={condition.slug}
              href={`/conditions/${condition.slug}`}
              className={`group relative overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-0.5 hover:border-brand/40 ${
                i === 0 ? "animate-fade-up" : i === 1 ? "animate-fade-up delay-1" : "animate-fade-up delay-2"
              }`}
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={condition.image}
                  alt=""
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width:1024px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {condition.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-brand-deep">
                  {condition.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{condition.summary}</p>
                <span className="mt-5 inline-flex text-sm font-semibold text-amber-deep">
                  {condition.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white/60">
        <div className="mx-auto grid max-w-content gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-deep">
              Why patients stay
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-brand-deep sm:text-4xl">
              Direct care with licensed clinicians — every visit.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              Oklahoma Physical Therapy exists to meet you where you are and take you where you
              want to go. Dry needling, spinal manipulation, pelvic health, and sport-specific
              rehab — always with a hands-on plan built around your goals.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {techniques.map((item) => (
                <li key={item.name} className="border-l-2 border-brand/30 pl-4">
                  <div className="font-semibold text-brand-deep">{item.name}</div>
                  <p className="mt-1 text-sm text-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/movement.jpg"
              alt="Patient working through guided movement"
              fill
              className="animate-drift object-cover"
              sizes="(max-width:1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-20 sm:px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-deep">
              Clinics
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-brand-deep">
              Three locations. Evening hours in South OKC.
            </h2>
          </div>
          <Button href="/book" variant="secondary">
            Book by clinic
          </Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {clinics.map((clinic) => (
            <Link
              key={clinic.id}
              href={`/locations/${clinic.id}`}
              className="rounded-2xl border border-line bg-fog/80 p-6 transition hover:border-brand/40 hover:bg-white"
            >
              <h3 className="font-display text-2xl font-semibold text-brand-deep">
                {clinic.shortName}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {clinic.address}
                <br />
                {clinic.cityLine}
              </p>
              <p className="mt-4 text-lg font-semibold text-brand">{clinic.phone}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-muted">
                {clinic.highlights.map((h) => (
                  <li key={h}>· {h}</li>
                ))}
              </ul>
              <span className="mt-5 inline-block text-sm font-semibold text-amber-deep">
                Clinic details →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-brand-deep text-mist">
        <div className="mx-auto max-w-content px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
              Patient stories
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
              Real recovery stories from Google reviews.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {reviews.map((review) => (
              <figure
                key={review.name + review.focus}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-center justify-between gap-3 text-sm">
                  <figcaption className="font-semibold text-white">
                    {review.name}
                    <span className="ml-2 font-normal text-mist/60">· {review.clinic}</span>
                  </figcaption>
                  <span className="rounded-full bg-amber/20 px-2.5 py-1 text-xs font-semibold text-amber">
                    {review.focus}
                  </span>
                </div>
                <blockquote className="mt-4 text-base leading-relaxed text-mist/90">
                  “{review.quote}”
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-20 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-deep">
              Match your clinician
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-brand-deep">
              Specialists, not a revolving door.
            </h2>
          </div>
          <Button href="/team" variant="secondary">
            Full team
          </Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {therapists
            .filter((t) => t.featured)
            .map((t) => (
              <article
                key={t.id}
                className="rounded-2xl border border-line bg-white p-6"
              >
                <h3 className="font-display text-xl font-semibold text-brand-deep">{t.name}</h3>
                <p className="mt-1 text-sm text-muted">{t.credentials}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {t.specialties.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-brand"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">{t.blurb}</p>
                <Button href={`/book?reason=${t.specialties[0].includes("Pelvic") ? "pelvic-floor" : t.specialties[0].includes("Golf") || t.specialties[0].includes("Sports") ? "sports-golf" : "spine-back-pain"}&clinic=${t.clinics[0]}`} className="mt-5 !py-2.5">
                  Book with {t.name.split(" ").slice(-1)[0]}
                </Button>
              </article>
            ))}
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 pb-8 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-deep px-6 py-12 text-white sm:px-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Ready when you are — evenings included.
            </h2>
            <p className="mt-4 text-mist/90">
              Pick a clinic, choose a time, and we&apos;ll follow up with intake forms and a
              benefits check so day one is about treatment, not paperwork.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/book" variant="onDark">
                Book online
              </Button>
              <a
                href={`tel:${clinics[0].phone.replace(/\./g, "")}`}
                className="inline-flex items-center rounded-md border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Call {clinics[0].phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
