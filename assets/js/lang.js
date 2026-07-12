/**
 * Language switcher (AR / EN)
 * - Translations come from window.SITE_I18N (assets/data/site-data.js),
 *   loaded as a plain <script> tag - no fetch(), so it works even when
 *   the page is opened directly as a local file (file://...).
 * - Saves the chosen language in localStorage so it persists across page loads.
 * - Clicking the toggle button saves the new language then RELOADS the page;
 *   on load, the page reads the saved language and renders in that language
 *   and direction from the very start.
 *
 * Usage in HTML:
 *   <h2 data-i18n="about_heading"></h2>          -> replaces textContent
 *   <p data-i18n="about_text" data-i18n-html></p> -> replaces innerHTML (for text with <br>)
 *   <input data-i18n-placeholder="contact_name_placeholder">
 *   <button data-lang-toggle data-i18n="lang_switch_label"></button>
 */

(function () {
  const STORAGE_KEY = "site_lang"; // localStorage key
  const DEFAULT_LANG = "ar";

  function getSavedLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  function saveLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function applyDirection(lang) {
    const html = document.documentElement;
    html.setAttribute("lang", lang === "ar" ? "ar" : "en");
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.body.classList.toggle("lang-ar", lang === "ar");
    document.body.classList.toggle("lang-en", lang === "en");
  }

  function applyTranslations(lang) {
    const dict = window.SITE_I18N && window.SITE_I18N[lang];
    if (!dict) {
      console.error(
        "[lang.js] window.SITE_I18N is missing or has no '" + lang + "' key. " +
        "Make sure assets/data/site-data.js is loaded BEFORE assets/js/lang.js."
      );
      return;
    }

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] === undefined) return;
      if (el.hasAttribute("data-i18n-html")) {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
    });

    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      if (dict[key] !== undefined) el.setAttribute("title", dict[key]);
    });

    if (dict.site_title) {
      document.title = dict.site_title;
    }
  }

  function toggleLanguage() {
    const current = getSavedLang();
    const next = current === "ar" ? "en" : "ar";
    saveLang(next);
    // Reload the page. On the next load, init() below reads the saved
    // language and shows the page in that language from the start.
    location.reload();
  }

  function bindToggleButtons() {
    document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleLanguage();
      });
    });
  }

  function init() {
    const lang = getSavedLang();
    applyDirection(lang);
    applyTranslations(lang);
    bindToggleButtons();
  }

  document.addEventListener("DOMContentLoaded", init);

  window.siteLang = {
    get: getSavedLang,
    toggle: toggleLanguage,
  };
})();