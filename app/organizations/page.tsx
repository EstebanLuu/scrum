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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Building2, FolderKanban, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState([
    { id: 1, name: "Gestini Software", description: "Empresa principal de desarrollo", workspaces: 5, projects: 12 },
    { id: 2, name: "Cliente Externo A", description: "Cliente de servicios web", workspaces: 3, projects: 4 },
    { id: 3, name: "Cliente Externo B", description: "Cliente de aplicaciones móviles", workspaces: 2, projects: 3 },
  ])
  const [newOrganization, setNewOrganization] = useState({ name: "", description: "" })
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleCreateOrganization = () => {
    if (!newOrganization.name) {
      toast({
        title: "Error",
        description: "El nombre de la organización es obligatorio",
        variant: "destructive",
      })
      return
    }

    const organization = {
      id: organizations.length + 1,
      name: newOrganization.name,
      description: newOrganization.description,
      workspaces: 0,
      projects: 0,
    }

    setOrganizations([...organizations, organization])
    setNewOrganization({ name: "", description: "" })
    setOpen(false)

    toast({
      title: "Organización creada",
      description: `La organización ${organization.name} ha sido creada correctamente`,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Organizaciones</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva organización
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear nueva organización</DialogTitle>
              <DialogDescription>Añade una nueva organización para gestionar tus proyectos</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={newOrganization.name}
                  onChange={(e) => setNewOrganization({ ...newOrganization, name: e.target.value })}
                  placeholder="Nombre de la organización"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  value={newOrganization.description}
                  onChange={(e) => setNewOrganization({ ...newOrganization, description: e.target.value })}
                  placeholder="Descripción breve"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateOrganization}>Crear organización</Button>
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
            <Input placeholder="Buscar organizaciones..." className="w-[200px] md:w-[300px]" />
          </div>
        </div>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {organizations.map((organization) => (
              <Card key={organization.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle>{organization.name}</CardTitle>
                    <CardDescription>{organization.description}</CardDescription>
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
                      <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Building2 className="mr-1 h-4 w-4" />
                      {organization.workspaces} espacios
                    </div>
                    <div className="flex items-center">
                      <FolderKanban className="mr-1 h-4 w-4" />
                      {organization.projects} proyectos
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/organizations/${organization.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      Ver organización
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 border-b px-4 py-3 font-medium">
                  <div className="col-span-2">Nombre</div>
                  <div>Espacios</div>
                  <div>Proyectos</div>
                  <div className="text-right">Acciones</div>
                </div>
                {organizations.map((organization) => (
                  <div key={organization.id} className="grid grid-cols-5 items-center px-4 py-3">
                    <div className="col-span-2">
                      <div className="font-medium">{organization.name}</div>
                      <div className="text-sm text-muted-foreground">{organization.description}</div>
                    </div>
                    <div>{organization.workspaces}</div>
                    <div>{organization.projects}</div>
                    <div className="flex justify-end gap-2">
                      <Link href={`/organizations/${organization.id}`}>
                        <Button variant="outline" size="sm">
                          Ver
                        </Button>
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Acciones</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
