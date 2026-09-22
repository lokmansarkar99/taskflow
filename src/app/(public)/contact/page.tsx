import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Mail, MessageCircleQuestion } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact | TaskFlow",
  description: "Get in touch with the TaskFlow team.",
};

const contactOptions = [
  {
    title: "General questions",
    description: "Need help choosing a plan or understanding how TaskFlow works? Send us a note.",
    action: "Email hello@taskflow.app",
    href: "mailto:hello@taskflow.app",
    icon: Mail,
  },
  {
    title: "Product support",
    description: "Already using TaskFlow? We can help you work through a product or account question.",
    action: "Visit the help center",
    href: "mailto:support@taskflow.app",
    icon: MessageCircleQuestion,
  },
];

export default function ContactPage() {
  return (
    <div>
      <section className="border-b border-border/60 bg-muted/20 px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Let&apos;s talk</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Questions are part of the work</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Whether you are getting started or planning a larger workspace, reach out and we&apos;ll point you in the right direction.
          </p>
        </div>
      </section>

      <section aria-labelledby="contact-options-heading" className="px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 id="contact-options-heading" className="sr-only">Contact options</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {contactOptions.map(({ title, description, action, href, icon: Icon }) => (
              <Card key={title} className="h-full">
                <CardHeader>
                  <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-muted">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="flex h-full flex-col items-start gap-6 text-muted-foreground">
                  <p>{description}</p>
                  <Button variant="outline" render={<Link href={href} />}>
                    {action}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
