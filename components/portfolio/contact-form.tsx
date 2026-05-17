"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const WEB3FORMS_URL = "https://api.web3forms.com/submit"

const fieldClass =
  "w-full rounded-xl border border-border/80 bg-background/80 px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-background/40"

type FieldProps = {
  id: string
  label: string
  name: string
  type?: "email" | "text"
  placeholder: string
  required?: boolean
  disabled?: boolean
  multiline?: boolean
}

function Field({
  id,
  label,
  name,
  type = "text",
  placeholder,
  required,
  disabled,
  multiline,
}: FieldProps) {
  const shared = {
    id,
    name,
    required,
    disabled,
    placeholder,
  }

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          {...shared}
          rows={5}
          className={cn(fieldClass, "min-h-32 resize-y")}
        />
      ) : (
        <input
          {...shared}
          type={type}
          className={fieldClass}
          autoComplete={type === "email" ? "email" : "name"}
        />
      )}
    </div>
  )
}

function web3FormsError(payload: unknown): string {
  if (typeof payload !== "object" || payload === null) {
    return "Failed to send message."
  }

  const data = payload as {
    message?: string
    body?: { message?: string }
  }

  if (typeof data.message === "string" && data.message) return data.message
  if (typeof data.body?.message === "string" && data.body.message) {
    return data.body.message
  }

  return "Failed to send message."
}

type ContactFormProps = {
  className?: string
}

export function ContactForm({ className }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

    if (!accessKey) {
      setStatus("error")
      setErrorMessage(
        "Contact form is not configured. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to .env.local."
      )
      return
    }

    const form = event.currentTarget
    const data = new FormData(form)
    const email = String(data.get("email") ?? "").trim()
    const name = String(data.get("name") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()

    if (!email || !name || !message) {
      setStatus("error")
      setErrorMessage("All fields are required.")
      return
    }

    try {
      const response = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          email,
          name,
          message,
          subject: `Portfolio message from ${name}`,
          botcheck: false,
        }),
      })

      const payload: unknown = await response.json()

      if (!response.ok || !isWeb3FormsSuccess(payload)) {
        setStatus("error")
        setErrorMessage(web3FormsError(payload))
        return
      }

      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
      setErrorMessage("Could not send your message. Check your connection and try again.")
    }
  }

  const disabled = status === "loading"

  return (
    <form onSubmit={onSubmit} className={cn("space-y-5", className)} noValidate>
      <Field
        id="contact-email"
        label="Email"
        name="email"
        type="email"
        placeholder="you@example.com"
        required
        disabled={disabled}
      />
      <Field
        id="contact-name"
        label="Name"
        name="name"
        placeholder="Your name"
        required
        disabled={disabled}
      />
      <Field
        id="contact-message"
        label="Message"
        name="message"
        placeholder="What would you like to discuss?"
        required
        disabled={disabled}
        multiline
      />

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
        <Button
          type="submit"
          size="lg"
          disabled={disabled}
          className="h-11 min-h-11 w-full sm:h-10 sm:w-auto sm:min-h-10"
        >
          {status === "loading" ? "Sending…" : "Send message"}
        </Button>
        {status === "success" ? (
          <p className="text-sm text-muted-foreground" role="status">
            Thanks — your message was sent.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-destructive" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </div>
    </form>
  )
}

function isWeb3FormsSuccess(payload: unknown): boolean {
  if (typeof payload !== "object" || payload === null) return false
  return (payload as { success?: boolean }).success === true
}
