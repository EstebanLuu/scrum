"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, MoreHorizontal, Search } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"

export default function WorkspacePage({ params }: { params: { id: string; workspaceId: string } }) {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Diseñar interfaz de usuario",
      description: "Crear wireframes y mockups",
      status: "Por hacer",
      assignee: "María Pérez",
      priority: "Alta",
      createdAt: "2023-10-15",
    },
    {
      id: 2,
      title: "Implementar autenticación",
      description: "Configurar sistema de login y registro",
      status: "En progreso",
      assignee: "Juan Gómez",
      priority: "Alta",
      createdAt: "2023-10-16",
    },
    {
      id: 3,
      title: "Crear API de usuarios",
      description: "Endpoints para gestión de usuarios",
      status: "En progreso",
      assignee: "Carlos Rodríguez",
      priority: "Media",
      createdAt: "2023-10-17",
    },
    {
      id: 4,
      title: "Pruebas unitarias",
      description: "Escribir tests para componentes principales",
      status: "Por hacer",
      assignee: "Laura González",
      priority: "Baja",
      createdAt: "2023-10-18",
    },
    {
      id: 5,
      title: "Documentar API",
      description: "Crear documentación con Swagger",
      status: "Completado",
      assignee: "Ana Martínez",
      priority: "Media",
      createdAt: "2023-10-19",
    },
    {
      id: 6,
      title: "Optimizar rendimiento",
      description: "Mejorar tiempos de carga",
      status: "Por hacer",
      assignee: "Pedro López",
      priority: "Media",
      createdAt: "2023-10-20",
    },
    {
      id: 7,
      title: "Implementar notificaciones",
      description: "Sistema de notificaciones en tiempo real",
      status: "Por hacer",
      assignee: "María Pérez",
      priority: "Baja",
      createdAt: "2023-10-21",
    },
    {
      id: 8,
      title: "Diseñar logo",
      description: "Crear logo para la aplicación",
      status: "Completado",
      assignee: "Ana Martínez",
      priority: "Media",
      createdAt: "2023-10-22",
    },
  ])

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Por hacer",
    assignee: "",
    priority: "Media",
  })

  const [open, setOpen] = useState(false)
  const [view, setView] = useState("board")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("Todos")
  const [priorityFilter, setPriorityFilter] = useState("Todas")
  const [currentPage, setCurrentPage] = useState(1)
  const tasksPerPage = 5

  const { toast } = useToast()

  const team = [
    { id: 1, name: "María Pérez", role: "Diseñadora UI/UX" },
    { id: 2, name: "Juan Gómez", role: "Desarrollador Frontend" },
    { id: 3, name: "Carlos Rodríguez", role: "Desarrollador Backend" },
    { id: 4, name: "Laura González", role: "QA Tester" },
    { id: 5, name: "Ana Martínez", role: "Documentación" },
    { id: 6, name: "Pedro López", role: "DevOps" },
  ]

  const handleCreateTask = () => {
    if (!newTask.title) {
      toast({
        title: "Error",
        description: "El título de la tarea es obligatorio",
        variant: "destructive",
      })
      return
    }

    const task = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      assignee: newTask.assignee,
      priority: newTask.priority,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setTasks([...tasks, task])
    setNewTask({ title: "", description: "", status: "Por hacer", assignee: "", priority: "Media" })
    setOpen(false)

    toast({
      title: "Tarea creada",
      description: `La tarea "${task.title}" ha sido creada correctamente`,
    })
  }

  const getStatusColumn = (status) => {
    return filteredTasks.filter((task) => task.status === status)
  }

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-800"
      case "Media":
        return "bg-amber-100 text-amber-800"
      case "Baja":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Por hacer":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            {status}
          </Badge>
        )
      case "En progreso":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800">
            {status}
          </Badge>
        )
      case "Completado":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            {status}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Filtrar tareas basado en búsqueda y filtros
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "Todos" || task.status === statusFilter
    const matchesPriority = priorityFilter === "Todas" || task.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Paginación para la vista de tabla
  const indexOfLastTask = currentPage * tasksPerPage
  const indexOfFirstTask = indexOfLastTask - tasksPerPage
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask)
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage)

  // Simulamos obtener los nombres basados en los IDs
  const organizationName = "Gestini Software"
  const workspaceName = "Tecnología"

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/organizations">Organizaciones</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/organizations/${params.id}`}>{organizationName}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/organizations/${params.id}/workspaces/${params.workspaceId}`}>
                {workspaceName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{workspaceName}</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nueva tarea
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear nueva tarea</DialogTitle>
                <DialogDescription>Añade una nueva tarea al tablero SCRUM</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Título de la tarea"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Descripción detallada"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="status">Estado</Label>
                    <Select
                      onValueChange={(value) => setNewTask({ ...newTask, status: value })}
                      defaultValue="Por hacer"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Por hacer">Por hacer</SelectItem>
                        <SelectItem value="En progreso">En progreso</SelectItem>
                        <SelectItem value="Completado">Completado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Prioridad</Label>
                    <Select onValueChange={(value) => setNewTask({ ...newTask, priority: value })} defaultValue="Media">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona prioridad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alta">Alta</SelectItem>
                        <SelectItem value="Media">Media</SelectItem>
                        <SelectItem value="Baja">Baja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignee">Asignar a</Label>
                  <Select onValueChange={(value) => setNewTask({ ...newTask, assignee: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un miembro" />
                    </SelectTrigger>
                    <SelectContent>
                      {team.map((member) => (
                        <SelectItem key={member.id} value={member.name}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateTask}>Crear tarea</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant={view === "board" ? "default" : "outline"} onClick={() => setView("board")}>
            Tablero
          </Button>
          <Button variant={view === "table" ? "default" : "outline"} onClick={() => setView("table")}>
            Tabla
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar tareas..."
              className="w-[200px] pl-8 md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              <SelectItem value="Por hacer">Por hacer</SelectItem>
              <SelectItem value="En progreso">En progreso</SelectItem>
              <SelectItem value="Completado">Completado</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Prioridad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todas">Todas</SelectItem>
              <SelectItem value="Alta">Alta</SelectItem>
              <SelectItem value="Media">Media</SelectItem>
              <SelectItem value="Baja">Baja</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {view === "board" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-3">
              <h3 className="font-semibold">Por hacer</h3>
            </div>
            {getStatusColumn("Por hacer").map((task) => (
              <Card key={task.id} className="cursor-pointer hover:shadow-md">
                <CardHeader className="p-4">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{task.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Mover a En progreso</DropdownMenuItem>
                        <DropdownMenuItem>Mover a Completado</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="line-clamp-2 text-xs">{task.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4 pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{task.assignee}</span>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-xs ${getPriorityClass(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-3">
              <h3 className="font-semibold">En progreso</h3>
            </div>
            {getStatusColumn("En progreso").map((task) => (
              <Card key={task.id} className="cursor-pointer hover:shadow-md">
                <CardHeader className="p-4">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{task.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Mover a Por hacer</DropdownMenuItem>
                        <DropdownMenuItem>Mover a Completado</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="line-clamp-2 text-xs">{task.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4 pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{task.assignee}</span>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-xs ${getPriorityClass(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-3">
              <h3 className="font-semibold">Completado</h3>
            </div>
            {getStatusColumn("Completado").map((task) => (
              <Card key={task.id} className="cursor-pointer hover:shadow-md">
                <CardHeader className="p-4">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{task.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Mover a Por hacer</DropdownMenuItem>
                        <DropdownMenuItem>Mover a En progreso</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="line-clamp-2 text-xs">{task.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4 pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{task.assignee}</span>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-xs ${getPriorityClass(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Prioridad</TableHead>
                    <TableHead>Asignado a</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{task.description}</TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell>
                        <span className={`rounded-full px-2 py-1 text-xs ${getPriorityClass(task.priority)}`}>
                          {task.priority}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{task.assignee}</span>
                        </div>
                      </TableCell>
                      <TableCell>{task.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Acciones</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Cambiar estado</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink isActive={currentPage === page} onClick={() => setCurrentPage(page)}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
