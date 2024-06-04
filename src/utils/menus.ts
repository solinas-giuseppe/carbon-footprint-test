import { getRelativeLocaleUrl } from "astro:i18n";
import { ui, defaultLang } from "@/i18n/ui";
import { useTranslations } from "@/i18n/utils";

export const getHeaderMenu = (locale: keyof typeof ui = defaultLang) => {
  const t = useTranslations(locale);
  return [
    {
      title: t("nav.features"),
      url: getRelativeLocaleUrl(locale, "features"),
    },
    {
      title: t("nav.pricing"),
      url: getRelativeLocaleUrl(locale, "pricing"),
    },
    {
      title: t("nav.carbon-test"),
      url: getRelativeLocaleUrl(locale, "carbon-test"),
    },
    {
      title: t("nav.contact"),
      url: getRelativeLocaleUrl(locale, "contect"),
    },
    {
      title: t("nav.about"),
      url: getRelativeLocaleUrl(locale, "about"),
    },
  ];
};

export const getFooterMenu = (locale: keyof typeof ui = defaultLang) => {
  const t = useTranslations(locale);
  return [
    {
      title: t("nav.about"),
      url: getRelativeLocaleUrl(locale, "about"),
    },
    {
      title: t("nav.contact"),
      url: getRelativeLocaleUrl(locale, "contact"),
    },
    {
      title: t("nav.privacy-policy"),
      url: getRelativeLocaleUrl(locale, "privacy-policy"),
    },
  ];
};
