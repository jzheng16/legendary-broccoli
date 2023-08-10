import './globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Provider from "@/app/context/client-provider"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import FeatureList from './components/FeatureList';
import Hero from './components/Hero'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <Provider session={session}>
        <body className={inter.className}>
          <Navbar />
          <Hero />
          <FeatureList />
          {children}
        </body>
      </Provider>
    </html>
  )
}
