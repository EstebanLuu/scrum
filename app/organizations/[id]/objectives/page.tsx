"use client"

import { useState, useEffect } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react"
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

export default function ObjectivesPage({ params }: { params: { id: string } }) {
  const [objectives, setObjectives] = useState([
    {
      id: 1,
      title: "Aumentar ventas en un 20%",
      description: "Incrementar las ventas totales en un 20% para el final del trimestre",
      progress: 65,
      dueDate: "2023-12-31",
      tasks: [
        { id: 1, title: "Implementar nueva estrategia de marketing", completed: true },
        { id: 2, title: "Capacitar al equipo de ventas", completed: true },
        { id: 3, title: "Lanzar promociones especiales", completed: false },
        { id: 4, title: "Analizar resultados preliminares", completed: true },
        { id: 5, title: "Ajustar estrategia según resultados", completed: false },
      ],
    },
    {
      id: 2,
      title: "Lanzar nueva plataforma web",
      description: "Completar el desarrollo y lanzamiento de la nueva plataforma web corporativa",
      progress: 40,
      dueDate: "2023-11-15",
      tasks: [
        { id: 1, title: "Finalizar diseño UI/UX", completed: true },
        { id: 2, title: "Desarrollar frontend", completed: true },
        { id: 3, title: "Implementar backend", completed: false },
        { id: 4, title: "Realizar pruebas de integración", completed: false },
        { id: 5, title: "Migrar contenido actual", completed: false },
        { id: 6, title: "Lanzamiento y monitoreo", completed: false },
      ],
    },
    {
      id: 3,
      title: "Reducir tiempo de respuesta al cliente",
      description: "Reducir el tiempo medio de respuesta al cliente de 24 a 12 horas",
      progress: 80,
      dueDate: "2023-10-30",
      tasks: [
        { id: 1, title: "Analizar flujo de trabajo actual", completed: true },
        { id: 2, title: "Implementar sistema de tickets", completed: true },
        { id: 3, title: "Capacitar al equipo de soporte", completed: true },
        { id: 4, title: "Establecer SLAs internos", completed: true },
        { id: 5, title: "Monitorear métricas de respuesta", completed: false },
      ],
    },
  ])

  const [activeObjective, setActiveObjective] = useState(null)
  const [newObjective, setNewObjective] = useState({
    title: "",
    description: "",
    dueDate: "",
    tasks: [],
  })
  const [newTask, setNewTask] = useState("")
  const [editingObjective, setEditingObjective] = useState(null)
  const [editingTask, setEditingTask] = useState({ objectiveId: null, taskId: null, title: "" })
  const [timeFilter, setTimeFilter] = useState("all")
  const [openObjectiveDialog, setOpenObjectiveDialog] = useState(false)
  const [openTaskDialog, setOpenTaskDialog] = useState(false)
  const [openEditTaskDialog, setOpenEditTaskDialog] = useState(false)

  const { toast } = useToast()

  // Actualizar el progreso basado en las tareas completadas
  useEffect(() => {
    if (objectives.length > 0) {
      const updatedObjectives = objectives.map((objective) => {
        if (objective.tasks && objective.tasks.length > 0) {
          const completedTasks = objective.tasks.filter((task) => task.completed).length
          const progress = Math.round((completedTasks / objective.tasks.length) * 100)
          return { ...objective, progress }
        }
        return objective
      })
      setObjectives(updatedObjectives)
    }
  }, [])

  // Filtrar objetivos por tiempo
  const filteredObjectives = objectives.filter((objective) => {
    if (timeFilter === "all") return true

    const dueDate = new Date(objective.dueDate)
    const today = new Date()
    const oneWeekLater = new Date(today)
    oneWeekLater.setDate(today.getDate() + 7)
    const oneMonthLater = new Date(today)
    oneMonthLater.setMonth(today.getMonth() + 1)

    if (timeFilter === "day") {
      return dueDate <= new Date(today.setHours(23, 59, 59, 999))
    } else if (timeFilter === "week") {
      return dueDate <= oneWeekLater
    } else if (timeFilter === "month") {
      return dueDate <= oneMonthLater
    }
    return true
  })

  const handleCreateObjective = () => {
    if (!newObjective.title || !newObjective.dueDate) {
      toast({
        title: "Error",
        description: "El título y la fecha límite son obligatorios",
        variant: "destructive",
      })
      return
    }

    const objective = {
      id: objectives.length + 1,
      title: newObjective.title,
      description: newObjective.description,
      progress: 0,
      dueDate: newObjective.dueDate,
      tasks: newObjective.tasks.map((task, index) => ({
        id: index + 1,
        title: task,
        completed: false,
      })),
    }

    setObjectives([...objectives, objective])
    setNewObjective({
      title: "",
      description: "",
      dueDate: "",
      tasks: [],
    })
    setOpenObjectiveDialog(false)

    toast({
      title: "Objetivo creado",
      description: `El objetivo "${objective.title}" ha sido creado correctamente`,
    })
  }

  const handleAddTaskToNewObjective = () => {
    if (!newTask.trim()) return

    setNewObjective({
      ...newObjective,
      tasks: [...newObjective.tasks, newTask],
    })
    setNewTask("")
  }

  const handleRemoveTaskFromNewObjective = (index) => {
    const updatedTasks = [...newObjective.tasks]
    updatedTasks.splice(index, 1)
    setNewObjective({
      ...newObjective,
      tasks: updatedTasks,
    })
  }

  const handleAddTaskToObjective = (objectiveId) => {
    if (!editingTask.title.trim()) {
      toast({
        title: "Error",
        description: "El título de la tarea es obligatorio",
        variant: "destructive",
      })
      return
    }

    const updatedObjectives = objectives.map((objective) => {
      if (objective.id === objectiveId) {
        const newTaskId = objective.tasks.length > 0 ? Math.max(...objective.tasks.map((t) => t.id)) + 1 : 1
        const updatedTasks = [...objective.tasks, { id: newTaskId, title: editingTask.title, completed: false }]

        // Recalcular progreso
        const completedTasks = updatedTasks.filter((task) => task.completed).length
        const progress = Math.round((completedTasks / updatedTasks.length) * 100)

        return {
          ...objective,
          tasks: updatedTasks,
          progress,
        }
      }
      return objective
    })

    setObjectives(updatedObjectives)
    setEditingTask({ objectiveId: null, taskId: null, title: "" })
    setOpenTaskDialog(false)

    toast({
      title: "Tarea añadida",
      description: "La tarea ha sido añadida correctamente",
    })
  }

  const handleEditTask = () => {
    if (!editingTask.title.trim()) {
      toast({
        title: "Error",
        description: "El título de la tarea es obligatorio",
        variant: "destructive",
      })
      return
    }

    const updatedObjectives = objectives.map((objective) => {
      if (objective.id === editingTask.objectiveId) {
        const updatedTasks = objective.tasks.map((task) => {
          if (task.id === editingTask.taskId) {
            return { ...task, title: editingTask.title }
          }
          return task
        })

        return {
          ...objective,
          tasks: updatedTasks,
        }
      }
      return objective
    })

    setObjectives(updatedObjectives)
    setEditingTask({ objectiveId: null, taskId: null, title: "" })
    setOpenEditTaskDialog(false)

    toast({
      title: "Tarea actualizada",
      description: "La tarea ha sido actualizada correctamente",
    })
  }

  const handleDeleteTask = (objectiveId, taskId) => {
    const updatedObjectives = objectives.map((objective) => {
      if (objective.id === objectiveId) {
        const updatedTasks = objective.tasks.filter((task) => task.id !== taskId)

        // Recalcular progreso
        const completedTasks = updatedTasks.filter((task) => task.completed).length
        const progress = updatedTasks.length > 0 ? Math.round((completedTasks / updatedTasks.length) * 100) : 0

        return {
          ...objective,
          tasks: updatedTasks,
          progress,
        }
      }
      return objective
    })

    setObjectives(updatedObjectives)

    toast({
      title: "Tarea eliminada",
      description: "La tarea ha sido eliminada correctamente",
    })
  }

  const handleToggleTaskCompletion = (objectiveId, taskId) => {
    const updatedObjectives = objectives.map((objective) => {
      if (objective.id === objectiveId) {
        const updatedTasks = objective.tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, completed: !task.completed }
          }
          return task
        })

        // Recalcular progreso
        const completedTasks = updatedTasks.filter((task) => task.completed).length
        const progress = Math.round((completedTasks / updatedTasks.length) * 100)

        return {
          ...objective,
          tasks: updatedTasks,
          progress,
        }
      }
      return objective
    })

    setObjectives(updatedObjectives)
  }

  const handleDeleteObjective = (objectiveId) => {
    setObjectives(objectives.filter((objective) => objective.id !== objectiveId))

    toast({
      title: "Objetivo eliminado",
      description: "El objetivo ha sido eliminado correctamente",
    })
  }

  // Simulamos obtener el nombre de la organización basado en el ID
  const organizationName = "Gestini Software"

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
              <BreadcrumbLink href={`/organizations/${params.id}/objectives`}>Objetivos</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Objetivos</h1>
          <Dialog open={openObjectiveDialog} onOpenChange={setOpenObjectiveDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo objetivo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Crear nuevo objetivo</DialogTitle>
                <DialogDescription>Añade un nuevo objetivo con tareas asociadas</DialogDescription>
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
                  <Label htmlFor="objectiveDueDate">Fecha límite</Label>
                  <Input
                    id="objectiveDueDate"
                    type="date"
                    value={newObjective.dueDate}
                    onChange={(e) => setNewObjective({ ...newObjective, dueDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Tareas</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="Añadir nueva tarea"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTaskToNewObjective()
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddTaskToNewObjective}>
                      Añadir
                    </Button>
                  </div>
                  <div className="mt-2 space-y-2">
                    {newObjective.tasks.map((task, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <span>{task}</span>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveTaskFromNewObjective(index)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
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
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Label htmlFor="timeFilter">Filtrar por tiempo:</Label>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger id="timeFilter" className="w-[180px]">
            <SelectValue placeholder="Seleccionar período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="day">Hoy</SelectItem>
            <SelectItem value="week">Esta semana</SelectItem>
            <SelectItem value="month">Este mes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredObjectives.map((objective) => (
          <Card key={objective.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>{objective.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setActiveObjective(objective)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 dark:text-red-400"
                      onClick={() => handleDeleteObjective(objective.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>{objective.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <Badge variant="outline">
                    <Calendar className="mr-1 h-4 w-4" />
                    {objective.dueDate}
                  </Badge>
                  <span>{objective.progress}% completado</span>
                </div>
                <Progress value={objective.progress} className="h-2" />
                <div className="pt-2 text-sm text-muted-foreground">
                  {objective.tasks.filter((t) => t.completed).length} de {objective.tasks.length} tareas completadas
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setActiveObjective(objective)}>
                Ver detalles
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Diálogo para ver detalles del objetivo */}
      <Dialog open={!!activeObjective} onOpenChange={(open) => !open && setActiveObjective(null)}>
        <DialogContent className="max-w-4xl">
          {activeObjective && (
            <>
              <DialogHeader>
                <DialogTitle>{activeObjective.title}</DialogTitle>
                <DialogDescription>
                  Fecha límite: {activeObjective.dueDate} • {activeObjective.progress}% completado
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Tabs defaultValue="details">
                  <TabsList>
                    <TabsTrigger value="details">Detalles</TabsTrigger>
                    <TabsTrigger value="tasks">Tareas</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="space-y-4 pt-4">
                    <div>
                      <h3 className="text-lg font-medium">Descripción</h3>
                      <p className="text-muted-foreground">{activeObjective.description}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Progreso</h3>
                      <div className="mt-2">
                        <Progress value={activeObjective.progress} className="h-2" />
                        <div className="flex justify-between text-sm mt-1">
                          <span>0%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
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
                            <DialogDescription>Añade una nueva tarea a este objetivo</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="taskTitle">Título de la tarea</Label>
                              <Input
                                id="taskTitle"
                                value={editingTask.title}
                                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                                placeholder="Título de la tarea"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenTaskDialog(false)}>
                              Cancelar
                            </Button>
                            <Button onClick={() => handleAddTaskToObjective(activeObjective.id)}>Añadir tarea</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="space-y-2">
                      {activeObjective.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50"
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={task.completed}
                              onCheckedChange={() => handleToggleTaskCompletion(activeObjective.id, task.id)}
                              id={`task-${task.id}`}
                            />
                            <Label
                              htmlFor={`task-${task.id}`}
                              className={`${task.completed ? "line-through text-muted-foreground" : ""}`}
                            >
                              {task.title}
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingTask({
                                  objectiveId: activeObjective.id,
                                  taskId: task.id,
                                  title: task.title,
                                })
                                setOpenEditTaskDialog(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteTask(activeObjective.id, task.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {activeObjective.tasks.length === 0 && (
                        <div className="text-center p-4 text-muted-foreground">
                          No hay tareas para este objetivo. Añade una nueva tarea para comenzar.
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setActiveObjective(null)}>
                  Cerrar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar tarea */}
      <Dialog open={openEditTaskDialog} onOpenChange={setOpenEditTaskDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar tarea</DialogTitle>
            <DialogDescription>Modifica los detalles de la tarea</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="editTaskTitle">Título de la tarea</Label>
              <Input
                id="editTaskTitle"
                value={editingTask.title}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                placeholder="Título de la tarea"
              />
            </div>
          </div>
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
