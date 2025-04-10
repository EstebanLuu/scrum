"use client"

import { Badge } from "@/components/ui/badge"

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
import { Textarea } from "@/components/ui/textarea"
import { MoreHorizontal, FileText, FolderOpen, Edit, Trash2, Clock, Download, Search, ArrowLeft } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function DocumentsPage() {
  const router = useRouter()
  const [folders, setFolders] = useState([
    {
      id: 1,
      name: "Documentación de proyectos",
      description: "Documentos relacionados con proyectos activos",
      sector: "Tecnología",
    },
    {
      id: 2,
      name: "Manuales internos",
      description: "Guías y procedimientos internos",
      sector: "Recursos Humanos",
    },
    {
      id: 3,
      name: "Plantillas",
      description: "Plantillas para diferentes tipos de documentos",
      sector: "Marketing",
    },
    {
      id: 4,
      name: "Notas de reuniones",
      description: "Resúmenes y actas de reuniones",
      sector: "Ventas",
    },
  ])

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Guía de estilo",
      folderId: 3,
      content:
        "# Guía de estilo de Gestini\n\n## Colores corporativos\n- Azul principal: #1E40AF\n- Azul secundario: #3B82F6\n- Gris: #6B7280\n\n## Tipografía\n- Títulos: Inter, sans-serif\n- Cuerpo: Inter, sans-serif\n\n## Uso del logotipo\nEl logotipo debe mantener siempre sus proporciones originales...",
      createdAt: "2023-09-15",
      updatedAt: "2023-10-01",
    },
    {
      id: 2,
      name: "Acta reunión inicial - Portal clientes",
      folderId: 4,
      content:
        "# Acta de reunión: Inicio proyecto Portal de Clientes\n\n**Fecha:** 10/10/2023\n**Participantes:** Juan Pérez, María Gómez, Carlos Rodríguez\n\n## Temas tratados\n1. Presentación del equipo\n2. Definición de objetivos del proyecto\n3. Establecimiento de plazos\n\n## Acuerdos\n- Entrega de primera versión: 15/12/2023\n- Reuniones semanales de seguimiento\n- Próxima reunión: 17/10/2023",
      createdAt: "2023-10-10",
      updatedAt: "2023-10-10",
    },
    {
      id: 3,
      name: "Manual de onboarding",
      folderId: 2,
      content:
        "# Manual de Onboarding\n\n## Bienvenida a Gestini\n\nEste manual está diseñado para ayudarte en tus primeros días en la empresa.\n\n## Primeros pasos\n\n1. Configuración de cuenta de correo\n2. Acceso a sistemas internos\n3. Presentación del equipo\n\n## Herramientas principales\n\n- Gestini Admin: Sistema de gestión interna\n- Slack: Comunicación del equipo\n- GitHub: Repositorios de código\n\n## Contactos importantes\n\n- RRHH: recursos@gestini.com\n- Soporte IT: soporte@gestini.com",
      createdAt: "2023-08-20",
      updatedAt: "2023-09-05",
    },
    {
      id: 4,
      name: "Plan de marketing Q4",
      folderId: 3,
      content:
        "# Plan de Marketing Q4 2023\n\n## Objetivos\n\n1. Aumentar tráfico web en un 25%\n2. Incrementar conversiones en un 15%\n3. Lanzar nueva campaña en redes sociales\n\n## Estrategias\n\n### SEO\n- Optimización de palabras clave\n- Mejora de estructura de URLs\n- Creación de contenido de valor\n\n### SEM\n- Campaña Google Ads enfocada en servicios premium\n- Remarketing para visitantes previos\n\n### Redes Sociales\n- Calendario de contenidos para LinkedIn y Twitter\n- Campaña de influencers para Instagram\n\n## Presupuesto\n\n- SEO: $3,000\n- SEM: $5,000\n- Redes Sociales: $2,500\n- Diseño: $1,500\n\n## KPIs\n\n- CTR > 2.5%\n- CPC < $1.20\n- Tasa de rebote < 40%",
      createdAt: "2023-10-05",
      updatedAt: "2023-10-12",
    },
    {
      id: 5,
      name: "Informe financiero mensual",
      folderId: 1,
      content:
        "# Informe Financiero - Septiembre 2023\n\n## Resumen Ejecutivo\n\nEl mes de septiembre cerró con un incremento del 12% en ingresos respecto al mismo período del año anterior, superando las proyecciones en un 5%.\n\n## Indicadores Clave\n\n| Indicador | Valor | Variación |\n|-----------|-------|----------|\n| Ingresos | $125,000 | +12% |\n| Gastos | $78,000 | +3% |\n| Margen | 37.6% | +5.2% |\n| ROI | 1.6 | +0.2 |\n\n## Análisis por Departamento\n\n### Ventas\n- Incremento del 15% en ventas de servicios premium\n- Caída del 3% en servicios básicos\n\n### Marketing\n- ROI de campañas: 2.3 (incremento de 0.4)\n- Costo de adquisición: $120 (reducción de $15)\n\n## Proyecciones\n\nSe espera cerrar el Q4 con un incremento total del 18% respecto al año anterior, manteniendo el control de gastos en el rango actual.",
      createdAt: "2023-10-03",
      updatedAt: "2023-10-03",
    },
  ])

  const [sectors, setSectors] = useState([
    { id: 1, name: "Tecnología" },
    { id: 2, name: "Marketing" },
    { id: 3, name: "Ventas" },
    { id: 4, name: "Recursos Humanos" },
    { id: 5, name: "Finanzas" },
  ])

  const [newFolder, setNewFolder] = useState({ name: "", description: "", sector: "" })
  const [newDocument, setNewDocument] = useState({ name: "", folderId: "", content: "" })
  const [editingFolder, setEditingFolder] = useState(null)
  const [editingDocument, setEditingDocument] = useState(null)
  const [activeDocument, setActiveDocument] = useState(null)
  const [currentFolder, setCurrentFolder] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sectorFilter, setSectorFilter] = useState("")

  const [openFolderDialog, setOpenFolderDialog] = useState(false)
  const [openDocumentDialog, setOpenDocumentDialog] = useState(false)
  const [openEditFolderDialog, setOpenEditFolderDialog] = useState(false)
  const [openEditDocumentDialog, setOpenEditDocumentDialog] = useState(false)

  const { toast } = useToast()

  // Obtener documentos recientes (máximo 5)
  const recentDocuments = [...documents]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)

  // Filtrar carpetas por sector si hay un filtro activo
  const filteredFolders =
    sectorFilter && sectorFilter !== "none" ? folders.filter((folder) => folder.sector === sectorFilter) : folders

  // Filtrar documentos por búsqueda
  const filteredDocuments = documents.filter((doc) =>
    currentFolder
      ? doc.folderId === currentFolder.id &&
        (searchQuery ? doc.name.toLowerCase().includes(searchQuery.toLowerCase()) : true)
      : false,
  )

  const handleCreateFolder = () => {
    if (!newFolder.name || !newFolder.sector) {
      toast({
        title: "Error",
        description: "El nombre de la carpeta y el sector son obligatorios",
        variant: "destructive",
      })
      return
    }

    const folder = {
      id: folders.length + 1,
      name: newFolder.name,
      description: newFolder.description,
      sector: newFolder.sector,
    }

    setFolders([...folders, folder])
    setNewFolder({ name: "", description: "", sector: "" })
    setOpenFolderDialog(false)

    toast({
      title: "Carpeta creada",
      description: `La carpeta ${folder.name} ha sido creada correctamente`,
    })
  }

  const handleCreateDocument = () => {
    if (!newDocument.name || !newDocument.folderId) {
      toast({
        title: "Error",
        description: "El nombre del documento y la carpeta son obligatorios",
        variant: "destructive",
      })
      return
    }

    const document = {
      id: documents.length + 1,
      name: newDocument.name,
      folderId: Number.parseInt(newDocument.folderId),
      content: newDocument.content,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }

    setDocuments([...documents, document])
    setNewDocument({ name: "", folderId: "", content: "" })
    setOpenDocumentDialog(false)

    toast({
      title: "Documento creado",
      description: `El documento ${document.name} ha sido creado correctamente`,
    })
  }

  const handleEditFolder = () => {
    if (!editingFolder.name) {
      toast({
        title: "Error",
        description: "El nombre de la carpeta es obligatorio",
        variant: "destructive",
      })
      return
    }

    setFolders(folders.map((folder) => (folder.id === editingFolder.id ? editingFolder : folder)))

    setOpenEditFolderDialog(false)
    setEditingFolder(null)

    toast({
      title: "Carpeta actualizada",
      description: `La carpeta ${editingFolder.name} ha sido actualizada correctamente`,
    })
  }

  const handleEditDocument = () => {
    if (!editingDocument.name) {
      toast({
        title: "Error",
        description: "El nombre del documento es obligatorio",
        variant: "destructive",
      })
      return
    }

    const updatedDocument = {
      ...editingDocument,
      updatedAt: new Date().toISOString().split("T")[0],
    }

    setDocuments(documents.map((doc) => (doc.id === updatedDocument.id ? updatedDocument : doc)))

    if (activeDocument && activeDocument.id === updatedDocument.id) {
      setActiveDocument(updatedDocument)
    }

    setOpenEditDocumentDialog(false)
    setEditingDocument(null)

    toast({
      title: "Documento actualizado",
      description: `El documento ${updatedDocument.name} ha sido actualizado correctamente`,
    })
  }

  const handleDeleteFolder = (folderId) => {
    // Verificar si hay documentos en la carpeta
    const docsInFolder = documents.filter((doc) => doc.folderId === folderId)

    if (docsInFolder.length > 0) {
      toast({
        title: "Error",
        description: "No se puede eliminar una carpeta que contiene documentos",
        variant: "destructive",
      })
      return
    }

    setFolders(folders.filter((folder) => folder.id !== folderId))

    toast({
      title: "Carpeta eliminada",
      description: "La carpeta ha sido eliminada correctamente",
    })
  }

  const handleDeleteDocument = (documentId) => {
    setDocuments(documents.filter((doc) => doc.id !== documentId))

    if (activeDocument && activeDocument.id === documentId) {
      setActiveDocument(null)
    }

    toast({
      title: "Documento eliminado",
      description: "El documento ha sido eliminado correctamente",
    })
  }

  const handleUpdateDocumentContent = (content) => {
    if (!activeDocument) return

    const updatedDocument = {
      ...activeDocument,
      content,
      updatedAt: new Date().toISOString().split("T")[0],
    }

    setDocuments(documents.map((doc) => (doc.id === updatedDocument.id ? updatedDocument : doc)))

    setActiveDocument(updatedDocument)
  }

  const handleDownloadDocument = (document) => {
    // Crear un HTML básico con el contenido del documento
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${document.name}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            color: #1E40AF;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 10px;
          }
          h2 {
            color: #3B82F6;
            margin-top: 20px;
          }
          pre {
            background-color: #f1f5f9;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
          }
          th, td {
            border: 1px solid #e2e8f0;
            padding: 8px 12px;
            text-align: left;
          }
          th {
            background-color: #f8fafc;
          }
        </style>
      </head>
      <body>
        <div class="content">
          ${document.content
            .replace(/\n/g, "<br>")
            .replace(/# (.*)/g, "<h1>$1</h1>")
            .replace(/## (.*)/g, "<h2>$1</h2>")
            .replace(/### (.*)/g, "<h3>$1</h3>")}
        </div>
      </body>
      </html>
    `

    // Crear un blob con el contenido HTML
    const blob = new Blob([htmlContent], { type: "text/html" })

    // Crear una URL para el blob
    const url = URL.createObjectURL(blob)

    // Crear un elemento de enlace para descargar
    const a = document.createElement("a")
    a.href = url
    a.download = `${document.name}.html`

    // Añadir el enlace al documento, hacer clic en él y luego eliminarlo
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    // Liberar la URL del objeto
    URL.revokeObjectURL(url)

    toast({
      title: "Documento descargado",
      description: `El documento ${document.name} ha sido descargado correctamente`,
    })
  }

  const handleOpenFolder = (folder) => {
    setCurrentFolder(folder)
    setActiveDocument(null)
  }

  const handleBackToFolders = () => {
    setCurrentFolder(null)
    setActiveDocument(null)
    setSearchQuery("")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Documentos</h1>
        <div className="flex gap-2">
          <Dialog open={openFolderDialog} onOpenChange={setOpenFolderDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FolderOpen className="mr-2 h-4 w-4" />
                Nueva carpeta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear nueva carpeta</DialogTitle>
                <DialogDescription>Añade una nueva carpeta para organizar tus documentos</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="folderName">Nombre</Label>
                  <Input
                    id="folderName"
                    value={newFolder.name}
                    onChange={(e) => setNewFolder({ ...newFolder, name: e.target.value })}
                    placeholder="Nombre de la carpeta"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="folderDescription">Descripción</Label>
                  <Input
                    id="folderDescription"
                    value={newFolder.description}
                    onChange={(e) => setNewFolder({ ...newFolder, description: e.target.value })}
                    placeholder="Descripción breve"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="folderSector">Sector</Label>
                  <Select
                    value={newFolder.sector}
                    onValueChange={(value) => setNewFolder({ ...newFolder, sector: value })}
                  >
                    <SelectTrigger id="folderSector">
                      <SelectValue placeholder="Selecciona un sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map((sector) => (
                        <SelectItem key={sector.id} value={sector.name || ""}>
                          {sector.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenFolderDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateFolder}>Crear carpeta</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {currentFolder && (
            <Dialog open={openDocumentDialog} onOpenChange={setOpenDocumentDialog}>
              <DialogTrigger asChild>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Nuevo documento
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Crear nuevo documento</DialogTitle>
                  <DialogDescription>Crea un nuevo documento en formato Markdown</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="documentName">Nombre</Label>
                    <Input
                      id="documentName"
                      value={newDocument.name}
                      onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                      placeholder="Nombre del documento"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="documentFolder">Carpeta</Label>
                    <Select
                      value={String(currentFolder.id)}
                      onValueChange={(value) => setNewDocument({ ...newDocument, folderId: value })}
                      disabled
                    >
                      <SelectTrigger id="documentFolder">
                        <SelectValue placeholder="Selecciona una carpeta" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={String(currentFolder.id)}>{currentFolder.name}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="documentContent">Contenido (Markdown)</Label>
                    <Textarea
                      id="documentContent"
                      value={newDocument.content}
                      onChange={(e) => setNewDocument({ ...newDocument, content: e.target.value })}
                      placeholder="# Título del documento

## Subtítulo

Contenido del documento..."
                      className="min-h-[300px] font-mono"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenDocumentDialog(false)}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => {
                      setNewDocument({ ...newDocument, folderId: String(currentFolder.id) })
                      handleCreateDocument()
                    }}
                  >
                    Crear documento
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {!currentFolder ? (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">Carpetas</h2>
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Todos los sectores</SelectItem>
                  {sectors.map((sector) => (
                    <SelectItem key={sector.id} value={sector.name}>
                      {sector.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFolders.map((folder) => (
              <Card
                key={folder.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleOpenFolder(folder)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <FolderOpen className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{folder.name}</CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingFolder(folder)
                            setOpenEditFolderDialog(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 dark:text-red-400"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteFolder(folder.id)
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>{folder.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {documents.filter((doc) => doc.folderId === folder.id).length} documentos
                    </span>
                    <Badge variant="outline">{folder.sector}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold">Documentos recientes</h2>
            </div>
            <div className="space-y-2">
              {recentDocuments.map((document) => (
                <Card key={document.id} className="cursor-pointer hover:bg-muted/50">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <div>
                          <CardTitle className="text-base">{document.name}</CardTitle>
                          <CardDescription className="text-xs">
                            Actualizado: {document.updatedAt} •{folders.find((f) => f.id === document.folderId)?.name}
                          </CardDescription>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const folder = folders.find((f) => f.id === document.folderId)
                          if (folder) {
                            handleOpenFolder(folder)
                            setActiveDocument(document)
                          }
                        }}
                      >
                        Ver
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleBackToFolders}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a carpetas
            </Button>
            <div className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="Buscar documentos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button>
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((document) => (
                <Card
                  key={document.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActiveDocument(document)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{document.name}</CardTitle>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              setEditingDocument(document)
                              setOpenEditDocumentDialog(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDownloadDocument(document)
                            }}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Descargar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 dark:text-red-400"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteDocument(document.id)
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>Actualizado: {document.updatedAt}</CardDescription>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center">
                <h3 className="text-lg font-medium">No se encontraron documentos</h3>
                <p className="text-muted-foreground">Añade un nuevo documento a esta carpeta para empezar</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Diálogo para editar carpeta */}
      <Dialog open={openEditFolderDialog} onOpenChange={setOpenEditFolderDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar carpeta</DialogTitle>
            <DialogDescription>Modifica los detalles de la carpeta</DialogDescription>
          </DialogHeader>
          {editingFolder && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="editFolderName">Nombre</Label>
                <Input
                  id="editFolderName"
                  value={editingFolder.name}
                  onChange={(e) => setEditingFolder({ ...editingFolder, name: e.target.value })}
                  placeholder="Nombre de la carpeta"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editFolderDescription">Descripción</Label>
                <Input
                  id="editFolderDescription"
                  value={editingFolder.description}
                  onChange={(e) => setEditingFolder({ ...editingFolder, description: e.target.value })}
                  placeholder="Descripción breve"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editFolderSector">Sector</Label>
                <Select
                  value={editingFolder.sector}
                  onValueChange={(value) => setEditingFolder({ ...editingFolder, sector: value })}
                >
                  <SelectTrigger id="editFolderSector">
                    <SelectValue placeholder="Selecciona un sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector.id} value={sector.name ? sector.name : "default"}>
                        {sector.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditFolderDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditFolder}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar documento */}
      <Dialog open={openEditDocumentDialog} onOpenChange={setOpenEditDocumentDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Editar documento</DialogTitle>
            <DialogDescription>Modifica los detalles del documento</DialogDescription>
          </DialogHeader>
          {editingDocument && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="editDocumentName">Nombre</Label>
                  <Input
                    id="editDocumentName"
                    value={editingDocument.name}
                    onChange={(e) => setEditingDocument({ ...editingDocument, name: e.target.value })}
                    placeholder="Nombre del documento"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editDocumentFolder">Carpeta</Label>
                  <select
                    id="editDocumentFolder"
                    value={editingDocument.folderId}
                    onChange={(e) =>
                      setEditingDocument({ ...editingDocument, folderId: Number.parseInt(e.target.value) })
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {folders.map((folder) => (
                      <option key={folder.id} value={folder.id}>
                        {folder.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editDocumentContent">Contenido (Markdown)</Label>
                <Textarea
                  id="editDocumentContent"
                  value={editingDocument.content}
                  onChange={(e) => setEditingDocument({ ...editingDocument, content: e.target.value })}
                  className="min-h-[300px] font-mono"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditDocumentDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditDocument}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
