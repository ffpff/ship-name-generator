'use client'

import { useState, useEffect } from 'react'
import LanguageSwitcher from './LanguageSwitcher'

interface HeaderProps {
  lang: string
}

export default function Header({ lang }: HeaderProps) {
  const [messages, setMessages] = useState<any>(null)

  useEffect(() => {
    import(`@/app/i18n/locales/${lang}.json`).then((m) => setMessages(m.default))
  }, [lang])

  if (!messages) return null

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href={`/${lang}`} className="text-xl font-semibold text-deep-blue">
              {messages.home.title}
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </header>
  )
} 