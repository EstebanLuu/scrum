"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, MoreHorizontal, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Portal de clientes",
      company: "Acme Inc",
      description: "Portal web para clientes",
      status: "En progreso",
      progress: 65,
      startDate: "2023-10-15",
      endDate: "2023-12-30",
    },
    {
      id: 2,
      name: "Sistema de inventario",
      company: "TechSolutions",
      description: "Sistema para gestión de inventario",
      status: "Planificación",
      progress: 25,
      startDate: "2023-11-01",
      endDate: "2024-02-28",
    },
    {
      id: 3,
      name: "API de pagos",
      company: "WebDev Pro",
      description: "API para procesamiento de pagos",
      status: "Completado",
      progress: 100,
      startDate: "2023-08-10",
      endDate: "2023-11-15",
    },
  ])

  const [newProject, setNewProject] = useState({
    name: "",
    company: "",
    description: "",
    startDate: "",
    endDate: "",
  })

  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const companies = [
    { id: 1, name: "Acme Inc" },
    { id: 2, name: "TechSolutions" },
    { id: 3, name: "WebDev Pro" },
  ]

  const handleCreateProject = () => {
    if (!newProject.name || !newProject.company) {
      toast({
        title: "Error",
        description: "El nombre del proyecto y la empresa son obligatorios",
        variant: "destructive",
      })
      return
    }

    const project = {
      id: projects.length + 1,
      name: newProject.name,
      company: newProject.company,
      description: newProject.description,
      status: "Planificación",
      progress: 0,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
    }

    setProjects([...projects, project])
    setNewProject({ name: "", company: "", description: "", startDate: "", endDate: "" })
    setOpen(false)

    toast({
      title: "Proyecto creado",
      description: `El proyecto ${project.name} ha sido creado correctamente`,
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Planificación":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            {status}
          </Badge>
        )
      case "En progreso":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            {status}
          </Badge>
        )
      case "Completado":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            {status}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Proyectos</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo proyecto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear nuevo proyecto</DialogTitle>
              <DialogDescription>Añade un nuevo proyecto para organizar tus tareas</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="Nombre del proyecto"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Empresa</Label>
                <Select
                  onValueChange={(value) => setNewProject({ ...newProject, company: value })}
                  value={newProject.company}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.name}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Descripción breve"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Fecha de inicio</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">Fecha de finalización</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newProject.endDate}
                    onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateProject}>Crear proyecto</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="grid" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="grid">Cuadrícula</TabsTrigger>
            <TabsTrigger value="list">Lista</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Input placeholder="Buscar proyectos..." className="w-[200px] md:w-[300px]" />
          </div>
        </div>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.company}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Acciones</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Ver tablero SCRUM</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">{project.description}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progreso</span>
                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {project.startDate}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {project.endDate}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {getStatusBadge(project.status)}
                  <Button variant="outline">Ver proyecto</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 border-b px-4 py-3 font-medium">
                  <div className="col-span-2">Nombre</div>
                  <div>Empresa</div>
                  <div>Estado</div>
                  <div>Progreso</div>
                  <div className="text-right">Acciones</div>
                </div>
                {projects.map((project) => (
                  <div key={project.id} className="grid grid-cols-6 items-center px-4 py-3">
                    <div className="col-span-2">
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-muted-foreground">{project.description}</div>
                    </div>
                    <div>{project.company}</div>
                    <div>{getStatusBadge(project.status)}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Progress value={project.progress} className="h-2" />
                        <span className="text-sm">{project.progress}%</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Acciones</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
