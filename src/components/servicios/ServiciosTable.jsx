import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Trash2, Eye, ArrowUpDown, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { ServicioForm } from "@/components/forms/ServicioForm";
import { ServicioSheet } from "./ServicioDrawer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ServicioDetalle } from "./ServicioDetalle";
import { NuevoServicioDrawer } from "./NuevoServicioDrawer";

// Datos de ejemplo para la tabla
const serviciosData = [
  { 
    id: 1,
    numeroSS: "SS-2024-001",
    fechaSolicitud: "2024-03-15",
    fechaMontaje: "2024-03-20T14:00:00",
    cliente: "Empresa ABC",
    evento: "Lanzamiento Producto X",
    valor: 15000000,
    facturaRemision: "F", // F: Factura, R: Remisión
    numeroFactura: "FACT-2024-001",
    estado: "En Proceso", // Pendiente, En Proceso, Ejecutado, Facturado, Cancelado
    // Datos adicionales
    costosProduccion: 8000000,
    abonos: 7500000,
    saldo: 7500000,
    coordinador: "Ana Martínez",
    // Campos de control
    createdAt: "2024-03-15T10:30:00",
    updatedAt: "2024-03-15T10:30:00"
  },
  { 
    id: 2,
    numeroSS: "SS-2024-002",
    fechaSolicitud: "2024-03-16",
    fechaMontaje: "2024-03-25T09:00:00",
    cliente: "Universidad Central",
    evento: "Graduación 2024",
    valor: 8500000,
    facturaRemision: "R",
    numeroFactura: "REM-2024-001",
    estado: "Pendiente",
    costosProduccion: 4500000,
    abonos: 4250000,
    saldo: 4250000,
    coordinador: "Carlos Rodríguez",
    createdAt: "2024-03-16T11:15:00",
    updatedAt: "2024-03-16T11:15:00"
  }
];

