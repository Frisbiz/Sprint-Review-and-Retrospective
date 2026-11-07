import Link from "next/link";
import { brand, clinics, conditions } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-brand-deep text-mist">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl font-semibold text-white">{brand.name}</div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist/80">
            Partnering with you to restore mobility, reduce pain, and return to what matters —
            without needing a doctor referral.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">Care</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {conditions.map((c) => (
              <li key={c.slug}>
                <Link href={`/conditions/${c.slug}`} className="hover:text-white">
                  {c.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/insurance" className="hover:text-white">
                Insurance & cash-pay
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:text-white">
                Meet the team
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
            Clinics
          </h3>
          <ul className="mt-4 space-y-4 text-sm">
            {clinics.map((clinic) => (
              <li key={clinic.id}>
                <Link href={`/locations/${clinic.id}`} className="font-semibold text-white hover:underline">
                  {clinic.shortName}
                </Link>
                <div className="text-mist/75">{clinic.phone}</div>
                <div className="text-mist/60">{clinic.address}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-mist/55 sm:px-6">
        © {new Date().getFullYear()} {brand.name}. Redesign prototype for patient conversion —
        not the live clinic CMS.
      </div>
    </footer>
  );
}
