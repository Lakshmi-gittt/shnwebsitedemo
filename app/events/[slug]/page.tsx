import { notFound } from "next/navigation";
import { upcomingNights } from "@/lib/data";
import EventDetailClient from "./EventDetailClient";

export function generateStaticParams() {
  return upcomingNights.map((night) => ({ slug: night.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const night = upcomingNights.find((n) => n.slug === slug);
  if (!night) notFound();
  return <EventDetailClient night={night} />;
}
