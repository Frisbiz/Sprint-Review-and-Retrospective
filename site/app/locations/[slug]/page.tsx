import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { InsuranceStrip } from "@/components/InsuranceStrip";
import {
  clinics,
  getClinic,
  therapists,
} from "@/lib/data";

export function generateStaticParams() {
  return clinics.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const clinic = getClinic(slug);
  if (!clinic) return {};
  return {
    title: `${clinic.name} physical therapy`,
    description: `Book physical therapy at ${clinic.name}. ${clinic.address}, ${clinic.cityLine}. Call ${clinic.phone}.`,
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const clinic = getClinic(slug);
  if (!clinic) notFound();

  const staff = therapists.filter((t) => t.clinics.includes(clinic.id));
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(clinic.mapQuery)}&output=embed`;

  return (
    <>
      <section className="border-b border-line bg-gradient-to-br from-brand-soft/80 via-fog to-fog">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-deep">
            Location
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-brand-deep sm:text-5xl">
            {clinic.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            {clinic.address}, {clinic.cityLine}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href={`tel:${clinic.phone.replace(/\./g, "")}`} className="text-2xl font-semibold text-brand">
              {clinic.phone}
            </a>
            <Button href={`/book?clinic=${clinic.id}`}>Book this clinic</Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-3">
            {clinic.highlights.map((h) => (
              <li
                key={h}
                className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-brand"
              >
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InsuranceStrip />

      <div className="mx-auto grid max-w-content gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <div className="space-y-8">
          <section>
            <h2 className="font-display text-2xl font-semibold text-brand-deep">Hours</h2>
            <ul className="mt-4 space-y-2">
              {clinic.hours.map((h) => (
                <li
                  key={h.days}
                  className="flex justify-between gap-4 rounded-xl border border-line bg-white px-4 py-3 text-sm"
                >
                  <span className="font-semibold">{h.days}</span>
                  <span className="text-muted">{h.time}</span>
                </li>
              ))}
              <li className="flex justify-between gap-4 rounded-xl border border-dashed border-line px-4 py-3 text-sm text-muted">
                <span>Sat – Sun</span>
                <span>Closed</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-brand-deep">
              Clinicians here
            </h2>
            <ul className="mt-4 space-y-4">
              {staff.map((t) => (
                <li key={t.id} className="rounded-xl border border-line bg-white p-4">
                  <div className="font-semibold text-ink">{t.name}</div>
                  <div className="text-sm text-muted">{t.credentials}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {t.specialties.map((s) => (
                      <span key={s} className="rounded-full bg-mist px-2 py-0.5 text-xs font-semibold text-brand">
                        {s}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/team" className="mt-4 inline-block text-sm font-semibold text-amber-deep">
              See full team →
            </Link>
          </section>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            <iframe
              title={`Map to ${clinic.name}`}
              src={mapSrc}
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="p-4 text-sm text-muted">
              {clinic.address}, {clinic.cityLine}
              <div className="mt-1">Fax {clinic.fax}</div>
            </div>
          </div>

          <div className="rounded-2xl bg-brand-deep p-6 text-mist">
            <h3 className="font-display text-xl font-semibold text-white">Other clinics</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {clinics
                .filter((c) => c.id !== clinic.id)
                .map((c) => (
                  <li key={c.id}>
                    <Link href={`/locations/${c.id}`} className="font-semibold hover:text-white">
                      {c.shortName}
                    </Link>
                    <div className="text-mist/70">{c.phone}</div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
