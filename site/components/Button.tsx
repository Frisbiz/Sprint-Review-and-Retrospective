import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onDark";

const styles: Record<Variant, string> = {
  primary:
    "bg-amber text-white hover:bg-amber-deep shadow-soft border border-transparent",
  secondary:
    "bg-white/90 text-brand border border-line hover:bg-brand-soft/60",
  ghost: "bg-transparent text-brand border border-transparent hover:bg-brand-soft/50",
  onDark:
    "bg-white text-brand-deep hover:bg-mist border border-transparent shadow-soft",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type,
  onClick,
  disabled,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-50 disabled:pointer-events-none ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
