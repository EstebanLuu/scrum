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
import { Plus, MoreHorizontal, Calendar, FileText, Clipboard, Link2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

export default function ProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("board")
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
  ])

  // Estado para las columnas del tablero SCRUM
  const [columns, setColumns] = useState([
    { id: "backlog", title: "Backlog" },
    { id: "todo", title: "Por hacer" },
    { id: "in-progress", title: "En progreso" },
    { id: "review", title: "En revisión" },
    { id: "done", title: "Completado" },
  ])

  const [projectNotes, setProjectNotes] = useState([
    {
      id: 1,
      title: "Kickoff meeting",
      content: "Reunión inicial con el cliente para definir alcance y objetivos del proyecto.",
      date: "2023-10-05",
    },
    {
      id: 2,
      title: "Definición de arquitectura",
      content: "Se decidió utilizar Next.js para el frontend y Node.js con Express para el backend.",
      date: "2023-10-10",
    },
    {
      id: 3,
      title: "Revisión de diseño",
      content: "El cliente aprobó los mockups iniciales con algunos cambios menores en la paleta de colores.",
      date: "2023-10-15",
    },
  ])

  const [projectMembers, setProjectMembers] = useState([
    { id: 1, name: "María Pérez", role: "Diseñadora UI/UX", email: "maria@example.com" },
    { id: 2, name: "Juan Gómez", role: "Desarrollador Frontend", email: "juan@example.com" },
    { id: 3, name: "Carlos Rodríguez", role: "Desarrollador Backend", email: "carlos@example.com" },
    { id: 4, name: "Laura González", role: "QA Tester", email: "laura@example.com" },
    { id: 5, name: "Ana Martínez", role: "Documentación", email: "ana@example.com" },
  ])

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "todo",
    assignee: "",
    priority: "Media",
    notes: "",
  })

  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
  })

  const [newMember, setNewMember] = useState({
    email: "",
    role: "",
  })

  const [editingTask, setEditingTask] = useState(null)
  const [activeId, setActiveId] = useState(null)
  const [activeTask, setActiveTask] = useState(null)
  const [view, setView] = useState("board")

  const [open, setOpen] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openColumnDialog, setOpenColumnDialog] = useState(false)
  const [openNoteDialog, setOpenNoteDialog] = useState(false)
  const [openMemberDialog, setOpenMemberDialog] = useState(false)
  const [newColumn, setNewColumn] = useState({ title: "" })

  const { toast } = useToast()

  // Configuración para drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragStart = (event) => {
    const { active } = event
    setActiveId(active.id)

    // Si estamos arrastrando una tarea, establecer la tarea activa para la vista previa
    if (active.data.current?.type === "task") {
      const task = tasks.find((t) => t.id === active.id)
      setActiveTask(task)
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      // Si estamos arrastrando una columna
      if (active.data.current?.type === "column") {
        setColumns((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id)
          const newIndex = items.findIndex((item) => item.id === over.id)
          return arrayMove(items, oldIndex, newIndex)
        })
      }
      // Si estamos arrastrando una tarea
      else if (active.data.current?.type === "task" && over) {
        setTasks((items) => {
          const updatedTasks = [...items]
          const taskIndex = updatedTasks.findIndex((task) => task.id === active.id)

          // Actualizar el estado de la tarea al de la columna donde se soltó
          if (over.data.current?.type === "column") {
            updatedTasks[taskIndex] = {
              ...updatedTasks[taskIndex],
              status: over.id,
            }
          }

          return updatedTasks
        })
      }
    }

    setActiveId(null)
    setActiveTask(null)
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
      status: "todo",
      assignee: "",
      priority: "Media",
      notes: "",
    })
    setOpen(false)

    toast({
      title: "Tarea creada",
      description: `La tarea "${task.title}" ha sido creada correctamente`,
    })
  }

  const handleCreateNote = () => {
    if (!newNote.title || !newNote.content) {
      toast({
        title: "Error",
        description: "El título y contenido de la nota son obligatorios",
        variant: "destructive",
      })
      return
    }

    const note = {
      id: projectNotes.length + 1,
      title: newNote.title,
      content: newNote.content,
      date: new Date().toISOString().split("T")[0],
    }

    setProjectNotes([...projectNotes, note])
    setNewNote({
      title: "",
      content: "",
    })
    setOpenNoteDialog(false)

    toast({
      title: "Nota creada",
      description: `La nota "${note.title}" ha sido creada correctamente`,
    })
  }

  const handleAddMember = () => {
    if (!newMember.email || !newMember.role) {
      toast({
        title: "Error",
        description: "El email y rol son obligatorios",
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
    if (projectMembers.some((member) => member.email === newMember.email)) {
      toast({
        title: "Error",
        description: "Este email ya está registrado en el proyecto",
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
      id: projectMembers.length + 1,
      name,
      role: newMember.role,
      email: newMember.email,
    }

    setProjectMembers([...projectMembers, member])
    setNewMember({
      email: "",
      role: "",
    })
    setOpenMemberDialog(false)

    toast({
      title: "Miembro añadido",
      description: `Se ha enviado una invitación a ${member.email}`,
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

    setOpenEditDialog(false)
    setEditingTask(null)

    toast({
      title: "Tarea actualizada",
      description: `La tarea "${editingTask.title}" ha sido actualizada correctamente`,
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

  const getStatusColumn = (status) => {
    return tasks.filter((task) => task.status === status)
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

  // Componente para las tarjetas arrastrables
  function SortableTaskCard({ task }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: task.id,
      data: {
        type: "task",
      },
    })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    }

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <Card className="cursor-move hover:shadow-md mb-3">
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
                      setOpenEditDialog(true)
                    }}
                  >
                    Editar
                  </DropdownMenuItem>
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
    )
  }

  // Componente para las columnas arrastrables
  function SortableColumn({ column }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: column.id,
      data: {
        type: "column",
      },
    })

    const { setNodeRef: setDroppableRef } = useDroppable({
      id: column.id,
      data: {
        type: "column",
      },
    })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    }

    const columnTasks = tasks.filter((task) => task.status === column.id)

    return (
      <div ref={setNodeRef} style={style} className="w-[400px]">
        <div className="rounded-lg bg-muted p-3 mb-3 cursor-move" {...attributes} {...listeners}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{column.title}</h3>
            <Badge variant="outline">{columnTasks.length}</Badge>
          </div>
        </div>
        <div
          ref={setDroppableRef}
          className="space-y-3 min-h-[200px] p-2 rounded-md border-2 border-dashed border-transparent transition-colors hover:border-primary/20"
        >
          {columnTasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    )
  }

  // Componente para la vista previa de arrastre
  function TaskDragOverlay({ task }) {
    if (!task) return null

    return (
      <Card className="cursor-move hover:shadow-md mb-3 w-[280px] opacity-80">
        <CardHeader className="p-4">
          <div className="flex items-start justify-between">
            <CardTitle className="text-base">{task.title}</CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
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
            <span className={`rounded-full px-2 py-1 text-xs ${getPriorityClass(task.priority)}`}>{task.priority}</span>
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
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/projects">Proyectos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/projects/${params.id}`}>Portal de clientes</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Portal de clientes</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.push(`/spaces/1`)}>
              <Link2 className="mr-2 h-4 w-4" />
              Ver organización
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="board">Tablero SCRUM</TabsTrigger>
          <TabsTrigger value="notes">Notas</TabsTrigger>
          <TabsTrigger value="members">Miembros</TabsTrigger>
          <TabsTrigger value="details">Detalles</TabsTrigger>
        </TabsList>

        <TabsContent value="board" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant={view === "board" ? "default" : "outline"} size="sm" onClick={() => setView("board")}>
                Tablero
              </Button>
              <Button variant={view === "list" ? "default" : "outline"} size="sm" onClick={() => setView("list")}>
                Lista
              </Button>
            </div>
            <div className="flex gap-2">
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
                          defaultValue="todo"
                        >
                          <SelectTrigger>
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
                        <Label htmlFor="priority">Prioridad</Label>
                        <Select
                          onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                          defaultValue="Media"
                        >
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
                          {projectMembers.map((member) => (
                            <SelectItem key={member.id} value={member.name}>
                              {member.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="notes">Notas</Label>
                      <Textarea
                        id="notes"
                        value={newTask.notes}
                        onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                        placeholder="Información adicional importante"
                        rows={3}
                      />
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

          {view === "board" ? (
            <Card>
              <CardHeader>
                <CardTitle>Tablero SCRUM</CardTitle>
                <CardDescription>Arrastra y suelta las tarjetas para cambiar su estado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto pb-4">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="flex gap-4" style={{ minWidth: "max-content" }}>
                      <SortableContext items={columns.map((col) => col.id)} strategy={horizontalListSortingStrategy}>
                        {columns.map((column) => (
                          <SortableColumn key={column.id} column={column} />
                        ))}
                      </SortableContext>
                    </div>
                    <DragOverlay>{activeTask && <TaskDragOverlay task={activeTask} />}</DragOverlay>
                  </DndContext>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Lista de tareas</CardTitle>
                <CardDescription>Vista detallada de todas las tareas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 border-b px-4 py-3 font-medium">
                    <div className="col-span-2">Tarea</div>
                    <div>Estado</div>
                    <div>Prioridad</div>
                    <div>Asignado a</div>
                  </div>
                  {tasks.map((task) => (
                    <div key={task.id} className="grid grid-cols-5 items-center px-4 py-3 border-b">
                      <div className="col-span-2">
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-muted-foreground">{task.description}</div>
                      </div>
                      <div>{columns.find((col) => col.id === task.status)?.title || task.status}</div>
                      <div>
                        <span className={`rounded-full px-2 py-1 text-xs ${getPriorityClass(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{task.assignee}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Notas del proyecto</h2>
            <Dialog open={openNoteDialog} onOpenChange={setOpenNoteDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva nota
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Crear nueva nota</DialogTitle>
                  <DialogDescription>Añade una nueva nota al proyecto</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="noteTitle">Título</Label>
                    <Input
                      id="noteTitle"
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                      placeholder="Título de la nota"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="noteContent">Contenido</Label>
                    <Textarea
                      id="noteContent"
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                      placeholder="Contenido de la nota"
                      rows={5}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenNoteDialog(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateNote}>Crear nota</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {projectNotes.map((note) => (
              <Card key={note.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{note.title}</CardTitle>
                    <Badge variant="outline">{note.date}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line">{note.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Miembros del proyecto</h2>
            <Dialog open={openMemberDialog} onOpenChange={setOpenMemberDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Añadir miembro
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Añadir nuevo miembro</DialogTitle>
                  <DialogDescription>Invita a un nuevo miembro al proyecto</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="memberEmail">Email</Label>
                    <Input
                      id="memberEmail"
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="memberRole">Rol</Label>
                    <Select onValueChange={(value) => setNewMember({ ...newMember, role: value })}>
                      <SelectTrigger id="memberRole">
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Desarrollador Frontend">Desarrollador Frontend</SelectItem>
                        <SelectItem value="Desarrollador Backend">Desarrollador Backend</SelectItem>
                        <SelectItem value="Diseñador UI/UX">Diseñador UI/UX</SelectItem>
                        <SelectItem value="QA Tester">QA Tester</SelectItem>
                        <SelectItem value="Project Manager">Project Manager</SelectItem>
                        <SelectItem value="DevOps">DevOps</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenMemberDialog(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddMember}>Enviar invitación</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-4 border-b px-4 py-3 font-medium">
                  <div className="col-span-2">Nombre</div>
                  <div>Rol</div>
                  <div>Email</div>
                </div>
                {projectMembers.map((member) => (
                  <div key={member.id} className="grid grid-cols-4 items-center px-4 py-3 border-b">
                    <div className="col-span-2 flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{member.name}</span>
                    </div>
                    <div>{member.role}</div>
                    <div>{member.email}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Detalles del proyecto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Empresa</h4>
                  <p className="text-sm text-muted-foreground">Acme Inc</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Fechas</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>15/10/2023 - 30/12/2023</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Estado</h4>
                  <Badge className="mt-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    En progreso
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Descripción</h4>
                  <p className="text-sm text-muted-foreground">
                    Portal web para clientes de Acme Inc. Incluye autenticación, gestión de perfil, visualización de
                    facturas y soporte en línea.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumen de tareas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {columns.map((column) => (
                    <div key={column.id} className="flex items-center justify-between">
                      <span className="text-sm">{column.title}</span>
                      <span className="text-sm font-medium">{getStatusColumn(column.id).length}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm font-medium">Total</span>
                    <span className="text-sm font-medium">{tasks.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Objetivos del proyecto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Clipboard className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Crear un portal de clientes intuitivo y funcional</h3>
                      <p className="text-sm text-muted-foreground">
                        Desarrollar una interfaz de usuario amigable que permita a los clientes acceder a sus datos y
                        servicios de forma sencilla.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clipboard className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Implementar sistema de autenticación seguro</h3>
                      <p className="text-sm text-muted-foreground">
                        Crear un sistema de login y registro con múltiples factores de autenticación y recuperación de
                        contraseña.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clipboard className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Desarrollar API RESTful para la gestión de datos</h3>
                      <p className="text-sm text-muted-foreground">
                        Crear endpoints para la gestión de usuarios, facturas, tickets de soporte y otros recursos
                        necesarios.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Diálogo para editar tarea */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar tarea</DialogTitle>
            <DialogDescription>Modifica los detalles de la tarea</DialogDescription>
          </DialogHeader>
          {editingTask && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="editTitle">Título</Label>
                <Input
                  id="editTitle"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  placeholder="Título de la tarea"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editDescription">Descripción</Label>
                <Textarea
                  id="editDescription"
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  placeholder="Descripción detallada"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="editStatus">Estado</Label>
                  <Select
                    value={editingTask.status}
                    onValueChange={(value) => setEditingTask({ ...editingTask, status: value })}
                  >
                    <SelectTrigger id="editStatus">
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
                  <Label htmlFor="editPriority">Prioridad</Label>
                  <Select
                    value={editingTask.priority}
                    onValueChange={(value) => setEditingTask({ ...editingTask, priority: value })}
                  >
                    <SelectTrigger id="editPriority">
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
                <Label htmlFor="editAssignee">Asignar a</Label>
                <Select
                  value={editingTask.assignee}
                  onValueChange={(value) => setEditingTask({ ...editingTask, assignee: value })}
                >
                  <SelectTrigger id="editAssignee">
                    <SelectValue placeholder="Selecciona un miembro" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectMembers.map((member) => (
                      <SelectItem key={member.id} value={member.name}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editNotes">Notas</Label>
                <Textarea
                  id="editNotes"
                  value={editingTask.notes}
                  onChange={(e) => setEditingTask({ ...editingTask, notes: e.target.value })}
                  placeholder="Información adicional importante"
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditTask}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
