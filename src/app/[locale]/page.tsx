import React from "react";
import { notFound } from "next/navigation";
import { Locale } from "@/types/content";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Work } from "@/components/sections/Work";
import { Approach } from "@/components/sections/Approach";
import { Insights } from "@/components/sections/Insights";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Pillars locale={locale} dict={dict} />
      <Work locale={locale} dict={dict} />
      <Approach locale={locale} dict={dict} />
      <Insights locale={locale} dict={dict} />
      <About locale={locale} dict={dict} />
      <Contact dict={dict} />
    </>
  );
}
