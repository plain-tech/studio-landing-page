import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Me - AI Room Design Based on Your Instagram | TheRenderAI",
  description:
    "Get a personalized living room design based on your Instagram aesthetic. AI analyzes your style and creates a room that matches your vibe.",
  openGraph: {
    title: "Design Me - AI Room Design Based on Your Instagram",
    description:
      "Get a personalized living room design based on your Instagram aesthetic. AI analyzes your style and creates a room that matches your vibe.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Me - AI Room Design Based on Your Instagram",
    description:
      "Get a personalized living room design based on your Instagram aesthetic.",
  },
};

export default function DesignMeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use children directly - the page handles its own header/footer
  return <>{children}</>;
}
