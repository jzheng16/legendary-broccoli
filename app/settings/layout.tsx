

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log('rendering settings layouit..')
  return (
    
    <div>
      <p>Settings Layout</p>
      
      {children}
    </div>
  )
}
