import { BookingWizard } from "@/components/BookingWizard";
import { InsuranceStrip } from "@/components/InsuranceStrip";
import type { ClinicId } from "@/lib/data";
import { clinics } from "@/lib/data";

export const metadata = {
  title: "Book an appointment",
  description:
    "Schedule a physical therapy evaluation online at South OKC/Moore, Norman, or Noble.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ clinic?: string; reason?: string }>;
}) {
  const params = await searchParams;
  const clinic = clinics.some((c) => c.id === params.clinic)
    ? (params.clinic as ClinicId)
    : undefined;

  return (
    <>
      <InsuranceStrip />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <BookingWizard initialClinic={clinic} initialReason={params.reason} />
        <p className="mt-6 text-center text-sm text-muted">
          Prefer to call? S. OKC {clinics[0].phone} · Norman {clinics[1].phone} · Noble{" "}
          {clinics[2].phone}
        </p>
      </div>
    </>
  );
}
