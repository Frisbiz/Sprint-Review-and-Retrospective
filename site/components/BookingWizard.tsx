"use client";

import { useMemo, useState, useTransition } from "react";
import {
  clinics,
  conditions,
  getDemoSlots,
  therapists,
  type ClinicId,
} from "@/lib/data";
import { Button } from "./Button";

type Step = "clinic" | "reason" | "slot" | "details" | "done";

const reasons = [
  { id: "pelvic-floor", label: "Pelvic floor / postpartum" },
  { id: "spine-back-pain", label: "Spine, neck, or back pain" },
  { id: "sports-golf", label: "Sports or golf rehab" },
  { id: "general", label: "Ortho / post-op / other" },
];

function nextDays(count: number) {
  const days: { offset: number; label: string; date: Date }[] = [];
  const start = new Date();
  for (let i = 1; days.length < count; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    if (d.getDay() === 0) continue; // closed Sundays
    days.push({
      offset: i,
      date: d,
      label: d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    });
  }
  return days;
}

export function BookingWizard({
  initialClinic,
  initialReason,
}: {
  initialClinic?: ClinicId;
  initialReason?: string;
}) {
  const [step, setStep] = useState<Step>(initialClinic ? "reason" : "clinic");
  const [clinicId, setClinicId] = useState<ClinicId | null>(initialClinic ?? null);
  const [reason, setReason] = useState(initialReason ?? "");
  const [therapistId, setTherapistId] = useState<string>("any");
  const [dayOffset, setDayOffset] = useState(1);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pay, setPay] = useState<"insurance" | "cash">("insurance");
  const [pending, startTransition] = useTransition();

  const days = useMemo(() => nextDays(6), []);
  const slots = clinicId ? getDemoSlots(clinicId, dayOffset) : [];
  const clinic = clinics.find((c) => c.id === clinicId);

  const matchingTherapists = useMemo(() => {
    if (!clinicId) return [];
    return therapists.filter((t) => {
      if (!t.clinics.includes(clinicId)) return false;
      if (!reason || reason === "general") return true;
      const condition = conditions.find((c) => c.slug === reason);
      return condition ? condition.therapistIds.includes(t.id) : true;
    });
  }, [clinicId, reason]);

  function go(next: Step) {
    startTransition(() => setStep(next));
  }

  const stepIndex = ["clinic", "reason", "slot", "details", "done"].indexOf(step);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
      <div className="border-b border-line bg-mist/60 px-5 py-4 sm:px-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Online scheduling
            </p>
            <h1 className="font-display text-2xl font-semibold text-brand-deep sm:text-3xl">
              Book an evaluation
            </h1>
          </div>
          <div className="hidden text-right text-xs text-muted sm:block">
            Live demo calendar
            <div className="font-semibold text-brand">Same-week openings</div>
          </div>
        </div>
        <ol className="mt-4 flex gap-2">
          {["Clinic", "Reason", "Time", "Details"].map((label, i) => (
            <li
              key={label}
              className={`h-1.5 flex-1 rounded-full transition ${
                i <= Math.min(stepIndex, 3) ? "bg-brand" : "bg-line"
              }`}
              title={label}
            />
          ))}
        </ol>
      </div>

      <div className="px-5 py-6 sm:px-7 sm:py-8">
        {step === "clinic" && (
          <div className="animate-fade-up space-y-4">
            <h2 className="font-display text-xl font-semibold">Choose your clinic</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {clinics.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setClinicId(c.id);
                    go("reason");
                  }}
                  className="rounded-xl border border-line bg-fog/60 p-4 text-left transition hover:border-brand hover:bg-brand-soft/40"
                >
                  <div className="font-semibold text-brand-deep">{c.shortName}</div>
                  <div className="mt-1 text-sm text-muted">{c.address}</div>
                  <div className="mt-3 text-sm font-medium text-brand">{c.hours[0].time}</div>
                  {c.id === "south-okc" && (
                    <div className="mt-2 text-xs font-semibold text-amber-deep">
                      Open until 8pm Mon–Thu
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "reason" && (
          <div className="animate-fade-up space-y-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-xl font-semibold">What brings you in?</h2>
              <button
                type="button"
                className="text-sm font-medium text-brand"
                onClick={() => go("clinic")}
              >
                Change clinic
              </button>
            </div>
            <p className="text-sm text-muted">
              Booking at <span className="font-semibold text-ink">{clinic?.name}</span>
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {reasons.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setReason(r.id)}
                  className={`rounded-xl border p-4 text-left transition ${
                    reason === r.id
                      ? "border-brand bg-brand-soft/50"
                      : "border-line hover:border-brand/50"
                  }`}
                >
                  <div className="font-semibold">{r.label}</div>
                </button>
              ))}
            </div>

            {matchingTherapists.length > 0 && (
              <div>
                <label className="text-sm font-semibold text-ink">Preferred clinician</label>
                <select
                  className="mt-2 w-full rounded-lg border border-line bg-white px-3 py-3 text-sm"
                  value={therapistId}
                  onChange={(e) => setTherapistId(e.target.value)}
                >
                  <option value="any">First available</option>
                  {matchingTherapists.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} — {t.specialties[0]}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <Button
              disabled={!reason}
              onClick={() => go("slot")}
              className="w-full sm:w-auto"
            >
              See available times
            </Button>
          </div>
        )}

        {step === "slot" && clinicId && (
          <div className="animate-fade-up space-y-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-xl font-semibold">Pick a time</h2>
              <button
                type="button"
                className="text-sm font-medium text-brand"
                onClick={() => go("reason")}
              >
                Back
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {days.map((d) => (
                <button
                  key={d.offset}
                  type="button"
                  onClick={() => {
                    setDayOffset(d.offset);
                    setSlot(null);
                  }}
                  className={`min-w-[6.5rem] rounded-lg border px-3 py-2 text-sm transition ${
                    dayOffset === d.offset
                      ? "border-brand bg-brand text-white"
                      : "border-line bg-white hover:border-brand/40"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {slots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSlot(time)}
                  className={`rounded-lg border px-3 py-3 text-sm font-medium transition ${
                    slot === time
                      ? "border-amber bg-amber text-white"
                      : "border-line hover:border-amber/50"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            {slots.length === 0 && (
              <p className="text-sm text-muted">No openings this day — try another date.</p>
            )}
            <Button disabled={!slot} onClick={() => go("details")} className="w-full sm:w-auto">
              Continue
            </Button>
          </div>
        )}

        {step === "details" && (
          <form
            className="animate-fade-up space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              go("done");
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-xl font-semibold">Your details</h2>
              <button
                type="button"
                className="text-sm font-medium text-brand"
                onClick={() => go("slot")}
              >
                Back
              </button>
            </div>
            <div className="rounded-xl bg-mist/70 px-4 py-3 text-sm text-ink/85">
              {clinic?.shortName} ·{" "}
              {days.find((d) => d.offset === dayOffset)?.label} · {slot}
              {therapistId !== "any" && (
                <>
                  {" "}
                  · {therapists.find((t) => t.id === therapistId)?.name}
                </>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="font-semibold">Full name</span>
                <input
                  required
                  className="mt-1.5 w-full rounded-lg border border-line px-3 py-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="block text-sm">
                <span className="font-semibold">Phone</span>
                <input
                  required
                  type="tel"
                  className="mt-1.5 w-full rounded-lg border border-line px-3 py-3"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="font-semibold">Email</span>
                <input
                  required
                  type="email"
                  className="mt-1.5 w-full rounded-lg border border-line px-3 py-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <fieldset>
              <legend className="text-sm font-semibold">How will you pay?</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${
                    pay === "insurance" ? "border-brand bg-brand-soft/40" : "border-line"
                  }`}
                >
                  <input
                    type="radio"
                    name="pay"
                    checked={pay === "insurance"}
                    onChange={() => setPay("insurance")}
                    className="mt-1"
                  />
                  <span>
                    <span className="block font-semibold">Insurance</span>
                    <span className="text-sm text-muted">
                      We&apos;ll verify benefits before your visit.
                    </span>
                  </span>
                </label>
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${
                    pay === "cash" ? "border-brand bg-brand-soft/40" : "border-line"
                  }`}
                >
                  <input
                    type="radio"
                    name="pay"
                    checked={pay === "cash"}
                    onChange={() => setPay("cash")}
                    className="mt-1"
                  />
                  <span>
                    <span className="block font-semibold">Cash-pay</span>
                    <span className="text-sm text-muted">
                      Transparent self-pay rates — ask us for current pricing.
                    </span>
                  </span>
                </label>
              </div>
            </fieldset>
            <Button type="submit" className="w-full sm:w-auto" disabled={pending}>
              Confirm request
            </Button>
          </form>
        )}

        {step === "done" && (
          <div className="animate-fade-up space-y-4 text-center sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-deep">
              Request received
            </p>
            <h2 className="font-display text-3xl font-semibold text-brand-deep">
              You&apos;re on the schedule, {name.split(" ")[0] || "friend"}.
            </h2>
            <p className="text-muted">
              {clinic?.shortName} · {days.find((d) => d.offset === dayOffset)?.label} · {slot}
            </p>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-muted">
              This redesign uses a demo booking flow. On the live site, this would write to your
              practice calendar and send SMS/email confirmation plus a digital intake link.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button href="/">Back home</Button>
              <Button href="/insurance" variant="secondary">
                Review insurance
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
