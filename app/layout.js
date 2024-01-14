import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/store/provider'
import { AuthProvider } from '@/utils/authContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sistem Penunjang Keputusan PT. Bank Jasa Jakarta',
  description: 'Crafted by Dwi Setiabudi',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <Providers>
        {/* <AuthProvider> */}
        <body className={inter.className}>{children}</body>
        {/* </AuthProvider> */}
      </Providers>
    </html>
  )
}
