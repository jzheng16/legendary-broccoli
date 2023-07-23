import Link from 'next/link';
export default async function Navbar() {
  return (
    <nav>
      <ul className="flex items-center bg-indigo-600 h-12 p-4">
        <li className="ml-4">
          Logo
        </li>
        <li className="ml-auto mr-5">
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  )
}