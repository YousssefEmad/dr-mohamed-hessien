"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteConfig } from "@/context/SiteContext";
import { uiLabels } from "@/data/navigation";
import { contactPage as localContact } from "@/data/contact";

async function sendViaFormSubmit(payload, lang, siteConfig) {
  const email = siteConfig.contactEmail || siteConfig.email;
  const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      service: payload.service,
      message: payload.message,
      _subject:
        lang === "en"
          ? `New appointment request - ${payload.name}`
          : `طلب حجز جديد - ${payload.name}`,
      _template: "table",
      _captcha: "false",
    }),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.success === "false" || result.success === false) {
    throw new Error(result.message || "formsubmit_failed");
  }
  return result;
}

async function sendViaPhp(payload, lang, siteConfig) {
  const body = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    body.append(key, value);
  });
  body.append(
    "_subject",
    lang === "en"
      ? `New appointment request - ${payload.name}`
      : `طلب حجز جديد - ${payload.name}`
  );

  const response = await fetch(siteConfig.formEndpoint || "/sendmail.php", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  });

  const contentType = response.headers.get("content-type") || "";
  let result = null;
  if (contentType.includes("application/json")) {
    result = await response.json();
  } else {
    result = { success: response.ok };
  }

  if (!response.ok || result?.success === false) {
    throw new Error(result?.message || "php_failed");
  }
  return result;
}

export default function ContactForm({ services = [] }) {
  const { pick, t, lang } = useLanguage();
  const siteConfig = useSiteConfig();
  const contactPage = siteConfig.contactPage || localContact;
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      service: String(data.get("service") || "").trim(),
      message: String(data.get("message") || "").trim(),
      lang,
    };

    setStatus("loading");
    setErrorMsg("");

    try {
      // Works on localhost + production (no PHP required)
      await sendViaFormSubmit(payload, lang, siteConfig);
      setStatus("ok");
      form.reset();
    } catch (_) {
      try {
        // Fallback for Hostinger PHP mailer after deploy
        await sendViaPhp(payload, lang, siteConfig);
        setStatus("ok");
        form.reset();
      } catch (__) {
        setStatus("error");
        setErrorMsg(t(uiLabels, "formError"));
      }
    }
  };

  return (
    <div className="contact-form">
      <form onSubmit={onSubmit} className="ajax_submit">
        <div className="server_response mb-20">
          {status === "ok" ? (
            <span className="text-success">
              {lang === "en" ? contactPage.successEn : contactPage.successAr}
            </span>
          ) : null}
          {status === "error" ? (
            <span className="text-danger">{errorMsg}</span>
          ) : null}
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="input-group mb-30">
              <span className="icon">
                <i className="far fa-user" />
              </span>
              <input
                type="text"
                name="name"
                required
                placeholder={t(uiLabels, "fullName")}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group mb-30">
              <span className="icon">
                <i className="far fa-envelope" />
              </span>
              <input
                type="email"
                name="email"
                required
                placeholder={t(uiLabels, "email")}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group mb-30">
              <span className="icon">
                <i className="fas fa-phone-alt" />
              </span>
              <input
                type="text"
                name="phone"
                required
                placeholder={t(uiLabels, "phone")}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="inputs-filed">
              <select name="service" id="service" defaultValue="" required>
                <option value="" disabled>
                  {t(uiLabels, "chooseService")}
                </option>
                {services.map((service) => (
                  <option key={service.id} value={pick(service, "title")}>
                    {pick(service, "title")}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-12">
            <div className="input-group textarea mb-30">
              <span className="icon">
                <i className="fas fa-pen" />
              </span>
              <textarea
                name="message"
                placeholder={t(uiLabels, "message")}
                rows={5}
                required
              />
            </div>
          </div>
          <div className="col-12 text-center">
            <button
              type="submit"
              className="main-btn btn-filled"
              disabled={status === "loading"}
            >
              {status === "loading" ? t(uiLabels, "sending") : t(uiLabels, "send")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
