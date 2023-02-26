import './globals.css'
import Navbar from './components/Navbar'
export const metadata = {
  title: `Lakshman's LinkTree`,
  description: 'Online Portfolio of Lakshman',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

    
      <body>
        <Navbar />
        {children}</body>
    </html>
  )
}
