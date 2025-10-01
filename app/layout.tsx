import './globals.css'

export const metadata = {
  title: 'Saandeep - Backend + AI Developer',
  description: 'Professional portfolio of Turpu Saandeep Sai, Backend and AI Developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}