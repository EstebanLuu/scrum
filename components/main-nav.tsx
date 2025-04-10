"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Building2, FolderKanban, Settings, LogOut, FileText, Users } from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Organizaciones",
    href: "/organizations",
    icon: Building2,
  },
  {
    title: "Proyectos",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Clientes",
    href: "/clients",
    icon: Users,
  },
  {
    title: "Documentos",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "Configuración",
    href: "/settings",
    icon: Settings,
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={pathname.startsWith(item.href) ? "default" : "ghost"}
            className={cn(
              "w-full justify-start gap-2",
              pathname.startsWith(item.href) ? "bg-primary text-primary-foreground" : "",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
      <Button
        variant="ghost"
        className="w-full justify-start gap-2 mt-auto text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
      >
        <LogOut className="h-4 w-4" />
        Cerrar sesión
      </Button>
    </div>
  )
}
