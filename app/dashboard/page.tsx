import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Calendar,
  Clock,
  Plus,
  AlertCircle,
  CheckCircle2,
  Circle,
  ArrowUpCircle,
  FolderKanban,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva tarea
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="tasks">Mis tareas</TabsTrigger>
          <TabsTrigger value="announcements">Anuncios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tareas pendientes</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 desde ayer</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tareas completadas</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+8 esta semana</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Proyectos activos</CardTitle>
                <FolderKanban className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">+1 este mes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Próximos eventos</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Daily Scrum en 2 horas</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Progreso del sprint actual</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  <BarChart className="h-16 w-16" />
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Actividad reciente</CardTitle>
                <CardDescription>Últimas actualizaciones en tus proyectos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg" alt="Avatar" />
                      <AvatarFallback>MP</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">María Pérez completó la tarea "Diseño de UI"</p>
                      <p className="text-sm text-muted-foreground">Hace 45 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg" alt="Avatar" />
                      <AvatarFallback>CR</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Carlos Rodríguez creó una nueva tarea</p>
                      <p className="text-sm text-muted-foreground">Hace 2 horas</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg" alt="Avatar" />
                      <AvatarFallback>LG</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Laura González actualizó el estado del proyecto
                      </p>
                      <p className="text-sm text-muted-foreground">Hace 5 horas</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mis tareas pendientes</CardTitle>
              <CardDescription>Ordenadas por prioridad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <ArrowUpCircle className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-sm font-medium leading-none">Implementar autenticación</p>
                      <p className="text-sm text-muted-foreground">Proyecto: Portal de clientes</p>
                    </div>
                  </div>
                  <Badge className="bg-red-500">Alta</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <ArrowUpCircle className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium leading-none">Corregir errores en formulario</p>
                      <p className="text-sm text-muted-foreground">Proyecto: Sistema de inventario</p>
                    </div>
                  </div>
                  <Badge className="bg-amber-500">Media</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Circle className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium leading-none">Actualizar documentación</p>
                      <p className="text-sm text-muted-foreground">Proyecto: API de pagos</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-500">Baja</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Circle className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium leading-none">Revisar diseño responsive</p>
                      <p className="text-sm text-muted-foreground">Proyecto: Sitio web corporativo</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-500">Baja</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Anuncios importantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <AlertCircle className="h-10 w-10 text-amber-500" />
                    <div>
                      <h3 className="font-semibold">Actualización de plataforma</h3>
                      <p className="text-sm text-muted-foreground">
                        Este fin de semana realizaremos una actualización importante del sistema. Por favor, guarda tu
                        trabajo antes del viernes.
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">Publicado hace 2 días</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <AlertCircle className="h-10 w-10 text-green-500" />
                    <div>
                      <h3 className="font-semibold">Nuevo cliente incorporado</h3>
                      <p className="text-sm text-muted-foreground">
                        Damos la bienvenida a Empresa XYZ como nuevo cliente. Pronto comenzaremos a trabajar en sus
                        proyectos.
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">Publicado hace 5 días</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
