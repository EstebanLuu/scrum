import type React from "react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
              <span className="font-bold text-primary">Gestini Admin</span>
            </Link>
            <div className="flex items-center space-x-2">
              <form className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar..." className="w-[200px] pl-8 md:w-[300px] lg:w-[300px]" />
              </form>
            </div>
          </div>
          <Button variant="outline" size="icon" className="mr-2 md:hidden">
            <Search className="h-4 w-4" />
            <span className="sr-only">Buscar</span>
          </Button>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <ModeToggle />
              <UserNav />
            </nav>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 flex-col border-r bg-background px-4 py-6 hidden md:flex">
          <MainNav />
        </aside>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
