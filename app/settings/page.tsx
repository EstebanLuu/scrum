"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Trash2, Edit, Upload } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")

  // Estado para configuración general
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "Gestini Software",
    companyLogo: "/placeholder.svg",
    primaryColor: "#1E40AF",
    secondaryColor: "#3B82F6",
    language: "es",
    timezone: "America/Argentina/Buenos_Aires",
  })

  // Estado para roles y permisos
  const [roles, setRoles] = useState([
    { id: 1, name: "Administrador", description: "Acceso completo a todas las funcionalidades", users: 3 },
    { id: 2, name: "Gerente", description: "Acceso a gestión de proyectos y equipos", users: 5 },
    { id: 3, name: "Desarrollador", description: "Acceso a tareas y documentación", users: 12 },
    { id: 4, name: "Observador", description: "Acceso de solo lectura", users: 4 },
  ])

  const [permissions, setPermissions] = useState([
    { id: 1, name: "Gestionar usuarios", roles: ["Administrador"] },
    { id: 2, name: "Gestionar roles", roles: ["Administrador"] },
    { id: 3, name: "Crear proyectos", roles: ["Administrador", "Gerente"] },
    { id: 4, name: "Editar proyectos", roles: ["Administrador", "Gerente"] },
    { id: 5, name: "Ver proyectos", roles: ["Administrador", "Gerente", "Desarrollador", "Observador"] },
    { id: 6, name: "Crear tareas", roles: ["Administrador", "Gerente", "Desarrollador"] },
    { id: 7, name: "Editar tareas", roles: ["Administrador", "Gerente", "Desarrollador"] },
    { id: 8, name: "Ver tareas", roles: ["Administrador", "Gerente", "Desarrollador", "Observador"] },
    { id: 9, name: "Gestionar documentos", roles: ["Administrador", "Gerente"] },
    { id: 10, name: "Ver documentos", roles: ["Administrador", "Gerente", "Desarrollador", "Observador"] },
  ])

  // Estado para usuarios
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@gestini.com",
      role: "Administrador",
      status: "Activo",
      avatar: "JP"
    },
    {
      id: 2,
      name: "María Gómez",
      email: "maria@gestini.com",
      role: "Gerente",
      status: "Activo",
      avatar: "MG"
    },
    {
      id: 3,
      name: "Carlos Rodríguez",
      email: "carlos@gestini.com",
      role: "Desarrollador",
      status: "Activo",
      avatar: "CR"
    },
    {
      id: 4,
      name: "Laura González",
      email: "laura@gestini.com",
      role: "Desarrollador",
      status: "Inactivo",
      avatar: "LG"
    },
    {
      id: 5,
      name: "Pedro López",
      email: "pedro@gestini.com",
      role: "Observador",
      status: "Activo",
      avatar: "PL"
    },
  ])

  // Estado para nuevos elementos
  const [newRole, setNewRole] = useState({ name: "", description: "" })
  const [newPermission, setNewPermission] = useState({ name: "", roles: [] })
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", password: "" })
  const [editingRole, setEditingRole] = useState(null)
  const [editingPermission, setEditingPermission] = useState(null)
  const [editingUser, setEditingUser] = useState(null)

  // Estado para diálogos
  const [openRoleDialog, setOpenRoleDialog] = useState(false)
  const [openPermissionDialog, setOpenPermissionDialog] = useState(false)
  const [openUserDialog, setOpenUserDialog] = useState(false)
  const [openEditRoleDialog, setOpenEditRoleDialog] = useState(false)
  const [openEditPermissionDialog, setOpenEditPermissionDialog] = useState(false)
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false)

  // Manejadores para configuración general
  const handleGeneralSettingsChange = (field, value) => {
    setGeneralSettings({ ...generalSettings, [field]: value })
  }

  const handleSaveGeneralSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "La configuración general ha sido actualizada correctamente",
    })
  }

  // Manejadores para roles
  const handleCreateRole = () => {
    if (!newRole.name) {
      toast({
        title: "Error",
        description: "El nombre del rol es obligatorio",
        variant: "destructive",
      })
      return
    }

    const role = {
      id: roles.length + 1,
      name: newRole.name,
      description: newRole.description,
      users: 0,
    }

    setRoles([...roles, role])
    setNewRole({ name: "", description: "" })
    setOpenRoleDialog(false)

    toast({
      title: "Rol creado",
      description: `El rol ${role.name} ha sido creado correctamente`,
    })
  }

  const handleEditRole = () => {
    if (!editingRole.name) {
      toast({
        title: "Error",
        description: "El nombre del rol es obligatorio",
        variant: "destructive",
      })
      return
    }

    setRoles(roles.map(role => role.id === editingRole.id ? editingRole : role))
    setOpenEditRoleDialog(false)
    setEditingRole(null)

    toast({
      title: "Rol actualizado",
      description: `El rol ha sido actualizado correctamente`,
    })
  }

  const handleDeleteRole = (roleId) => {
    // Verificar si hay usuarios con este rol
    const usersWithRole = users.filter(user => user.role === roles.find(r => r.id === roleId)?.name)

    if (usersWithRole.length > 0) {
      toast({
        title: "Error",
        description: "No se puede eliminar un rol asignado a usuarios",
        variant: "destructive",
      })
      return
    }

    setRoles(roles.filter(role => role.id !== roleId))

    toast({
      title: "Rol eliminado",
      description: "El rol ha sido eliminado correctamente",
    })
  }

  // Manejadores para permisos
  const handleCreatePermission = () => {
    if (!newPermission.name || newPermission.roles.length === 0) {
      toast({
        title: "Error",
        description: "El nombre del permiso y al menos un rol son obligatorios",
        variant: "destructive",
      })
      return
    }

    const permission = {
      id: permissions.length + 1,
      name: newPermission.name,
      roles: newPermission.roles,
    }

    setPermissions([...permissions, permission])
    setNewPermission({ name: "", roles: [] })
    setOpenPermissionDialog(false)

    toast({
      title: "Permiso creado",
      description: `El permiso ${permission.name} ha sido creado correctamente`,
    })
  }

  const handleEditPermission = () => {
    if (!editingPermission.name || editingPermission.roles.length === 0) {
      toast({
        title: "Error",
        description: "El nombre del permiso y al menos un rol son obligatorios",
        variant: "destructive",
      })
      return
    }

    setPermissions(permissions.map(permission =>
      permission.id === editingPermission.id ? editingPermission : permission
    ))
    setOpenEditPermissionDialog(false)
    setEditingPermission(null)

    toast({
      title: "Permiso actualizado",
      description: `El permiso ha sido actualizado correctamente`,
    })
  }

  const handleDeletePermission = (permissionId) => {
    setPermissions(permissions.filter(permission => permission.id !== permissionId))

    toast({
      title: "Permiso eliminado",
      description: "El permiso ha sido eliminado correctamente",
    })
  }

  // Manejadores para usuarios
  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role || !newUser.password) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive",
      })
      return
    }

    // Verificar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newUser.email)) {
      toast({
        title: "Error",
        description: "El formato del email no es válido",
        variant: "destructive",
      })
      return
    }

    // Verificar si el email ya existe
    if (users.some(user => user.email === newUser.email)) {
      toast({
        title: "Error",
        description: "Este email ya está registrado",
        variant: "destructive",
      })
      return
    }

    const user = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Activo",
      avatar: newUser.name.split(' ').map(n => n[0]).join(''),
    }

    setUsers([...users, user])
    setNewUser({ name: "", email: "", role: "", password: "" })
    setOpenUserDialog(false)

    toast({
      title: "Usuario creado",
      description: `El usuario ${user.name} ha sido creado correctamente`,
    })
  }

  const handleEditUser = () => {
    if (!editingUser.name || !editingUser.email || !editingUser.role) {
      toast({
        title: "Error",
        description: "El nombre, email y rol son obligatorios",
        variant: "destructive",
      })
      return
    }

    // Verificar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(editingUser.email)) {
      toast({
        title: "Error",
        description: "El formato del email no es válido",
        variant: "destructive",
      })
      return
    }

    // Verificar si el email ya existe (excepto el propio usuario)
    if (users.some(user => user.email === editingUser.email && user.id !== editingUser.id)) {
      toast({
        title: "Error",
        description: "Este email ya está registrado",
        variant: "destructive",
      })
      return
    }

    setUsers(users.map(user => user.id === editingUser.id ? {
      ...editingUser,
      avatar: editingUser.name.split(' ').map(n => n[0]).join(''),
    } : user))
    setOpenEditUserDialog(false)
    setEditingUser(null)

    toast({
      title: "Usuario actualizado",
      description: `El usuario ha sido actualizado correctamente`,
    })
  }

  const handleToggleUserStatus = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === "Activo" ? "Inactivo" : "Activo"
        }
      }
      return user
    }))

    toast({
      title: "Estado actualizado",
      description: "El estado del usuario ha sido actualizado correctamente",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="roles">Roles y Permisos</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>Configura los ajustes generales de la plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nombre de la empresa</Label>
                    <Input
                      id="companyName"
                      value={generalSettings.companyName}
                      onChange={(e) => handleGeneralSettingsChange('companyName', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Logo de la empresa</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={generalSettings.companyLogo} alt="Logo" />
                        <AvatarFallback>GS</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Cambiar logo
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Color primario</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        value={generalSettings.primaryColor}
                        onChange={(e) => handleGeneralSettingsChange('primaryColor', e.target.value)}
                      />
                      <div
                        className="h-10 w-10 rounded-md border"
                        style={{ backgroundColor: generalSettings.primaryColor }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Color secundario</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondaryColor"
                        value={generalSettings.secondaryColor}
                        onChange={(e) => handleGeneralSettingsChange('secondaryColor', e.target.value)}
                      />
                      <div
                        className="h-10 w-10 rounded-md border"
                        style={{ backgroundColor: generalSettings.secondaryColor }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select
                    value={generalSettings.language}
                    onValueChange={(value) => handleGeneralSettingsChange('language', value)}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Selecciona un idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="pt">Português</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona horaria</Label>
                  <Select
                    value={generalSettings.timezone}
                    onValueChange={(value) => handleGeneralSettingsChange('timezone', value)}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Selecciona una zona horaria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Argentina/Buenos_Aires">Argentina (GMT-3)</SelectItem>
                      <SelectItem value="America/Mexico_City">México (GMT-6)</SelectItem>
                      <SelectItem value="America/Santiago">Chile (GMT-4)</SelectItem>
                      <SelectItem value="America/Bogota">Colombia (GMT-5)</SelectItem>
                      <SelectItem value="Europe/Madrid">España (GMT+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notifications">Notificaciones</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotifications" className="cursor-pointer">Notificaciones por email</Label>
                    <Switch id="emailNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushNotifications" className="cursor-pointer">Notificaciones push</Label>
                    <Switch id="pushNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weeklyDigest" className="cursor-pointer">Resumen semanal</Label>
                    <Switch id="weeklyDigest" />
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="flex justify-end p-6 pt-0">
              <Button onClick={handleSaveGeneralSettings}>Guardar cambios</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Roles</CardTitle>
                <Dialog open={openRoleDialog} onOpenChange={setOpenRoleDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Nuevo rol
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Crear nuevo rol</DialogTitle>
                      <DialogDescription>Añade un nuevo rol al sistema</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="roleName">Nombre</Label>
                        <Input
                          id="roleName"
                          value={newRole.name}
                          onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                          placeholder="Nombre del rol"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="roleDescription">Descripción</Label>
                        <Textarea
                          id="roleDescription"
                          value={newRole.description}
                          onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                          placeholder="Descripción del rol"
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setOpenRoleDialog(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleCreateRole}>Crear rol</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roles.map((role) => (
                    <div key={role.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <h3 className="font-medium">{role.name}</h3>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{role.users} usuarios</Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingRole(role)
                            setOpenEditRoleDialog(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteRole(role.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Permisos</CardTitle>
                <Dialog open={openPermissionDialog} onOpenChange={setOpenPermissionDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Nuevo permiso
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Crear nuevo permiso</DialogTitle>
                      <DialogDescription>Añade un nuevo permiso al sistema</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="permissionName">Nombre</Label>
                        <Input
                          id="permissionName"
                          value={newPermission.name}
                          onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
                          placeholder="Nombre del permiso"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Roles asignados</Label>
                        <div className="space-y-2">
                          {roles.map((role) => (
                            <div key={role.id} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`role-${role.id}`}
                                checked={newPermission.roles.includes(role.name)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setNewPermission({
                                      ...newPermission,
                                      roles: [...newPermission.roles, role.name],
                                    })
                                  } else {
                                    setNewPermission({
                                      ...newPermission,
                                      roles: newPermission.roles.filter((r) => r !== role.name),
                                    })
                                  }
                                }}
                                className="h-4 w-4 rounded border-gray-300"
                              />
                              <Label htmlFor={`role-${role.id}`} className="text-sm">
                                {role.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setOpenPermissionDialog(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleCreatePermission}>Crear permiso</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <h3 className="font-medium">{permission.name}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {permission.roles.map((role) => (
                            <Badge key={role} variant="secondary" className="text-xs">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingPermission(permission)
                            setOpenEditPermissionDialog(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeletePermission(permission.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Diálogo para editar rol */}
      <Dialog open={openEditRoleDialog} onOpenChange={setOpenEditRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar rol</DialogTitle>
            <DialogDescription>Modifica los detalles del rol</DialogDescription>
          </DialogHeader>
          {editingRole && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="editRoleName">Nombre</Label>
                <Input
                  id="editRoleName"
                  value={editingRole.name}
                  onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                  placeholder="Nombre del rol"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editRoleDescription">Descripción</Label>
                <Textarea
                  id="editRoleDescription"
                  value={editingRole.description}
                  onChange={(e) => setEditingRole({ ...editingRole, description: e.target.value })}
                  placeholder="Descripción del rol"
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditRoleDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditRole}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar permiso */}
      <Dialog open={openEditPermissionDialog} onOpenChange={setOpenEditPermissionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar permiso</DialogTitle>
            <DialogDescription>Modifica los detalles del permiso</DialogDescription>
          </DialogHeader>
          {editingPermission && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="editPermissionName">Nombre</Label>
                <Input
                  id="editPermissionName"
                  value={editingPermission.name}
                  onChange={(e) => setEditingPermission({ ...editingPermission, name: e.target.value })}
                  placeholder="Nombre del permiso"
                />
              </div>
              <div className="grid gap-2">
                <Label>Roles asignados</Label>
                <div className="space-y-2">
                  {roles.map((role) => (
                    <div key={role.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`edit-role-${role.id}`}
                        checked={editingPermission.roles.includes(role.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEditingPermission({
                              ...editingPermission,
                              roles: [...editingPermission.roles, role.name],
                            })
                          } else {
                            setEditingPermission({
                              ...editingPermission,
                              roles: editingPermission.roles.filter((r) => r !== role.name),
                            })
                          }
                        }}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor={`edit-role-${role.id}`} className="text-sm">
                        {role.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditPermissionDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditPermission}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}