export function ServiciosTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [servicios, setServicios] = useState(serviciosData);
  const [nuevoServicioSheetOpen, setNuevoServicioSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("formulario");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Función para ordenar
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filtrar y ordenar servicios
  const filteredAndSortedServicios = useMemo(() => {
    let tempServicios = servicios.filter(servicio => 
      servicio.numeroSS.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servicio.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servicio.evento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servicio.estado.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (sortConfig.key) {
      tempServicios = [...tempServicios].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return tempServicios;
  }, [servicios, searchTerm, sortConfig]);

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedServicios.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedServicios.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handleServicioUpdated = () => {
    console.log("Servicio actualizado, recargando datos...");
  };

  const handleNuevoServicioSuccess = () => {
    console.log("Nuevo servicio guardado, recargando datos...");
    setNuevoServicioSheetOpen(false);
    // Aquí iría la lógica para recargar los datos desde la API
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' 
        ? <ArrowUpDown className="h-4 w-4 ml-1 text-blue-600" /> 
        : <ArrowUpDown className="h-4 w-4 ml-1 text-blue-600 rotate-180" />;
    }
    return <ArrowUpDown className="h-4 w-4 ml-1 opacity-30" />;
  };

  // Función para formatear moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Función para formatear fecha y hora
  const formatDateTime = (dateTimeStr) => {
    return new Date(dateTimeStr).toLocaleString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNumeroSS = (numeroSS) => {
    // Si el número viene en formato SS-YYYY-XXX, extraer solo los últimos 3 dígitos
    const match = numeroSS.match(/SS-\d{4}-(\d{3})$/);
    if (match) {
      return match[1].padStart(5, '0');
    }
    // Si es solo números, mostrar los 5 dígitos
    return numeroSS.replace(/\D/g, '').padStart(5, '0');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por Nº SS, cliente o evento..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <NuevoServicioDrawer onSuccess={handleNuevoServicioSuccess} />
      </div>
      
      <div className="rounded-md border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="font-bold cursor-pointer py-4 px-4" onClick={() => requestSort('fechaMontaje')}>
                <div className="flex items-center">
                  Fecha Montaje {getSortIcon('fechaMontaje')}
                </div>
              </TableHead>
              <TableHead className="font-bold cursor-pointer py-4 px-4" onClick={() => requestSort('numeroSS')}>
                <div className="flex items-center">
                  Nº SS {getSortIcon('numeroSS')}
                </div>
              </TableHead>
              <TableHead className="font-bold cursor-pointer py-4 px-4" onClick={() => requestSort('cliente')}>
                <div className="flex items-center">
                  Cliente {getSortIcon('cliente')}
                </div>
              </TableHead>
              <TableHead className="font-bold cursor-pointer py-4 px-4" onClick={() => requestSort('evento')}>
                <div className="flex items-center whitespace-nowrap">
                  Evento {getSortIcon('evento')}
                </div>
              </TableHead>
              <TableHead className="font-bold cursor-pointer py-4 px-4 text-right" onClick={() => requestSort('valor')}>
                <div className="flex items-center justify-end">
                  Valor {getSortIcon('valor')}
                </div>
              </TableHead>
              <TableHead className="font-bold cursor-pointer py-4 px-4 text-center" onClick={() => requestSort('facturaRemision')}>
                <div className="flex items-center justify-center">
                  F/R {getSortIcon('facturaRemision')}
                </div>
              </TableHead>
              <TableHead className="font-bold cursor-pointer py-4 px-4" onClick={() => requestSort('numeroFactura')}>
                <div className="flex items-center">
                  NºFact {getSortIcon('numeroFactura')}
                </div>
              </TableHead>
              <TableHead className="font-bold cursor-pointer py-4 px-4" onClick={() => requestSort('estado')}>
                <div className="flex items-center">
                  Estado {getSortIcon('estado')}
                </div>
              </TableHead>
              <TableHead className="text-right font-bold py-4 px-4">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((servicio) => (
                <TableRow key={servicio.id} className="hover:bg-gray-50">
                  <TableCell className="py-3 px-4">
                    {formatDateTime(servicio.fechaMontaje)}
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    {formatNumeroSS(servicio.numeroSS)}
                  </TableCell>
                  <TableCell className="py-3 px-4" title={servicio.cliente}>
                    {servicio.cliente}
                  </TableCell>
                  <TableCell className="py-3 px-4" title={servicio.evento}>
                    {servicio.evento}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-right">
                    {formatCurrency(servicio.valor)}
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      servicio.facturaRemision === 'F' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {servicio.facturaRemision}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    {servicio.numeroFactura}
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      servicio.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                      servicio.estado === 'En Proceso' ? 'bg-blue-100 text-blue-800' :
                      servicio.estado === 'Ejecutado' ? 'bg-green-100 text-green-800' :
                      servicio.estado === 'Facturado' ? 'bg-purple-100 text-purple-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {servicio.estado}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <ServicioSheet 
                        servicio={servicio} 
                        onServicioUpdated={handleServicioUpdated}
                      >
                        <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                          <Eye className="h-4 w-4 text-blue-600" />
                        </Button>
                      </ServicioSheet>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="hover:bg-red-50"
                        onClick={() => {
                          if (window.confirm("¿Está seguro de que desea eliminar este servicio? Esta acción no se puede deshacer.")) {
                            console.log("Servicio eliminado:", servicio);
                            handleServicioUpdated();
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                  No se encontraron servicios
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación mejorada */}
      {filteredAndSortedServicios.length > 0 && (
        <div className="flex items-center justify-between bg-white px-4 py-3 border rounded-md">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">
              Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredAndSortedServicios.length)}</span> de{" "}
              <span className="font-medium">{filteredAndSortedServicios.length}</span> servicios
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Mostrar</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={handleItemsPerPageChange}
              >
                <SelectTrigger className="w-[70px] h-8">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className={`h-8 w-8 p-0 ${
                    currentPage === pageNum 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 