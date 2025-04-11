"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, MoreHorizontal, Edit, Trash2, FileText, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

export default function OrganizationPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("scrum")
  const [scrumView, setScrumView] = useState("board")
  const [sectors, setSectors] = useState([
    { id: 1, name: "Ventas", description: "Equipo de ventas", projects: 3, members: 5 },
    { id: 2, name: "Tecnología", description: "Equipo de desarrollo", projects: 5, members: 8 },
    { id: 3, name: "Marketing", description: "Equipo de marketing", projects: 2, members: 4 },
    { id: 4, name: "Recursos Humanos", description: "Equipo de RRHH", projects: 1, members: 3 },
    { id: 5, name: "Finanzas", description: "Equipo de finanzas", projects: 1, members: 2 },
  ])

  const [members, setMembers] = useState([
    {
      id: 1,
      name: "María Pérez",
      role: "Diseñadora UI/UX",
      sector: "Tecnología",
      avatar: "MP",
      email: "maria@example.com",
    },
    {
      id: 2,
      name: "Juan Gómez",
      role: "Desarrollador Frontend",
      sector: "Tecnología",
      avatar: "JG",
      email: "juan@example.com",
    },
    {
      id: 3,
      name: "Carlos Rodríguez",
      role: "Desarrollador Backend",
      sector: "Tecnología",
      avatar: "CR",
      email: "carlos@example.com",
    },
    {
      id: 4,
      name: "Laura González",
      role: "QA Tester",
      sector: "Tecnología",
      avatar: "LG",
      email: "laura@example.com",
    },
    {
      id: 5,
      name: "Ana Martínez",
      role: "Documentación",
      sector: "Tecnología",
      avatar: "AM",
      email: "ana@example.com",
    },
    { id: 6, name: "Pedro López", role: "DevOps", sector: "Tecnología", avatar: "PL", email: "pedro@example.com" },
    {
      id: 7,
      name: "Sofía Ramírez",
      role: "Ejecutiva de Ventas",
      sector: "Ventas",
      avatar: "SR",
      email: "sofia@example.com",
    },
    {
      id: 8,
      name: "Miguel Torres",
      role: "Gerente de Ventas",
      sector: "Ventas",
      avatar: "MT",
      email: "miguel@example.com",
    },
    {
      id: 9,
      name: "Lucía Fernández",
      role: "Marketing Digital",
      sector: "Marketing",
      avatar: "LF",
      email: "lucia@example.com",
    },
    {
      id: 10,
      name: "Roberto Díaz",
      role: "Recursos Humanos",
      sector: "Recursos Humanos",
      avatar: "RD",
      email: "roberto@example.com",
    },
  ])

  // Estado para las columnas del tablero SCRUM
  const [columns, setColumns] = useState([
    { id: "backlog", title: "Backlog" },
    { id: "todo", title: "Por hacer" },
    { id: "in-progress", title: "En progreso" },
    { id: "review", title: "En revisión" },
    { id: "done", title: "Completado" },
  ])

  // Estado para las tareas del tablero SCRUM
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Diseñar interfaz de usuario",
      description: "Crear wireframes y mockups",
      status: "todo",
      assignee: "María Pérez",
      priority: "Alta",
      notes: "Incluir diseños para móvil y escritorio. Usar la paleta de colores corporativa.",
    },
    {
      id: 2,
      title: "Implementar autenticación",
      description: "Configurar sistema de login y registro",
      status: "in-progress",
      assignee: "Juan Gómez",
      priority: "Alta",
      notes: "Usar JWT para la autenticación. Implementar recuperación de contraseña.",
    },
    {
      id: 3,
      title: "Crear API de usuarios",
      description: "Endpoints para gestión de usuarios",
      status: "in-progress",
      assignee: "Carlos Rodríguez",
      priority: "Media",
      notes: "Seguir estándares RESTful. Documentar con Swagger.",
    },
    {
      id: 4,
      title: "Pruebas unitarias",
      description: "Escribir tests para componentes principales",
      status: "todo",
      assignee: "Laura González",
      priority: "Baja",
      notes: "Usar Jest para las pruebas. Alcanzar al menos 80% de cobertura.",
    },
    {
      id: 5,
      title: "Documentar API",
      description: "Crear documentación con Swagger",
      status: "done",
      assignee: "Ana Martínez",
      priority: "Media",
      notes: "Incluir ejemplos de uso para cada endpoint.",
    },
    {
      id: 6,
      title: "Optimizar rendimiento",
      description: "Mejorar tiempos de carga",
      status: "backlog",
      assignee: "Pedro López",
      priority: "Media",
      notes: "Enfocarse en la optimización de imágenes y lazy loading.",
    },
    {
      id: 7,
      title: "Implementar notificaciones",
      description: "Sistema de notificaciones en tiempo real",
      status: "backlog",
      assignee: "María Pérez",
      priority: "Baja",
      notes: "Usar WebSockets para notificaciones en tiempo real.",
    },
    {
      id: 8,
      title: "Diseñar logo",
      description: "Crear logo para la aplicación",
      status: "review",
      assignee: "Ana Martínez",
      priority: "Media",
      notes: "Preparar versiones en diferentes formatos y tamaños.",
    },
  ])

  // Estado para los objetivos
  const [objectives, setObjectives] = useState([
    {
      id: 1,
      title: "Aumentar ventas en un 20%",
      description: "Incrementar las ventas totales en un 20% para el final del trimestre",
      progress: 65,
      dueDate: "2023-12-31",
    },
    {
      id: 2,
      title: "Lanzar nueva plataforma web",
      description: "Completar el desarrollo y lanzamiento de la nueva plataforma web corporativa",
      progress: 40,
      dueDate: "2023-11-15",
    },
    {
      id: 3,
      title: "Reducir tiempo de respuesta al cliente",
      description: "Reducir el tiempo medio de respuesta al cliente de 24 a 12 horas",
      progress: 80,
      dueDate: "2023-10-30",
    },
  ])

  // Estado para los sprints
  const [sprints, setSprints] = useState([
    {
      id: 1,
      name: "Sprint 1",
      startDate: "2023-10-01",
      endDate: "2023-10-14",
      status: "Completado",
      progress: 100,
      tasks: 12,
      completedTasks: 12,
    },
    {
      id: 2,
      name: "Sprint 2",
      startDate: "2023-10-15",
      endDate: "2023-10-28",
      status: "En progreso",
      progress: 60,
      tasks: 15,
      completedTasks: 9,
    },
    {
      id: 3,
      name: "Sprint 3",
      startDate: "2023-10-29",
      endDate: "2023-11-11",
      status: "Planificado",
      progress: 0,
      tasks: 14,
      completedTasks: 0,
    },
  ])

  const [newSector, setNewSector] = useState({ name: "", description: "" })
  const [newMember, setNewMember] = useState({ email: "", role: "", sector: "" })
  const [newColumn, setNewColumn] = useState({ title: "" })
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "backlog",
    assignee: "",
    priority: "Media",
    notes: "",
  })
  const [newObjective, setNewObjective] = useState({
    title: "",
    description: "",
    progress: 0,
    dueDate: "",
  })
  const [newSprint, setNewSprint] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "Planificado",
  })

  const [editingTask, setEditingTask] = useState(null)
  const [activeId, setActiveId] = useState(null)
  const [activeTask, setActiveTask] = useState(null)
  const [editingCell, setEditingCell] = useState({ rowId: null, field: null })
  const [currentPage, setCurrentPage] = useState(1)
  const tasksPerPage = 5

  const [openSectorDialog, setOpenSectorDialog] = useState(false)
  const [openMemberDialog, setOpenMemberDialog] = useState(false)
  const [openColumnDialog, setOpenColumnDialog] = useState(false)
  const [openTaskDialog, setOpenTaskDialog] = useState(false)
  const [openEditTaskDialog, setOpenEditTaskDialog] = useState(false)
  const [openObjectiveDialog, setOpenObjectiveDialog] = useState(false)
  const [openSprintDialog, setOpenSprintDialog] = useState(false)

  const { toast } = useToast()
  const cellRef = useRef(null)

  // Configuración para drag and drop
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result

    // Si no hay destino o el destino es el mismo que el origen, no hacer nada
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // Obtener el ID de la tarea del draggableId (formato: "task-{id}")
    const taskId = Number.parseInt(draggableId.split("-")[1])

    // Si estamos moviendo una tarea a otra columna
    if (destination.droppableId !== source.droppableId) {
      // Actualizar el estado de la tarea
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: destination.droppableId } : task)))
    }
    // Si estamos reordenando dentro de la misma columna
    else {
      // Obtener las tareas de la columna
      const columnTasks = tasks.filter((task) => task.status === source.droppableId)

      // Reordenar las tareas
      const [movedTask] = columnTasks.splice(source.index, 1)
      columnTasks.splice(destination.index, 0, movedTask)

      // Actualizar el estado de las tareas
      const updatedTasks = tasks.filter((task) => task.status !== source.droppableId)
      setTasks([...updatedTasks, ...columnTasks])
    }
  }

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "Media":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "Baja":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  function TaskCard({ task, index, columnId }) {
    return (
      <Draggable draggableId={`task-${task.id}`} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              opacity: snapshot.isDragging ? 0.8 : 1,
            }}
            className={`mb-3 ${snapshot.isDragging ? "shadow-lg" : ""}`}
          >
            <Card className={`cursor-move hover:shadow-md ${snapshot.isDragging ? "border-primary" : ""}`}>
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
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingTask(task)
                          setOpenEditTaskDialog(true)
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 dark:text-red-400"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="line-clamp-2 text-xs">{task.description}</CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>{task.assignee ? task.assignee.charAt(0) : "?"}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{task.assignee || "Sin asignar"}</span>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                {task.notes && (
                  <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">
                    <div className="flex items-center gap-1 mb-1">
                      <FileText className="h-3 w-3" />
                      <span className="font-medium">Notas:</span>
                    </div>
                    {task.notes}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </Draggable>
    )
  }

  function ColumnContainer({ column, tasks }) {
    const columnTasks = tasks.filter((task) => task.status === column.id)

    return (
      <div className="w-[400px]">
        <div className="rounded-lg bg-muted p-3 mb-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{column.title}</h3>
            <Badge variant="outline">{columnTasks.length}</Badge>
          </div>
        </div>
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`space-y-3 min-h-[200px] p-2 rounded-md border-2 border-dashed transition-colors ${
                snapshot.isDraggingOver
                  ? "border-primary/50 bg-primary/5"
                  : "border-transparent hover:border-primary/20"
              }`}
            >
              {columnTasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} columnId={column.id} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    )
  }

  const handleCreateSector = () => {
    if (!newSector.name) {
      toast({
        title: "Error",
        description: "El nombre del sector es obligatorio",
        variant: "destructive",
      })
      return
    }

    const sector = {
      id: sectors.length + 1,
      name: newSector.name,
      description: newSector.description,
      projects: 0,
      members: 0,
    }

    setSectors([...sectors, sector])
    setNewSector({ name: "", description: "" })
    setOpenSectorDialog(false)

    toast({
      title: "Sector creado",
      description: `El sector ${sector.name} ha sido creado correctamente`,
    })
  }

  const handleCreateMember = () => {
    if (!newMember.email || !newMember.sector) {
      toast({
        title: "Error",
        description: "El email y el sector son obligatorios",
        variant: "destructive",
      })
      return
    }

    // Verificar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newMember.email)) {
      toast({
        title: "Error",
        description: "El formato del email no es válido",
        variant: "destructive",
      })
      return
    }

    // Verificar si el email ya existe
    if (members.some((member) => member.email === newMember.email)) {
      toast({
        title: "Error",
        description: "Este email ya está registrado en la organización",
        variant: "destructive",
      })
      return
    }

    // Generar un nombre a partir del email
    const name = newMember.email
      .split("@")[0]
      .split(".")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")

    const member = {
      id: members.length + 1,
      name,
      role: newMember.role,
      sector: newMember.sector,
      email: newMember.email,
      avatar: name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    }

    setMembers([...members, member])
    setNewMember({ email: "", role: "", sector: "" })
    setOpenMemberDialog(false)

    toast({
      title: "Miembro añadido",
      description: `Se ha enviado una invitación a ${member.email}`,
    })
  }

  const handleCreateColumn = () => {
    if (!newColumn.title) {
      toast({
        title: "Error",
        description: "El título de la columna es obligatorio",
        variant: "destructive",
      })
      return
    }

    const columnId = newColumn.title.toLowerCase().replace(/\s+/g, "-")

    if (columns.some((col) => col.id === columnId)) {
      toast({
        title: "Error",
        description: "Ya existe una columna con un nombre similar",
        variant: "destructive",
      })
      return
    }

    const column = {
      id: columnId,
      title: newColumn.title,
    }

    setColumns([...columns, column])
    setNewColumn({ title: "" })
    setOpenColumnDialog(false)

    toast({
      title: "Columna creada",
      description: `La columna ${column.title} ha sido creada correctamente`,
    })
  }

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
      notes: newTask.notes,
    }

    setTasks([...tasks, task])
    setNewTask({
      title: "",
      description: "",
      status: "backlog",
      assignee: "",
      priority: "Media",
      notes: "",
    })
    setOpenTaskDialog(false)

    toast({
      title: "Tarea creada",
      description: `La tarea "${task.title}" ha sido creada correctamente`,
    })
  }

  const handleCreateObjective = () => {
    if (!newObjective.title || !newObjective.description || !newObjective.dueDate) {
      toast({
        title: "Error",
        description: "El título, descripción y fecha límite son obligatorios",
        variant: "destructive",
      })
      return
    }

    const objective = {
      id: objectives.length + 1,
      title: newObjective.title,
      description: newObjective.description,
      progress: newObjective.progress,
      dueDate: newObjective.dueDate,
    }

    setObjectives([...objectives, objective])
    setNewObjective({
      title: "",
      description: "",
      progress: 0,
      dueDate: "",
    })
    setOpenObjectiveDialog(false)

    toast({
      title: "Objetivo creado",
      description: `El objetivo "${objective.title}" ha sido creado correctamente`,
    })
  }

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
      tasks: 0,
      completedTasks: 0,
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

  const handleEditTask = () => {
    if (!editingTask.title) {
      toast({
        title: "Error",
        description: "El título de la tarea es obligatorio",
        variant: "destructive",
      })
      return
    }

    setTasks(tasks.map((task) => (task.id === editingTask.id ? editingTask : task)))

    setOpenEditTaskDialog(false)
    setEditingTask(null)

    toast({
      title: "Tarea actualizada",
      description: `La tarea "${editingTask.title}" ha sido actualizada correctamente`,
    })
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))

    toast({
      title: "Tarea eliminada",
      description: "La tarea ha sido eliminada correctamente",
    })
  }

  const handleCellDoubleClick = (taskId, field) => {
    setEditingCell({ rowId: taskId, field })
  }

  const handleCellChange = (e, taskId, field) => {
    const value = e.target.value
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, [field]: value } : task)))
  }

  const handleCellBlur = () => {
    setEditingCell({ rowId: null, field: null })
  }

  useEffect(() => {
    if (editingCell.rowId && cellRef.current) {
      cellRef.current.focus()
    }
  }, [editingCell])

  // Paginación para la vista de tabla
  const indexOfLastTask = currentPage * tasksPerPage
  const indexOfFirstTask = indexOfLastTask - tasksPerPage
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask)
  const totalPages = Math.ceil(tasks.length / tasksPerPage)

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
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{organizationName}</h1>
          <div className="flex gap-2">
            {activeTab === "objectives" && (
              <Dialog open={openObjectiveDialog} onOpenChange={setOpenObjectiveDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo objetivo
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Crear nuevo objetivo</DialogTitle>
                    <DialogDescription>Añade un nuevo objetivo para la organización</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="objectiveTitle">Título</Label>
                      <Input
                        id="objectiveTitle"
                        value={newObjective.title}
                        onChange={(e) => setNewObjective({ ...newObjective, title: e.target.value })}
                        placeholder="Título del objetivo"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="objectiveDescription">Descripción</Label>
                      <Textarea
                        id="objectiveDescription"
                        value={newObjective.description}
                        onChange={(e) => setNewObjective({ ...newObjective, description: e.target.value })}
                        placeholder="Descripción detallada"
                        rows={3}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="objectiveProgress">Progreso (%)</Label>
                      <Input
                        id="objectiveProgress"
                        type="number"
                        min="0"
                        max="100"
                        value={newObjective.progress}
                        onChange={(e) =>
                          setNewObjective({ ...newObjective, progress: Number.parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="objectiveDueDate">Fecha límite</Label>
                      <Input
                        id="objectiveDueDate"
                        type="date"
                        value={newObjective.dueDate}
                        onChange={(e) => setNewObjective({ ...newObjective, dueDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpenObjectiveDialog(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateObjective}>Crear objetivo</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            {activeTab === "sprints" && (
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
            )}

            {activeTab === "scrum" && (
              <>
                <div className="flex items-center gap-2 mr-4">
                  <Button
                    variant={scrumView === "board" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setScrumView("board")}
                  >
                    Tablero
                  </Button>
                  <Button
                    variant={scrumView === "table" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setScrumView("table")}
                  >
                    Tabla
                  </Button>
                </div>

                <Dialog open={openColumnDialog} onOpenChange={setOpenColumnDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Nueva columna
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Crear nueva columna</DialogTitle>
                      <DialogDescription>Añade una nueva columna al tablero SCRUM</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="columnTitle">Título</Label>
                        <Input
                          id="columnTitle"
                          value={newColumn.title}
                          onChange={(e) => setNewColumn({ ...newColumn, title: e.target.value })}
                          placeholder="Título de la columna"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setOpenColumnDialog(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleCreateColumn}>Crear columna</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={openTaskDialog} onOpenChange={setOpenTaskDialog}>
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
                        <Label htmlFor="taskTitle">Título</Label>
                        <Input
                          id="taskTitle"
                          value={newTask.title}
                          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                          placeholder="Título de la tarea"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="taskDescription">Descripción</Label>
                        <Textarea
                          id="taskDescription"
                          value={newTask.description}
                          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                          placeholder="Descripción detallada"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
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
                              {columns.map((column) => (
                                <SelectItem key={column.id} value={column.id}>
                                  {column.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="taskPriority">Prioridad</Label>
                          <Select
                            value={newTask.priority}
                            onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                          >
                            <SelectTrigger id="taskPriority">
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
                        <Label htmlFor="taskAssignee">Asignar a</Label>
                        <Select
                          value={newTask.assignee}
                          onValueChange={(value) => setNewTask({ ...newTask, assignee: value })}
                        >
                          <SelectTrigger id="taskAssignee">
                            <SelectValue placeholder="Selecciona un miembro" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sin asignar">Sin asignar</SelectItem>
                            {members.map((member) => (
                              <SelectItem key={member.id} value={member.name}>
                                {member.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="taskNotes">Notas</Label>
                        <Textarea
                          id="taskNotes"
                          value={newTask.notes}
                          onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                          placeholder="Información adicional importante"
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setOpenTaskDialog(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleCreateTask}>Crear tarea</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="scrum">Tablero SCRUM</TabsTrigger>
          <TabsTrigger value="objectives">Objetivos</TabsTrigger>
          <TabsTrigger value="sprints">Sprints</TabsTrigger>
        </TabsList>

        <TabsContent value="objectives" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {objectives.map((objective) => (
              <Card key={objective.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{objective.title}</CardTitle>
                    <Badge variant="outline">
                      <Calendar className="mr-1 h-4 w-4" />
                      {objective.dueDate}
                    </Badge>
                  </div>
                  <CardDescription>{objective.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progreso</span>
                      <span>{objective.progress}%</span>
                    </div>
                    <Progress value={objective.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sprints" className="space-y-4">
          <div className="grid gap-4">
            {sprints.map((sprint) => (
              <Card key={sprint.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{sprint.name}</CardTitle>
                    <Badge
                      variant="outline"
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
                  </div>
                  <CardDescription>
                    {sprint.startDate} - {sprint.endDate}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progreso</span>
                        <span>{sprint.progress}%</span>
                      </div>
                      <Progress value={sprint.progress} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>
                        Tareas completadas: {sprint.completedTasks}/{sprint.tasks}
                      </span>
                      <Button variant="outline" size="sm">
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scrum">
          <Card>
            <CardHeader>
              <CardTitle>Tablero SCRUM</CardTitle>
              <CardDescription>
                {scrumView === "board"
                  ? "Arrastra y suelta las tarjetas para cambiar su estado"
                  : "Haz doble clic en una celda para editarla"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {scrumView === "board" ? (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <div className="flex gap-4" style={{ minWidth: "max-content" }}>
                    {columns.map((column) => (
                      <ColumnContainer key={column.id} column={column} tasks={tasks} />
                    ))}
                  </div>
                </DragDropContext>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Título</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Prioridad</TableHead>
                          <TableHead>Asignado a</TableHead>
                          <TableHead>Notas</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentTasks.map((task) => (
                          <TableRow key={task.id}>
                            <TableCell
                              onDoubleClick={() => handleCellDoubleClick(task.id, "title")}
                              className="font-medium"
                            >
                              {editingCell.rowId === task.id && editingCell.field === "title" ? (
                                <Input
                                  ref={cellRef}
                                  value={tasks.find((t) => t.id === task.id).title}
                                  onChange={(e) => handleCellChange(e, task.id, "title")}
                                  onBlur={handleCellBlur}
                                  className="h-8 p-1"
                                />
                              ) : (
                                task.title
                              )}
                            </TableCell>
                            <TableCell
                              onDoubleClick={() => handleCellDoubleClick(task.id, "description")}
                              className="max-w-[200px] truncate"
                            >
                              {editingCell.rowId === task.id && editingCell.field === "description" ? (
                                <Input
                                  ref={cellRef}
                                  value={tasks.find((t) => t.id === task.id).description}
                                  onChange={(e) => handleCellChange(e, task.id, "description")}
                                  onBlur={handleCellBlur}
                                  className="h-8 p-1"
                                />
                              ) : (
                                task.description
                              )}
                            </TableCell>
                            <TableCell onDoubleClick={() => handleCellDoubleClick(task.id, "status")}>
                              {editingCell.rowId === task.id && editingCell.field === "status" ? (
                                <Select
                                  value={tasks.find((t) => t.id === task.id).status}
                                  onValueChange={(value) => {
                                    handleCellChange({ target: { value } }, task.id, "status")
                                    handleCellBlur()
                                  }}
                                >
                                  <SelectTrigger className="h-8 p-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {columns.map((column) => (
                                      <SelectItem key={column.id} value={column.id}>
                                        {column.title}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                columns.find((col) => col.id === task.status)?.title || task.status
                              )}
                            </TableCell>
                            <TableCell onDoubleClick={() => handleCellDoubleClick(task.id, "priority")}>
                              {editingCell.rowId === task.id && editingCell.field === "priority" ? (
                                <Select
                                  value={tasks.find((t) => t.id === task.id).priority}
                                  onValueChange={(value) => {
                                    handleCellChange({ target: { value } }, task.id, "priority")
                                    handleCellBlur()
                                  }}
                                >
                                  <SelectTrigger className="h-8 p-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Alta">Alta</SelectItem>
                                    <SelectItem value="Media">Media</SelectItem>
                                    <SelectItem value="Baja">Baja</SelectItem>
                                  </SelectContent>
                                </Select>
                              ) : (
                                <span className={`rounded-full px-2 py-1 text-xs ${getPriorityClass(task.priority)}`}>
                                  {task.priority}
                                </span>
                              )}
                            </TableCell>
                            <TableCell onDoubleClick={() => handleCellDoubleClick(task.id, "assignee")}>
                              {editingCell.rowId === task.id && editingCell.field === "assignee" ? (
                                <Select
                                  value={tasks.find((t) => t.id === task.id).assignee}
                                  onValueChange={(value) => {
                                    handleCellChange({ target: { value } }, task.id, "assignee")
                                    handleCellBlur()
                                  }}
                                >
                                  <SelectTrigger className="h-8 p-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Sin asignar">Sin asignar</SelectItem>
                                    {members.map((member) => (
                                      <SelectItem key={member.id} value={member.name}>
                                        {member.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <div className="flex items-center gap-2">
                                  {task.assignee ? (
                                    <>
                                      <Avatar className="h-6 w-6">
                                        <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <span>{task.assignee}</span>
                                    </>
                                  ) : (
                                    "Sin asignar"
                                  )}
                                </div>
                              )}
                            </TableCell>
                            <TableCell
                              onDoubleClick={() => handleCellDoubleClick(task.id, "notes")}
                              className="max-w-[200px] truncate"
                            >
                              {editingCell.rowId === task.id && editingCell.field === "notes" ? (
                                <Textarea
                                  ref={cellRef}
                                  value={tasks.find((t) => t.id === task.id).notes}
                                  onChange={(e) => handleCellChange(e, task.id, "notes")}
                                  onBlur={handleCellBlur}
                                  className="h-20 p-1"
                                />
                              ) : (
                                <div className="max-h-20 overflow-y-auto">{task.notes || "Sin notas"}</div>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Acciones</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setEditingTask(task)
                                      setOpenEditTaskDialog(true)
                                    }}
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600 dark:text-red-400"
                                    onClick={() => handleDeleteTask(task.id)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Eliminar
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo para editar tarea */}
      <Dialog open={openEditTaskDialog} onOpenChange={setOpenEditTaskDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar tarea</DialogTitle>
            <DialogDescription>Modifica los detalles de la tarea</DialogDescription>
          </DialogHeader>
          {editingTask && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="editTaskTitle">Título</Label>
                <Input
                  id="editTaskTitle"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  placeholder="Título de la tarea"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editTaskDescription">Descripción</Label>
                <Textarea
                  id="editTaskDescription"
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  placeholder="Descripción detallada"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="editTaskStatus">Estado</Label>
                  <Select
                    value={editingTask.status}
                    onValueChange={(value) => setEditingTask({ ...editingTask, status: value })}
                  >
                    <SelectTrigger id="editTaskStatus">
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((column) => (
                        <SelectItem key={column.id} value={column.id}>
                          {column.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editTaskPriority">Prioridad</Label>
                  <Select
                    value={editingTask.priority}
                    onValueChange={(value) => setEditingTask({ ...editingTask, priority: value })}
                  >
                    <SelectTrigger id="editTaskPriority">
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
                <Label htmlFor="editTaskAssignee">Asignar a</Label>
                <Select
                  value={editingTask.assignee}
                  onValueChange={(value) => setEditingTask({ ...editingTask, assignee: value })}
                >
                  <SelectTrigger id="editTaskAssignee">
                    <SelectValue placeholder="Selecciona un miembro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sin asignar">Sin asignar</SelectItem>
                    {members.map((member) => (
                      <SelectItem key={member.id} value={member.name}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editTaskNotes">Notas</Label>
                <Textarea
                  id="editTaskNotes"
                  value={editingTask.notes}
                  onChange={(e) => setEditingTask({ ...editingTask, notes: e.target.value })}
                  placeholder="Información adicional importante"
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditTaskDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditTask}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
