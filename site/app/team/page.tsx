import { Button } from "@/components/Button";
import { clinics, therapists } from "@/lib/data";

export const metadata = {
  title: "Our team",
  description:
    "Meet the physical therapists and assistants at Oklahoma Physical Therapy across South OKC, Norman, and Noble.",
};

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-14 sm:px-6 sm:py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-deep">
          Clinicians
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-brand-deep sm:text-5xl">
          Match the specialist to your goal.
        </h1>
        <p className="mt-4 text-lg text-muted">
          Every initial evaluation is with a licensed physical therapist. Choose by specialty and
          clinic — then book online.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {therapists.map((t) => (
          <article key={t.id} className="rounded-2xl border border-line bg-white p-6">
            <h2 className="font-display text-2xl font-semibold text-brand-deep">{t.name}</h2>
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
            <p className="mt-4 text-sm text-ink/80">
              {t.clinics.map((id) => clinics.find((c) => c.id === id)?.shortName).join(" · ")}
            </p>
            <Button
              href={`/book?clinic=${t.clinics[0]}&reason=${
                t.specialties.some((s) => s.toLowerCase().includes("pelvic"))
                  ? "pelvic-floor"
                  : t.specialties.some((s) => /sport|golf/i.test(s))
                    ? "sports-golf"
                    : "spine-back-pain"
              }`}
              className="mt-5"
            >
              Book with {t.name.split(" ").filter(Boolean).slice(-1)[0]}
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
