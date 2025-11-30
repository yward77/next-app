import './globals.css';
export const metadata = {
  title: "Siwa Fragrances",
  description:
    "Discover the elegance of Siwa Fragrances — luxury scents crafted with passion.",
  keywords: [
    "Siwa",
    "Fragrances",
    "Perfume",
    "Luxury Perfumes",
    "Arabic Perfumes",
    "Siwa Fragrances"
  ],
  authors: [{ name: "Siwa Team" }],
  creator: "Siwa",
  metadataBase: new URL("https://your-domain.com"),

  openGraph: {
    title: "Siwa Fragrances",
    description:
      "Luxury meets tradition in every scent — Siwa Fragrances.",
    url: "https://your-domain.com",
    siteName: "Siwa Fragrances",
    type: "website",
    images: [
      {
        url: "/logo5-new.avif",
        width: 1200,
        height: 630,
        alt: "Siwa Fragrances",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Siwa Fragrances",
    description:
      "Discover the elegance of Siwa Fragrances — luxury scents crafted with passion.",
    images: ["/logo5-new.avif"],
  },

  icons: {
    icon: "/logo5-new.avif",
    shortcut: "/logo5-new.avif",
    apple: "/logo5-new.avif",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        style={{
          fontFamily: 'var(--font-geist-sans)',
        }}
      >
        {children}
      </body>
    </html>
  );
}
