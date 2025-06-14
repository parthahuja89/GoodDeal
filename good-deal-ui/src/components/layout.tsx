import { AppNavbar } from "./AppNavbar"
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <AppNavbar />
      <main className="w-full">{children}</main>
    </div>
  )
}