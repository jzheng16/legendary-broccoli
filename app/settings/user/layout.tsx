import Link from 'next/link'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <div>
      <p>User Layout</p>
      <Link href="/settings/password">Password</Link>
      {children}
    </div>
  )
}
