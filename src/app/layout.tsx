import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BackgroundCanvas } from '@/components/ui/BackgroundCanvas';
import { ProjectDetailModal } from '@/components/sections/ProjectDetailModal';
import { AIChatbot } from '@/components/ui/AIChatbot';
import { JsonLd } from '@/components/common/JsonLd';
import { personalDetails } from '@/data/portfolioData';

export const metadata: Metadata = {
  metadataBase: new URL('https://samsul-arefin.dev'),
  title: {
    default: `${personalDetails.name} | Software Engineer & Agentic AI Specialist`,
    template: `%s | ${personalDetails.name}`,
  },
  description: personalDetails.bio,
  keywords: [
    'Samsul Arefin',
    'Software Engineer',
    'Web Developer',
    'Frontend Developer',
    'Agentic AI',
    'Claude Agent Specialist',
    'Next.js 14',
    'React Developer',
    'TypeScript',
    'Tailwind CSS',
    'Full Stack Engineer',
    'Portfolio',
    'Dhaka Bangladesh',
  ],
  authors: [{ name: personalDetails.name, url: 'https://samsul-arefin.dev' }],
  creator: personalDetails.name,
  publisher: personalDetails.name,
  category: 'Technology & Software Engineering',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: `${personalDetails.name} | Software Engineer & Agentic AI Specialist`,
    description: personalDetails.bio,
    url: 'https://samsul-arefin.dev',
    type: 'website',
    locale: 'en_US',
    siteName: `${personalDetails.name} Portfolio`,
    images: [
      {
        url: personalDetails.avatar,
        width: 1200,
        height: 630,
        alt: `${personalDetails.name} - Software Engineer Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalDetails.name} | Software Engineer Portfolio`,
    description: personalDetails.bio,
    images: [personalDetails.avatar],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <JsonLd />
      </head>
      <body className="bg-dark-bg text-slate-100 antialiased relative min-h-screen">
        <Providers>
          <BackgroundCanvas />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
          <ProjectDetailModal />
          <AIChatbot />
        </Providers>
      </body>
    </html>
  );
}


