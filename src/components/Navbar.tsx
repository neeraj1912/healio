import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-pink-200 p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">Lumo</h1>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/journal">Journal</Link>
        <Link href="/chat">Chat</Link>
        <Link href="/wellness">Wellness</Link>
        <Link href="/profile">Profile</Link>
      </div>
    </nav>
  )
}
