
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from "./providers"
import './globals.css'
import './../styles/antdOverride.css'
import './../styles/commonClasses.css'
import './../styles/layout.css'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en" className = 'dark'> 
      <body className={inter.className} >
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  )
}