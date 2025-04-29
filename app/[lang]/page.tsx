'use client'

import { useState, useEffect } from 'react'
import NameGeneratorForm from '../components/NameGeneratorForm'

interface Props {
  params: { lang: string }
}

export default function Home({ params: { lang } }: Props) {
  const [messages, setMessages] = useState<any>(null)

  // 在组件挂载时加载语言文件
  useEffect(() => {
    import(`@/app/i18n/locales/${lang}.json`).then((m) => setMessages(m.default))
  }, [lang])

  if (!messages) return null

  return (
    <main className="py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-deep-blue mb-3">
          {messages.home.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {messages.home.subtitle}
        </p>
      </header>

      <section className="mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-deep-blue mb-4">
                {messages.home.howItWorks}
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-ocean-blue text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">{messages.home.step1Title}</h3>
                    <p className="text-gray-600">
                      {messages.home.step1Description}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-ocean-blue text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">{messages.home.step2Title}</h3>
                    <p className="text-gray-600">
                      {messages.home.step2Description}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-ocean-blue text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">{messages.home.step3Title}</h3>
                    <p className="text-gray-600">
                      {messages.home.step3Description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <NameGeneratorForm lang={lang} messages={messages} />
          
        </div>
      </section>
    </main>
  );
} 