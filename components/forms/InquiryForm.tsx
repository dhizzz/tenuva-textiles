"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useT } from "@/lib/LanguageProvider";
import { PRODUCTS } from "@/data/products";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Field, inputCls } from "./Field";
import { SuccessCheck } from "./SuccessCheck";
import { inquirySchema, type InquiryType, type InquiryValues } from "./schema";
import { EASE } from "@/lib/utils";

interface Props {
  type: InquiryType;
  defaultProduct?: string;
  onSent?: () => void;
  hideInterest?: boolean;
}

type Status = "idle" | "sending" | "sent" | "error";

export function InquiryForm({ type, defaultProduct, onSent, hideInterest }: Props) {
  const { t, raw } = useT();
  const [status, setStatus] = useState<Status>("idle");
  const statusRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      interest: defaultProduct ?? "",
      volume: "",
      message: "",
      confirm: false,
    },
  });

  const volumes = raw<string[]>("contact.volumes");
  const partnerTypes = raw<string[]>("contact.partnerTypes");

  const submit = handleSubmit(async (values) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...values }),
      });
      if (!res.ok) throw new Error("bad_status");
      setStatus("sent");
      onSent?.();
      window.setTimeout(() => statusRef.current?.focus(), 50);
    } catch {
      setStatus("error");
    }
  });

  if (status === "sent") {
    return (
      <motion.div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex min-h-[420px] flex-col items-center justify-center gap-6 text-center outline-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <SuccessCheck />
        <p className="t-h3 max-w-[18ch]">{t("contact.success")}</p>
        <MagneticButton
          variant="outline-light"
          onClick={() => {
            reset();
            setStatus("idle");
          }}
        >
          {t("contact.again")}
        </MagneticButton>
      </motion.div>
    );
  }

  const interestLabel = type === "partner" ? t("contact.fields.partnerType") : t("contact.fields.fabric");

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 md:grid-cols-2" aria-busy={status === "sending"}>
      <Field label={t("contact.fields.name")} error={errors.name}>
        {(p) => <input {...p} {...register("name")} autoComplete="name" className={inputCls} />}
      </Field>
      <Field label={t("contact.fields.company")} error={errors.company}>
        {(p) => <input {...p} {...register("company")} autoComplete="organization" className={inputCls} />}
      </Field>
      <Field label={t("contact.fields.email")} error={errors.email}>
        {(p) => <input {...p} {...register("email")} type="email" autoComplete="email" inputMode="email" className={inputCls} />}
      </Field>
      <Field label={t("contact.fields.phone")} error={errors.phone}>
        {(p) => <input {...p} {...register("phone")} type="tel" autoComplete="tel" inputMode="tel" className={inputCls} />}
      </Field>
      <Field label={t("contact.fields.country")} error={errors.country}>
        {(p) => <input {...p} {...register("country")} autoComplete="country-name" className={inputCls} />}
      </Field>

      {!hideInterest && (
        <Field label={interestLabel} error={errors.interest}>
          {(p) => (
            <select {...p} {...register("interest")} className={inputCls}>
              <option value="">{t("contact.fields.select")}</option>
              {type === "partner" ? (
                partnerTypes.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))
              ) : (
                <>
                  {PRODUCTS.map((pr) => (
                    <option key={pr.slug} value={pr.slug}>
                      {pr.name}
                    </option>
                  ))}
                  <option value="not-sure">{t("contact.notSure")}</option>
                </>
              )}
            </select>
          )}
        </Field>
      )}

      <Field label={t("contact.fields.volume")} error={errors.volume} className={hideInterest ? "" : ""}>
        {(p) => (
          <select {...p} {...register("volume")} className={inputCls}>
            <option value="">{t("contact.fields.select")}</option>
            {volumes.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field label={t("contact.fields.message")} error={errors.message} className="md:col-span-2">
        {(p) => <textarea {...p} {...register("message")} rows={4} className={`${inputCls} resize-y`} />}
      </Field>

      <div className="md:col-span-2">
        <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-[15px]">
          <input
            type="checkbox"
            {...register("confirm")}
            aria-invalid={!!errors.confirm}
            aria-describedby={errors.confirm ? "confirm-err" : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-indigo"
          />
          <span>{t("contact.fields.confirm")}</span>
        </label>
        {errors.confirm && (
          <p id="confirm-err" role="alert" className="mt-1 text-[14px] font-medium text-error">
            {t(`contact.errors.${errors.confirm.message}`)}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-[10px] border border-error bg-cotton p-4 text-[15px] font-medium text-error md:col-span-2">
          {t("contact.errors.submit")}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <MagneticButton type="submit" variant="indigo" disabled={status === "sending"}>
          {status === "sending" ? t("contact.sending") : t(`contact.submit.${type}`)}
        </MagneticButton>
        <p className="t-mono text-indigo/80">{t("contact.b2b")}</p>
      </div>
    </form>
  );
}
