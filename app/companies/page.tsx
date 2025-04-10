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

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([
    { id: 1, name: "Acme Inc", description: "Empresa de desarrollo de software", sectors: 3, projects: 5 },
    { id: 2, name: "TechSolutions", description: "Consultoría tecnológica", sectors: 2, projects: 4 },
    { id: 3, name: "WebDev Pro", description: "Desarrollo web y móvil", sectors: 4, projects: 7 },
  ])
  const [newCompany, setNewCompany] = useState({ name: "", description: "" })
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleCreateCompany = () => {
    if (!newCompany.name) {
      toast({
        title: "Error",
        description: "El nombre de la empresa es obligatorio",
        variant: "destructive",
      })
      return
    }

    const company = {
      id: companies.length + 1,
      name: newCompany.name,
      description: newCompany.description,
      sectors: 0,
      projects: 0,
    }

    setCompanies([...companies, company])
    setNewCompany({ name: "", description: "" })
    setOpen(false)

    toast({
      title: "Empresa creada",
      description: `La empresa ${company.name} ha sido creada correctamente`,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Empresas</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva empresa
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear nueva empresa</DialogTitle>
              <DialogDescription>Añade una nueva empresa para organizar tus proyectos</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                  placeholder="Nombre de la empresa"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  value={newCompany.description}
                  onChange={(e) => setNewCompany({ ...newCompany, description: e.target.value })}
                  placeholder="Descripción breve"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateCompany}>Crear empresa</Button>
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
            <Input placeholder="Buscar empresas..." className="w-[200px] md:w-[300px]" />
          </div>
        </div>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <Card key={company.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle>{company.name}</CardTitle>
                    <CardDescription>{company.description}</CardDescription>
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
                      {company.sectors} sectores
                    </div>
                    <div className="flex items-center">
                      <FolderKanban className="mr-1 h-4 w-4" />
                      {company.projects} proyectos
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Ver empresa
                  </Button>
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
                  <div>Sectores</div>
                  <div>Proyectos</div>
                  <div className="text-right">Acciones</div>
                </div>
                {companies.map((company) => (
                  <div key={company.id} className="grid grid-cols-5 items-center px-4 py-3">
                    <div className="col-span-2">
                      <div className="font-medium">{company.name}</div>
                      <div className="text-sm text-muted-foreground">{company.description}</div>
                    </div>
                    <div>{company.sectors}</div>
                    <div>{company.projects}</div>
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
