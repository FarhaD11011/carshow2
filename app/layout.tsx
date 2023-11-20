import { Footer, Navbar } from '@/components'
import './globals.css'


export const metadata = {
  title: 'Mango-Car-Rental',
  description: 'Discover all like exotic cars experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='relative'>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
