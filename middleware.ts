import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['en', 'zh', 'ja', 'ko']
const defaultLocale = 'en'

// 获取用户优先的语言
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language') || ''
  const headers = { 'accept-language': acceptLanguage }
  const languages = new Negotiator({ headers }).languages()
  
  return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // 如果URL中没有语言代码，重定向到用户优先的语言版本
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    // 排除 Google 验证文件和其他静态资源
    '/((?!api|_next|favicon.ico|googlea023cd55c25bf58a.html|robots.txt|sitemap.xml).*)',
  ],
} 