import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { redirect } from "next/navigation";

export default function LocalePage() {
  const localActive = useLocale();
  return redirect(`/${localActive}/home`);
}
