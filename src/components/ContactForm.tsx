"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { contactConfig } from "@/data/contactConfig";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const formattedSubject = `${contactConfig.form.subjectPrefix} ${formData.subject}`;
      const response = await fetch(contactConfig.web3forms.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: contactConfig.web3forms.accessKey,
          name: formData.name,
          email: formData.email,
          subject: formattedSubject,
          message: formData.message,
          replyto: formData.email,
          from_name: formData.name,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || contactConfig.form.errorMessage);
      }

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : contactConfig.form.errorMessage
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const { fields } = contactConfig.form;
  const inputClass =
    "w-full border-b border-border bg-transparent px-0 py-2 text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none transition-colors";

  if (submitSuccess) {
    return (
      <div className="border border-border rounded-md p-6 text-foreground/85">
        {contactConfig.form.successMessage}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
        <div>
          <label htmlFor="name" className="block text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2">
            {fields.name.label}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={fields.name.placeholder}
            required={fields.name.required}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2">
            {fields.email.label}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={fields.email.placeholder}
            required={fields.email.required}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2">
          {fields.subject.label}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder={fields.subject.placeholder}
          required={fields.subject.required}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2">
          {fields.message.label}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={fields.message.placeholder}
          required={fields.message.required}
          rows={fields.message.rows}
          className={`${inputClass} resize-none`}
        />
      </div>

      {submitError && (
        <p className="text-sm text-destructive">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin h-3.5 w-3.5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {contactConfig.form.submitButtonLoadingText}
          </>
        ) : (
          <>
            <Send className="h-3.5 w-3.5" />
            {contactConfig.form.submitButtonText}
          </>
        )}
      </button>
    </form>
  );
}
