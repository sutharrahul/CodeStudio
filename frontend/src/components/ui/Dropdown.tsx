"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type DropdownOption<T extends string | number> = {
  label: string;
  value: T;
};

type Props<T extends string | number> = {
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  className?: string;
};

export function Dropdown<T extends string | number>({
  value,
  options,
  onChange,
  className,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 rounded-md border border-white/10 bg-neutral-900 px-2 py-1 text-sm text-white hover:bg-white/5"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="truncate">{selected?.label}</span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-white/50 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className="absolute right-0 top-full z-50 mt-1 w-full overflow-hidden rounded-md border border-white/10 bg-neutral-900 py-1 shadow-lg">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                className={`block w-full px-3 py-1.5 text-left text-sm hover:bg-white/10 ${
                  opt.value === value ? "text-emerald-400" : "text-white"
                }`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
