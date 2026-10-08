"use client";

import { useId } from "react";
import type { FieldError } from "react-hook-form";
import { useT } from "@/lib/LanguageProvider";
import { cn } from "@/lib/utils";

export const inputCls =
  "w-full min-h-[48px] rounded-[10px] border border-indigo/30 bg-cotton px-4 py-3 text-[16px] text-indigo placeholder:text-stone focus-visible:border-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron aria-[invalid=true]:border-error";

interface Props {
  label: string;
  error?: FieldError;
  className?: string;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => React.ReactNode;
}

export function Field({ label, error, className, children }: Props) {
  const { t } = useT();
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="t-mono uppercase text-indigo">
        {label}
      </label>
      {children({ id, "aria-invalid": !!error, "aria-describedby": error ? errId : undefined })}
      {error && (
        <p id={errId} role="alert" className="text-[14px] font-medium text-error">
          {t(`contact.errors.${error.message}`)}
        </p>
      )}
    </div>
  );
}
