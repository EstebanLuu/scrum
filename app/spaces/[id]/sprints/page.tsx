"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
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
import { Calendar, Plus, MoreHorizontal, Edit, Trash2, CheckCircle2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SprintsPage({ params }: { params: { id: string } }) {
  const [sprints, setSprints] = useState([
    {
      id: 1,
      name: "Sprint 1",
      startDate: "2023-10-01",
      endDate: "2023-10-14",
      status: "Completado",
      progress: 100,
      tasks: [
        { id: 1, title: "Diseñar interfaz de usuario", status: "Completado", assignee: "María Pérez" },
        { id: 2, title: "Implementar autenticación", status: "Completado", assignee: "Juan Gómez" },
        { id: 3, title: "Crear API de usuarios", status: "Completado", assignee: "Carlos Rodríguez" },
        { id: 4, title: "Pruebas unitarias", status: "Completado", assignee: "Laura González" },
      ],
      meetings: [
        { id: 1, title: "Planning", date: "2023-10-01", notes: "Definición de tareas para el sprint" },
        { id: 2, title: "Daily 1", date: "2023-10-02", notes: "Actualización de progreso" },
        { id: 3, title: "Review", date: "2023-10-14", notes: "Revisión de entregables" },
        { id: 4, title: "Retrospectiva", date: "2023-10-14", notes: "Análisis de mejoras para próximo sprint" },
      ],
    },
    {
      id: 2,
      name: "Sprint 2",
      startDate: "2023-10-15",
      endDate: "2023-10-28",
      status: "En progreso",
      progress: 60,
      tasks: [
        { id: 1, title: "Implementar dashboard", status: "Completado", assignee: "María Pérez" },
        { id: 2, title: "Integrar API de pagos", status: "En progreso", assignee: "Juan Gómez" },
        { id: 3, title: "Optimizar rendimiento", status: "En progreso", assignee: "Carlos Rodríguez" },
        { id: 4, title: "Pruebas de integración", status: "Pendiente", assignee: "Laura González" },
        { id: 5, title: "Documentar API", status: "Completado", assignee: "Ana Martínez" },
      ],
      meetings: [
        { id: 1, title: "Planning", date: "2023-10-15", notes: "Definición de tareas para el sprint" },
        { id: 2, title: "Daily 1", date: "2023-10-16", notes: "Actualización de progreso" },
        { id: 3, title: "Daily 2", date: "2023-10-17", notes: "Actualización de progreso" },
      ],
    },
    {
      id: 3,
      name: "Sprint 3",
      startDate: "2023-10-29",
      endDate: "2023-11-11",
      status: "Planificado",
      progress: 0,
      tasks: [
        { id: 1, title: "Implementar notificaciones", status: "Pendiente", assignee: "María Pérez" },
        { id: 2, title: "Añadir exportación a PDF", status: "Pendiente", assignee: "Juan Gómez" },
        { id: 3, title: "Mejorar accesibilidad", status: "Pendiente", assignee: "Carlos Rodríguez" },
        { id: 4, title: "Pruebas de usabilidad", status: "Pendiente", assignee: "Laura González" },
      ],
      meetings: [{ id: 1, title: "Planning", date: "2023-10-29", notes: "Pendiente" }],
    },
  ])

  const [activeSprint, setActiveSprint] = useState(null)
  const [newSprint, setNewSprint] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "Planificado",
  })
  const [newTask, setNewTask] = useState({
    title: "",
    status: "Pendiente",
    assignee: "",
  })
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    date: "",
    notes: "",
  })
  const [statusFilter, setStatusFilter] = useState("all")
  const [openSprintDialog, setOpenSprintDialog] = useState(false)
  const [openTaskDialog, setOpenTaskDialog] = useState(false)
  const [openMeetingDialog, setOpenMeetingDialog] = useState(false)

  const { toast } = useToast()

  // Filtrar sprints por estado
  const filteredSprints = sprints.filter((sprint) => {
    if (statusFilter === "all") return true
    return sprint.status.toLowerCase() === statusFilter.toLowerCase()
  })

  const handleCreateSprint = () => {
    if (!newSprint.name || !newSprint.startDate || !newSprint.endDate) {
      toast({
        title: "Error",
        description: "El nombre, fecha de inicio y fecha de fin son obligatorios",
        variant: "destructive",
      })
      return
    }

    const sprint = {
      id: sprints.length + 1,
      name: newSprint.name,
      startDate: newSprint.startDate,
      endDate: newSprint.endDate,
      status: newSprint.status,
      progress: 0,
      tasks: [],
      meetings: [],
    }

    setSprints([...sprints, sprint])
    setNewSprint({
      name: "",
      startDate: "",
      endDate: "",
      status: "Planificado",
    })
    setOpenSprintDialog(false)

    toast({
      title: "Sprint creado",
      description: `El sprint "${sprint.name}" ha sido creado correctamente`,
    })
  }

  const handleAddTask = () => {
    if (!newTask.title || !newTask.assignee) {
      toast({
        title: "Error",
        description: "El título y el responsable son obligatorios",
        variant: "destructive",
      })
      return
    }

    const updatedSprints = sprints.map((sprint) => {
      if (sprint.id === activeSprint.id) {
        const task = {
          id: sprint.tasks.length + 1,
          title: newTask.title,
          status: newTask.status,
          assignee: newTask.assignee,
        }

        // Calcular nuevo progreso
        const updatedTasks = [...sprint.tasks, task]
        const completedTasks = updatedTasks.filter((t) => t.status === "Completado").length
        const progress = Math.round((completedTasks / updatedTasks.length) * 100)

        return {
          ...sprint,
          tasks: updatedTasks,
          progress,
        }
      }
      return sprint
    })

    setSprints(updatedSprints)
    setNewTask({
      title: "",
      status: "Pendiente",
      assignee: "",
    })
    setOpenTaskDialog(false)

    toast({
      title: "Tarea añadida",
      description: "La tarea ha sido añadida correctamente",
    })
  }

  const handleAddMeeting = () => {
    if (!newMeeting.title || !newMeeting.date) {
      toast({
        title: "Error",
        description: "El título y la fecha son obligatorios",
        variant: "destructive",
      })
      return
    }

    const updatedSprints = sprints.map((sprint) => {
      if (sprint.id === activeSprint.id) {
        const meeting = {
          id: sprint.meetings.length + 1,
          title: newMeeting.title,
          date: newMeeting.date,
          notes: newMeeting.notes,
        }

        return {
          ...sprint,
          meetings: [...sprint.meetings, meeting],
        }
      }
      return sprint
    })

    setSprints(updatedSprints)
    setNewMeeting({
      title: "",
      date: "",
      notes: "",
    })
    setOpenMeetingDialog(false)

    toast({
      title: "Reunión añadida",
      description: "La reunión ha sido añadida correctamente",
    })
  }

  const handleDeleteSprint = (sprintId) => {
    setSprints(sprints.filter((sprint) => sprint.id !== sprintId))

    toast({
      title: "Sprint eliminado",
      description: "El sprint ha sido eliminado correctamente",
    })
  }

  const handleUpdateTaskStatus = (sprintId, taskId, newStatus) => {
    const updatedSprints = sprints.map((sprint) => {
      if (sprint.id === sprintId) {
        const updatedTasks = sprint.tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, status: newStatus }
          }
          return task
        })

        // Recalcular progreso
        const completedTasks = updatedTasks.filter((t) => t.status === "Completado").length
        const progress = Math.round((completedTasks / updatedTasks.length) * 100)

        return {
          ...sprint,
          tasks: updatedTasks,
          progress,
        }
      }
      return sprint
    })

    setSprints(updatedSprints)
  }

  // Simulamos obtener el nombre de la organización basado en el ID
  const organizationName = "Gestini Software"

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/spaces">Espacios</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/spaces/${params.id}`}>{organizationName}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/spaces/${params.id}/sprints`}>Sprints</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Sprints</h1>
          <Dialog open={openSprintDialog} onOpenChange={setOpenSprintDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo sprint
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear nuevo sprint</DialogTitle>
                <DialogDescription>Añade un nuevo sprint para la organización</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="sprintName">Nombre</Label>
                  <Input
                    id="sprintName"
                    value={newSprint.name}
                    onChange={(e) => setNewSprint({ ...newSprint, name: e.target.value })}
                    placeholder="Nombre del sprint"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="sprintStartDate">Fecha de inicio</Label>
                    <Input
                      id="sprintStartDate"
                      type="date"
                      value={newSprint.startDate}
                      onChange={(e) => setNewSprint({ ...newSprint, startDate: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sprintEndDate">Fecha de fin</Label>
                    <Input
                      id="sprintEndDate"
                      type="date"
                      value={newSprint.endDate}
                      onChange={(e) => setNewSprint({ ...newSprint, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sprintStatus">Estado</Label>
                  <Select
                    value={newSprint.status}
                    onValueChange={(value) => setNewSprint({ ...newSprint, status: value })}
                  >
                    <SelectTrigger id="sprintStatus">
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planificado">Planificado</SelectItem>
                      <SelectItem value="En progreso">En progreso</SelectItem>
                      <SelectItem value="Completado">Completado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenSprintDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateSprint}>Crear sprint</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Label htmlFor="statusFilter">Filtrar por estado:</Label>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger id="statusFilter" className="w-[180px]">
            <SelectValue placeholder="Seleccionar estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="planificado">Planificado</SelectItem>
            <SelectItem value="en progreso">En progreso</SelectItem>
            <SelectItem value="completado">Completado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSprints.map((sprint) => (
          <Card key={sprint.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>{sprint.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setActiveSprint(sprint)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 dark:text-red-400"
                      onClick={() => handleDeleteSprint(sprint.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>
                {sprint.startDate} - {sprint.endDate}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <Badge
                    className={
                      sprint.status === "Completado"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : sprint.status === "En progreso"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    }
                  >
                    {sprint.status}
                  </Badge>
                  <span>{sprint.progress}% completado</span>
                </div>
                <Progress value={sprint.progress} className="h-2" />
                <div className="pt-2 text-sm text-muted-foreground">
                  {sprint.tasks.filter((t) => t.status === "Completado").length} de {sprint.tasks.length} tareas
                  completadas
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setActiveSprint(sprint)}>
                Ver detalles
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Diálogo para ver detalles del sprint */}
      <Dialog open={!!activeSprint} onOpenChange={(open) => !open && setActiveSprint(null)}>
        <DialogContent className="max-w-4xl">
          {activeSprint && (
            <>
              <DialogHeader>
                <DialogTitle>{activeSprint.name}</DialogTitle>
                <DialogDescription>
                  {activeSprint.startDate} - {activeSprint.endDate} • {activeSprint.status}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Tabs defaultValue="tasks">
                  <TabsList>
                    <TabsTrigger value="tasks">Tareas</TabsTrigger>
                    <TabsTrigger value="meetings">Reuniones</TabsTrigger>
                    <TabsTrigger value="summary">Resumen</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tasks" className="space-y-4 pt-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Tareas</h3>
                      <Dialog open={openTaskDialog} onOpenChange={setOpenTaskDialog}>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Añadir tarea
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Añadir nueva tarea</DialogTitle>
                            <DialogDescription>Añade una nueva tarea a este sprint</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="taskTitle">Título</Label>
                              <Input
                                id="taskTitle"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                placeholder="Título de la tarea"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="taskStatus">Estado</Label>
                              <Select
                                value={newTask.status}
                                onValueChange={(value) => setNewTask({ ...newTask, status: value })}
                              >
                                <SelectTrigger id="taskStatus">
                                  <SelectValue placeholder="Selecciona un estado" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                                  <SelectItem value="En progreso">En progreso</SelectItem>
                                  <SelectItem value="Completado">Completado</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="taskAssignee">Responsable</Label>
                              <Input
                                id="taskAssignee"
                                value={newTask.assignee}
                                onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                                placeholder="Nombre del responsable"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenTaskDialog(false)}>
                              Cancelar
                            </Button>
                            <Button onClick={handleAddTask}>Añadir tarea</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Responsable</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {activeSprint.tasks.map((task) => (
                            <TableRow key={task.id}>
                              <TableCell className="font-medium">{task.title}</TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    task.status === "Completado"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                      : task.status === "En progreso"
                                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                  }
                                >
                                  {task.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{task.assignee}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => handleUpdateTaskStatus(activeSprint.id, task.id, "Pendiente")}
                                    >
                                      Marcar como pendiente
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleUpdateTaskStatus(activeSprint.id, task.id, "En progreso")}
                                    >
                                      Marcar en progreso
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleUpdateTaskStatus(activeSprint.id, task.id, "Completado")}
                                    >
                                      <CheckCircle2 className="mr-2 h-4 w-4" />
                                      Marcar como completada
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                          {activeSprint.tasks.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center text-muted-foreground">
                                No hay tareas para este sprint. Añade una nueva tarea para comenzar.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  <TabsContent value="meetings" className="space-y-4 pt-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Reuniones</h3>
                      <Dialog open={openMeetingDialog} onOpenChange={setOpenMeetingDialog}>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Añadir reunión
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Añadir nueva reunión</DialogTitle>
                            <DialogDescription>Añade una nueva reunión a este sprint</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="meetingTitle">Título</Label>
                              <Input
                                id="meetingTitle"
                                value={newMeeting.title}
                                onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                                placeholder="Título de la reunión"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="meetingDate">Fecha</Label>
                              <Input
                                id="meetingDate"
                                type="date"
                                value={newMeeting.date}
                                onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="meetingNotes">Notas</Label>
                              <Input
                                id="meetingNotes"
                                value={newMeeting.notes}
                                onChange={(e) => setNewMeeting({ ...newMeeting, notes: e.target.value })}
                                placeholder="Notas de la reunión"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenMeetingDialog(false)}>
                              Cancelar
                            </Button>
                            <Button onClick={handleAddMeeting}>Añadir reunión</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="space-y-4">
                      {activeSprint.meetings.map((meeting) => (
                        <Card key={meeting.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle className="text-lg">{meeting.title}</CardTitle>
                              <Badge variant="outline">
                                <Calendar className="mr-1 h-4 w-4" />
                                {meeting.date}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{meeting.notes}</p>
                          </CardContent>
                        </Card>
                      ))}
                      {activeSprint.meetings.length === 0 && (
                        <div className="text-center p-4 text-muted-foreground">
                          No hay reuniones para este sprint. Añade una nueva reunión para comenzar.
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="summary" className="space-y-4 pt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Progreso</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                              <span>Tareas completadas</span>
                              <span>
                                {activeSprint.tasks.filter((t) => t.status === "Completado").length} de{" "}
                                {activeSprint.tasks.length}
                              </span>
                            </div>
                            <Progress value={activeSprint.progress} className="h-2" />
                            <div className="flex justify-between text-sm">
                              <span>0%</span>
                              <span>100%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Información</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Fecha de inicio:</span>
                              <span>{activeSprint.startDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Fecha de fin:</span>
                              <span>{activeSprint.endDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Estado:</span>
                              <Badge
                                className={
                                  activeSprint.status === "Completado"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                    : activeSprint.status === "En progreso"
                                      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                      : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                }
                              >
                                {activeSprint.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Reuniones:</span>
                              <span>{activeSprint.meetings.length}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Distribución de tareas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {activeSprint.tasks.length > 0 ? (
                            <>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Pendientes:</span>
                                <span>{activeSprint.tasks.filter((t) => t.status === "Pendiente").length}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">En progreso:</span>
                                <span>{activeSprint.tasks.filter((t) => t.status === "En progreso").length}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Completadas:</span>
                                <span>{activeSprint.tasks.filter((t) => t.status === "Completado").length}</span>
                              </div>
                            </>
                          ) : (
                            <div className="text-center p-4 text-muted-foreground">No hay tareas para este sprint.</div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setActiveSprint(null)}>
                  Cerrar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
