
import type { Metadata } from 'next'
import './globals.css'
import AntdProvider from '@/component/AntdProvider'
import './../styles/antdOverride.css'
import './../styles/commonClasses.css'
import './../styles/layout.css'
import './../styles/loader.css'
import ReduxProvider from '@/component/ReduxProvider'


export const metadata: Metadata = {
  title: 'Job-site-nextjs',
  description: 'Created by Blackghost',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet"/>
      </head>
      <body >
        <ReduxProvider>
          <AntdProvider>
            {children}
          </AntdProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
