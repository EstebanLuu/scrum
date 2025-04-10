import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold text-primary">Gestini Admin</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost">Iniciar Sesión</Button>
              </Link>
              <Link href="/register">
                <Button>Registrarse</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                    Gestini Admin
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Plataforma interna para la gestión de proyectos con metodología SCRUM para Gestini Software.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="w-full">
                      Comenzar ahora
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="w-full">
                      Iniciar sesión
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Dashboard Preview"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Características</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Todo lo que necesitas para gestionar tus proyectos de desarrollo de software
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Tableros SCRUM</CardTitle>
                  <CardDescription>Organiza tus tareas en tableros SCRUM personalizables</CardDescription>
                </CardHeader>
                <CardContent>
                  Visualiza el progreso de tus proyectos con tableros SCRUM que muestran el estado de cada tarea.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Estructura jerárquica</CardTitle>
                  <CardDescription>Organiza tus proyectos en empresas, sectores y carpetas</CardDescription>
                </CardHeader>
                <CardContent>
                  Crea una estructura jerárquica para organizar tus proyectos según tus necesidades.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard personalizado</CardTitle>
                  <CardDescription>Visualiza tus tareas pendientes y el progreso de tus proyectos</CardDescription>
                </CardHeader>
                <CardContent>
                  Accede a un dashboard personalizado con tus tareas pendientes, gráficos de progreso y anuncios.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Gestini Software. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
