import type { Metadata } from 'next'
import { locales } from '../i18n/config'
import Header from '../components/Header'
import '../globals.css'

interface Props {
  children: React.ReactNode
  params: { lang: string }
}

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  // 动态导入语言文件
  const messages = await import(`@/app/i18n/locales/${lang}.json`)

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
    alternates: {
      languages: {
        'x-default': '/en',
        en: '/en',
        zh: '/zh',
        ja: '/ja',
        ko: '/ko',
      },
    },
  }
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default function RootLayout({ children, params: { lang } }: Props) {
  return (
    <html lang={lang}>
      <body>
        <div className="min-h-screen flex flex-col">
          <Header lang={lang} />
          
          <main className="flex-grow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>

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
        </div>
      </body>
    </html>
  )
} 