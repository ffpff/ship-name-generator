import './globals.css';
import type { Metadata, Viewport } from 'next';
import React from 'react';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Ship Name Generator | Perfect Names for Your Vessel',
  description: 'Generate the perfect ship name with our free ship name generator. Combine names and choose from various styles to create a unique vessel name.',
  keywords: 'ship name generator, boat name, vessel name, yacht name, maritime naming',
  robots: 'index, follow',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'Ship Name Generator | Perfect Names for Your Vessel',
    description: 'Generate the perfect ship name with our free ship name generator. Combine names and choose from various styles to create a unique vessel name.',
    url: 'https://ship-name-generator.vercel.app',
    siteName: 'Ship Name Generator',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ship Name Generator Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
        <footer className="mt-12 py-8 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} Ship Name Generator. All rights reserved.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-sm text-gray-500">
                  Contact: <a href="mailto:contact@shipnamegenerator.com" className="text-ocean-blue hover:underline">contact@shipnamegenerator.com</a>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  123 Harbor Way, Coastal City, CA 90210, USA
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
} 