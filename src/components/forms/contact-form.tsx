"use client";

import Script from "next/script";
import { FormEvent, useEffect, useId, useRef, useState } from "react";

import { submitContactForm } from "@/lib/api";
import { ContactPayload } from "@/types/api";

const initialForm: ContactPayload = {
  name: "",
  email: "",
  business_name: "",
  project_type: "",
  budget_range: "",
  timeline: "",
  message: "",
  recaptcha_token: "",
};

declare global {
  interface Window {
    grecaptcha?: {
      ready?: (callback: () => void) => void;
      render: (
        container: string | HTMLElement,
        parameters: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => number;
      reset: (widgetId?: number) => void;
    };
  }
}

const inputBase = [
  "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200",
  "bg-white text-[#1a1a1a] placeholder:text-[#9a9a8a]",
  "border border-[var(--color-line)]",
  "focus:border-[rgba(43,108,176,0.5)] focus:ring-2 focus:ring-[rgba(43,108,176,0.12)]",
].join(" ");

const RECAPTCHA_WIDTH = 304;
const RECAPTCHA_HEIGHT = 78;

export function ContactForm() {
  const [form, setForm] = useState<ContactPayload>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaScriptLoaded, setRecaptchaScriptLoaded] = useState(false);
  const [recaptchaScale, setRecaptchaScale] = useState(1);
  const widgetIdRef = useRef<number | null>(null);
  const recaptchaWrapperRef = useRef<HTMLDivElement | null>(null);
  const recaptchaElementId = useId().replace(/:/g, "");
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? "";
  const isProduction = process.env.NODE_ENV === "production";
  const recaptchaEnabled = siteKey.length > 0;
  const requireRecaptcha = isProduction || recaptchaEnabled;

  useEffect(() => {
    if (!recaptchaEnabled || !recaptchaScriptLoaded || widgetIdRef.current !== null) {
      return;
    }

    let cancelled = false;
    let retryTimeout: ReturnType<typeof setTimeout> | null = null;

    const renderWidget = () => {
      if (cancelled || widgetIdRef.current !== null) {
        return;
      }

      const grecaptcha = window.grecaptcha;
      if (!grecaptcha || typeof grecaptcha.render !== "function") {
        retryTimeout = setTimeout(renderWidget, 100);
        return;
      }

      widgetIdRef.current = grecaptcha.render(recaptchaElementId, {
        sitekey: siteKey,
        callback: (token: string) => {
          setRecaptchaToken(token);
          setForm((current) => ({ ...current, recaptcha_token: token }));
        },
        "expired-callback": () => {
          setRecaptchaToken("");
          setForm((current) => ({ ...current, recaptcha_token: "" }));
        },
        "error-callback": () => {
          setRecaptchaToken("");
          setForm((current) => ({ ...current, recaptcha_token: "" }));
          setStatus("error");
          setMessage("reCAPTCHA failed to load. Please refresh and try again.");
        },
      });
    };

    if (typeof window.grecaptcha?.ready === "function") {
      window.grecaptcha.ready(renderWidget);
    } else {
      renderWidget();
    }

    return () => {
      cancelled = true;
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
    };
  }, [recaptchaElementId, recaptchaEnabled, recaptchaScriptLoaded, siteKey]);

  useEffect(() => {
    const wrapper = recaptchaWrapperRef.current;
    if (!wrapper) {
      return;
    }

    const updateScale = () => {
      const nextScale = Math.min(1, wrapper.clientWidth / RECAPTCHA_WIDTH);
      setRecaptchaScale((current) => (Math.abs(current - nextScale) < 0.01 ? current : nextScale));
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(wrapper);

    return () => observer.disconnect();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (requireRecaptcha && !recaptchaEnabled) {
      setStatus("error");
      setMessage("reCAPTCHA is not configured for this site yet.");
      return;
    }

    if (requireRecaptcha && !recaptchaToken) {
      setStatus("error");
      setMessage("Please complete the reCAPTCHA before sending your enquiry.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await submitContactForm(form);
      setStatus("success");
      setMessage(
        response.notification_delivered === false && response.detail
          ? `${response.detail} Your enquiry was still received and saved.`
          : "Thanks, your enquiry has been sent. I'll be in touch shortly.",
      );
      setForm(initialForm);
      setRecaptchaToken("");
      if (window.grecaptcha && widgetIdRef.current !== null) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your message.",
      );
      setRecaptchaToken("");
      setForm((current) => ({ ...current, recaptcha_token: "" }));
      if (window.grecaptcha && widgetIdRef.current !== null) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    }
  }

  return (
    <>
      {recaptchaEnabled && (
        <Script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => setRecaptchaScriptLoaded(true)}
        />
      )}
      <form className="space-y-5" onSubmit={handleSubmit}>

      {/* Row 1 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
          required
          value={form.name}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
          required
          value={form.email}
        />
      </div>

      {/* Row 2 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Business name"
          name="business_name"
          onChange={(v) => setForm((f) => ({ ...f, business_name: v }))}
          value={form.business_name}
        />
        <Field
          label="Project type"
          name="project_type"
          onChange={(v) => setForm((f) => ({ ...f, project_type: v }))}
          placeholder="Website, redesign, app..."
          required
          value={form.project_type}
        />
      </div>

      {/* Row 3 */}
      <Field
        label="Timeline"
        name="timeline"
        onChange={(v) => setForm((f) => ({ ...f, timeline: v }))}
        placeholder="e.g. 4 – 6 weeks"
        value={form.timeline}
      />

      {/* Message */}
      <div>
        <label
          className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: "var(--color-muted)" }}
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className={`${inputBase} min-h-36 resize-none`}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="Tell me about what you're building, what's not working, and what success looks like."
          required
          value={form.message}
        />
      </div>

      <div>
        {recaptchaEnabled ? (
          <div ref={recaptchaWrapperRef} className="max-w-full overflow-hidden">
            <div
              style={{
                height: `${RECAPTCHA_HEIGHT * recaptchaScale}px`,
                transform: `scale(${recaptchaScale})`,
                transformOrigin: "top left",
                width: `${RECAPTCHA_WIDTH}px`,
              }}
            >
              <div id={recaptchaElementId} />
            </div>
          </div>
        ) : null}
        {!requireRecaptcha && (
          <p className="mt-2 text-sm" style={{ color: "var(--color-muted)" }}>
            reCAPTCHA is disabled for local development.
          </p>
        )}
        {requireRecaptcha && !recaptchaEnabled && (
          <p className="mt-2 text-sm" style={{ color: "#991b1b" }}>
            reCAPTCHA site key is missing from the frontend environment.
          </p>
        )}
      </div>

      {/* Status messages */}
      {status === "success" && (
        <div
          className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm"
          style={{
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.25)",
            color: "#166534",
          }}
        >
          <span className="mt-0.5 shrink-0">✓</span>
          {message}
        </div>
      )}
      {status === "error" && (
        <div
          className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm"
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#991b1b",
          }}
        >
          <span className="mt-0.5 shrink-0">✕</span>
          {message}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-60 sm:w-auto"
        style={{
          background: status === "loading"
            ? "rgba(43,108,176,0.7)"
            : "linear-gradient(135deg, #1B3D5F 0%, #2B6CB0 100%)",
          boxShadow: status === "loading" ? "none" : "0 4px 14px rgba(43,108,176,0.25)",
        }}
      >
        {status === "loading" ? (
          <>
            <span
              className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin"
            />
            Sending…
          </>
        ) : (
          <>
            Send enquiry
            <span className="opacity-70">→</span>
          </>
        )}
      </button>

      </form>
    </>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

function Field({ label, name, value, onChange, type = "text", placeholder, required }: FieldProps) {
  return (
    <div>
      <label
        className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: "var(--color-muted)" }}
        htmlFor={name}
      >
        {label}{required && <span className="ml-1 opacity-40">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={inputBase}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        value={value}
      />
    </div>
  );
}
