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
import { Plus, MoreHorizontal, Mail, Phone, MapPin, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function ClientsPage() {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Acme Inc",
      contact: "John Doe",
      email: "john@acme.com",
      phone: "+1 234 567 890",
      address: "123 Business St, New York, NY",
      status: "Activo",
      notes: "Cliente desde 2020. Interesado en servicios de desarrollo web y móvil.",
      lastContact: "2023-10-15",
    },
    {
      id: 2,
      name: "TechCorp",
      contact: "Jane Smith",
      email: "jane@techcorp.com",
      phone: "+1 987 654 321",
      address: "456 Tech Ave, San Francisco, CA",
      status: "Potencial",
      notes: "Reunión inicial realizada. Esperando aprobación de presupuesto.",
      lastContact: "2023-10-10",
    },
    {
      id: 3,
      name: "Global Solutions",
      contact: "Robert Johnson",
      email: "robert@globalsolutions.com",
      phone: "+1 555 123 456",
      address: "789 Global Blvd, Chicago, IL",
      status: "Inactivo",
      notes: "Sin contacto en los últimos 3 meses. Programar seguimiento.",
      lastContact: "2023-07-20",
    },
    {
      id: 4,
      name: "Innovative Designs",
      contact: "Sarah Williams",
      email: "sarah@innovative.com",
      phone: "+1 444 789 012",
      address: "321 Innovation Dr, Austin, TX",
      status: "Activo",
      notes: "Proyecto en curso. Reunión de seguimiento programada para la próxima semana.",
      lastContact: "2023-10-12",
    },
  ])

  const [newClient, setNewClient] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    status: "Potencial",
    notes: "",
  })

  const [editingClient, setEditingClient] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [newNote, setNewNote] = useState("")

  const { toast } = useToast()

  const handleCreateClient = () => {
    if (!newClient.name || !newClient.contact || !newClient.email) {
      toast({
        title: "Error",
        description: "El nombre, contacto y email son obligatorios",
        variant: "destructive",
      })
      return
    }

    const client = {
      id: clients.length + 1,
      ...newClient,
      lastContact: new Date().toISOString().split("T")[0],
    }

    setClients([...clients, client])
    setNewClient({
      name: "",
      contact: "",
      email: "",
      phone: "",
      address: "",
      status: "Potencial",
      notes: "",
    })
    setOpenDialog(false)

    toast({
      title: "Cliente creado",
      description: `El cliente ${client.name} ha sido creado correctamente`,
    })
  }

  const handleEditClient = () => {
    if (!editingClient.name || !editingClient.contact || !editingClient.email) {
      toast({
        title: "Error",
        description: "El nombre, contacto y email son obligatorios",
        variant: "destructive",
      })
      return
    }

    setClients(clients.map((client) => (client.id === editingClient.id ? editingClient : client)))

    setOpenEditDialog(false)
    setEditingClient(null)

    toast({
      title: "Cliente actualizado",
      description: `El cliente ${editingClient.name} ha sido actualizado correctamente`,
    })
  }

  const handleDeleteClient = (clientId) => {
    setClients(clients.filter((client) => client.id !== clientId))

    toast({
      title: "Cliente eliminado",
      description: "El cliente ha sido eliminado correctamente",
    })
  }

  const handleAddNote = () => {
    if (!newNote.trim()) {
      toast({
        title: "Error",
        description: "La nota no puede estar vacía",
        variant: "destructive",
      })
      return
    }

    const updatedClient = {
      ...selectedClient,
      notes: selectedClient.notes
        ? `${selectedClient.notes}\n\n${new Date().toLocaleDateString()}: ${newNote}`
        : `${new Date().toLocaleDateString()}: ${newNote}`,
      lastContact: new Date().toISOString().split("T")[0],
    }

    setClients(clients.map((client) => (client.id === selectedClient.id ? updatedClient : client)))

    setSelectedClient(updatedClient)
    setNewNote("")

    toast({
      title: "Nota añadida",
      description: "La nota ha sido añadida correctamente",
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Activo":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            {status}
          </Badge>
        )
      case "Potencial":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            {status}
          </Badge>
        )
      case "Inactivo":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
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
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo cliente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear nuevo cliente</DialogTitle>
              <DialogDescription>Añade un nuevo cliente a tu base de datos</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre de la empresa</Label>
                <Input
                  id="name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  placeholder="Nombre de la empresa"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact">Persona de contacto</Label>
                <Input
                  id="contact"
                  value={newClient.contact}
                  onChange={(e) => setNewClient({ ...newClient, contact: e.target.value })}
                  placeholder="Nombre completo"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  value={newClient.address}
                  onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                  placeholder="Dirección completa"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Estado</Label>
                <Select
                  value={newClient.status}
                  onValueChange={(value) => setNewClient({ ...newClient, status: value })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Potencial">Potencial</SelectItem>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notas</Label>
                <Textarea
                  id="notes"
                  value={newClient.notes}
                  onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                  placeholder="Información adicional sobre el cliente"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateClient}>Crear cliente</Button>
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
            <Input placeholder="Buscar clientes..." className="w-[200px] md:w-[300px]" />
          </div>
        </div>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {clients.map((client) => (
              <Card key={client.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                        <CardDescription>{client.contact}</CardDescription>
                      </div>
                    </div>
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
                            setSelectedClient(client)
                            setOpenDetailsDialog(true)
                          }}
                        >
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingClient(client)
                            setOpenEditDialog(true)
                          }}
                        >
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 dark:text-red-400"
                          onClick={() => handleDeleteClient(client.id)}
                        >
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{client.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Último contacto: {client.lastContact}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
                  {getStatusBadge(client.status)}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedClient(client)
                      setOpenDetailsDialog(true)
                    }}
                  >
                    Ver detalles
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
                <div className="grid grid-cols-6 border-b px-4 py-3 font-medium">
                  <div className="col-span-2">Cliente</div>
                  <div>Contacto</div>
                  <div>Estado</div>
                  <div>Último contacto</div>
                  <div className="text-right">Acciones</div>
                </div>
                {clients.map((client) => (
                  <div key={client.id} className="grid grid-cols-6 items-center px-4 py-3 border-b">
                    <div className="col-span-2">
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-muted-foreground">{client.email}</div>
                    </div>
                    <div>{client.contact}</div>
                    <div>{getStatusBadge(client.status)}</div>
                    <div>{client.lastContact}</div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedClient(client)
                          setOpenDetailsDialog(true)
                        }}
                      >
                        Ver
                      </Button>
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
                              setEditingClient(client)
                              setOpenEditDialog(true)
                            }}
                          >
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 dark:text-red-400"
                            onClick={() => handleDeleteClient(client.id)}
                          >
                            Eliminar
                          </DropdownMenuItem>
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

      {/* Diálogo para editar cliente */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar cliente</DialogTitle>
            <DialogDescription>Modifica los datos del cliente</DialogDescription>
          </DialogHeader>
          {editingClient && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="editName">Nombre de la empresa</Label>
                <Input
                  id="editName"
                  value={editingClient.name}
                  onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                  placeholder="Nombre de la empresa"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editContact">Persona de contacto</Label>
                <Input
                  id="editContact"
                  value={editingClient.contact}
                  onChange={(e) => setEditingClient({ ...editingClient, contact: e.target.value })}
                  placeholder="Nombre completo"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="editEmail">Email</Label>
                  <Input
                    id="editEmail"
                    type="email"
                    value={editingClient.email}
                    onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editPhone">Teléfono</Label>
                  <Input
                    id="editPhone"
                    value={editingClient.phone}
                    onChange={(e) => setEditingClient({ ...editingClient, phone: e.target.value })}
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editAddress">Dirección</Label>
                <Input
                  id="editAddress"
                  value={editingClient.address}
                  onChange={(e) => setEditingClient({ ...editingClient, address: e.target.value })}
                  placeholder="Dirección completa"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editStatus">Estado</Label>
                <Select
                  value={editingClient.status}
                  onValueChange={(value) => setEditingClient({ ...editingClient, status: value })}
                >
                  <SelectTrigger id="editStatus">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Potencial">Potencial</SelectItem>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editNotes">Notas</Label>
                <Textarea
                  id="editNotes"
                  value={editingClient.notes}
                  onChange={(e) => setEditingClient({ ...editingClient, notes: e.target.value })}
                  placeholder="Información adicional sobre el cliente"
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditClient}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para ver detalles del cliente */}
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalles del cliente</DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="grid gap-6 py-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">{selectedClient.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{selectedClient.name}</h2>
                  <p className="text-muted-foreground">{selectedClient.contact}</p>
                  <div className="mt-2">{getStatusBadge(selectedClient.status)}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Información de contacto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedClient.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedClient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedClient.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Último contacto: {selectedClient.lastContact}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Historial de notas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="max-h-40 overflow-y-auto whitespace-pre-line">
                        {selectedClient.notes || "No hay notas disponibles."}
                      </div>
                      <div className="pt-2 border-t">
                        <Label htmlFor="newNote" className="mb-2 block">
                          Añadir nueva nota
                        </Label>
                        <div className="flex gap-2">
                          <Textarea
                            id="newNote"
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Escribe una nueva nota..."
                            className="flex-1"
                            rows={2}
                          />
                          <Button onClick={handleAddNote} className="self-end">
                            Añadir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
