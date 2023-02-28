import './globals.css'
import Navbar from './components/Navbar'
export const metadata = {
  title: `Lakshman's portfolio`,
  description: 'Portfolio of Lakshmanshankar ',
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
