import { useState, useMemo } from "react";
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
import { Search, Plus, Trash2, Eye, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { ClienteForm } from "@/components/forms/ClienteForm";
import { ClienteSheet } from "./ClienteDrawer";
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

// Datos de ejemplo para la tabla
const clientesData = [
  { 
    id: 1, 
    nombre: "Empresa ABC", 
    tipoDocumento: "CIF",
    numeroDocumento: "A123456789", 
    telefono: "555-1234", 
    email: "contacto@empresaabc.com",
    ciudad: "Madrid", 
    contacto: "Juan Pérez",
    tipoCliente: "Corporativo",
    direccion: "Calle Principal 123, Madrid, España"
  },
  { 
    id: 2, 
    nombre: "Juan Pérez", 
    tipoDocumento: "NIF",
    numeroDocumento: "B987654321", 
    telefono: "555-5678", 
    email: "juan.perez@ejemplo.com",
    ciudad: "Barcelona", 
    contacto: "María López",
    tipoCliente: "Individual",
    direccion: "Avenida Central 456, Barcelona, España"
  },
  { 
    id: 3, 
    nombre: "Ministerio de Educación", 
    tipoDocumento: "CIF",
    numeroDocumento: "C456789123", 
    telefono: "555-9012", 
    email: "info@educacion.gob.es",
    ciudad: "Valencia", 
    contacto: "Ana Martínez",
    tipoCliente: "Gubernamental",
    direccion: "Plaza Mayor 789, Valencia, España"
  },
  { 
    id: 4, 
    nombre: "Universidad Central", 
    tipoDocumento: "CIF",
    numeroDocumento: "D789123456", 
    telefono: "555-3456", 
    email: "info@universidadcentral.edu",
    ciudad: "Sevilla", 
    contacto: "Carlos Rodríguez",
    tipoCliente: "Educativo",
    direccion: "Calle Universidad 101, Sevilla, España"
  },
  { 
    id: 5, 
    nombre: "María García", 
    tipoDocumento: "NIF",
    numeroDocumento: "E321654987", 
    telefono: "555-7890", 
    email: "maria.garcia@ejemplo.com",
    ciudad: "Bilbao", 
    contacto: "Luis Fernández",
    tipoCliente: "Individual",
    direccion: "Paseo del Mar 202, Bilbao, España"
  },
  { 
    id: 6, 
    nombre: "Carlos Rodríguez", 
    tipoDocumento: "NIF",
    numeroDocumento: "F123789456", 
    telefono: "555-4567", 
    email: "carlos.rodriguez@ejemplo.com",
    ciudad: "Madrid", 
    contacto: "Ana Sánchez",
    tipoCliente: "Individual",
    direccion: "Avenida Principal 303, Madrid, España"
  },
  { 
    id: 7, 
    nombre: "Empresa XYZ", 
    tipoDocumento: "CIF",
    numeroDocumento: "G456123789", 
    telefono: "555-7891", 
    email: "info@empresaxyz.com",
    ciudad: "Barcelona", 
    contacto: "Pedro Gómez",
    tipoCliente: "Corporativo",
    direccion: "Calle Comercial 404, Barcelona, España"
  },
  { 
    id: 8, 
    nombre: "Ana Martínez", 
    tipoDocumento: "NIF",
    numeroDocumento: "H789456123", 
    telefono: "555-1235", 
    email: "ana.martinez@ejemplo.com",
    ciudad: "Valencia", 
    contacto: "Carlos Rodríguez",
    tipoCliente: "Individual",
    direccion: "Plaza Central 505, Valencia, España"
  },
  { 
    id: 9, 
    nombre: "Colegio San José", 
    tipoDocumento: "CIF",
    numeroDocumento: "I321987654", 
    telefono: "555-5679", 
    email: "info@colegiosanjose.edu",
    ciudad: "Sevilla", 
    contacto: "Ana Sánchez",
    tipoCliente: "Educativo",
    direccion: "Calle Educación 606, Sevilla, España"
  },
  { 
    id: 10, 
    nombre: "Luis Sánchez", 
    tipoDocumento: "NIF",
    numeroDocumento: "J654321987", 
    telefono: "555-9013", 
    email: "luis.sanchez@ejemplo.com",
    ciudad: "Bilbao", 
    contacto: "María García",
    tipoCliente: "Individual",
    direccion: "Avenida Marina 707, Bilbao, España"
  },
  { 
    id: 11, 
    nombre: "Ayuntamiento de Madrid", 
    tipoDocumento: "CIF",
    numeroDocumento: "K987654321", 
    telefono: "555-3457", 
    email: "info@ayuntamientomadrid.es",
    ciudad: "Madrid", 
    contacto: "Ana Martínez",
    tipoCliente: "Gubernamental",
    direccion: "Plaza Mayor 808, Madrid, España"
  },
  { 
    id: 12, 
    nombre: "Elena López", 
    tipoDocumento: "NIF",
    numeroDocumento: "L654789123", 
    telefono: "555-7892", 
    email: "elena.lopez@ejemplo.com",
    ciudad: "Barcelona", 
    contacto: "Pedro Gómez",
    tipoCliente: "Individual",
    direccion: "Calle Diagonal 909, Barcelona, España"
  },
];

export function ClientesTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clientes, setClientes] = useState(clientesData);
  const [nuevoClienteSheetOpen, setNuevoClienteSheetOpen] = useState(false);
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

  // Filtrar y ordenar clientes
  const filteredAndSortedClientes = useMemo(() => {
    // Primero filtramos
    let tempClientes = clientes.filter(cliente => 
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.numeroDocumento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefono.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.ciudad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.tipoCliente.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Luego ordenamos si hay una configuración de ordenamiento
    if (sortConfig.key) {
      tempClientes = [...tempClientes].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return tempClientes;
  }, [clientes, searchTerm, sortConfig]);

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedClientes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedClientes.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Resetear a la primera página cuando cambia el número de items por página
  };

  const handleClienteUpdated = () => {
    // En una aplicación real, aquí se recargarían los datos desde el servidor
    console.log("Cliente actualizado, recargando datos...");
  };

  const handleNuevoClienteSuccess = () => {
    // Cerrar el sheet y actualizar la lista de clientes
    setNuevoClienteSheetOpen(false);
    // En una aplicación real, aquí se recargarían los datos desde el servidor
    console.log("Nuevo cliente guardado, recargando datos...");
  };

  // Función para obtener el ícono de ordenamiento
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' 
        ? <ArrowUpDown className="h-4 w-4 ml-1 text-blue-600" /> 
        : <ArrowUpDown className="h-4 w-4 ml-1 text-blue-600 rotate-180" />;
    }
    return <ArrowUpDown className="h-4 w-4 ml-1 opacity-30" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar clientes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Sheet open={nuevoClienteSheetOpen} onOpenChange={setNuevoClienteSheetOpen}>
          <SheetTrigger asChild>
            <Button className="font-medium">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Cliente
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto bg-gray-50">
            <SheetHeader className="border-b bg-white shadow-sm pb-4">
              <SheetTitle className="text-xl font-bold text-gray-900">
                Nuevo Cliente
              </SheetTitle>
              <SheetDescription className="text-gray-600 font-medium">
                Complete el formulario para registrar un nuevo cliente en el sistema.
              </SheetDescription>
            </SheetHeader>
            
            <div className="py-6 px-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ClienteForm 
                  inDialog={true} 
                  onSuccess={handleNuevoClienteSuccess} 
                />
              </div>
            </div>
            <SheetFooter className="fixed bottom-0 left-0 right-0 py-4 px-6 bg-white border-t">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  type="submit"
                  form="clienteForm"
                  className="bg-white hover:bg-blue-50 text-blue-600"
                >
                  Guardar
                </Button>
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white hover:bg-gray-100"
                  >
                    Cancelar
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="rounded-md border-2 overflow-hidden">
        <Table>
          <TableCaption>Listado de clientes registrados</TableCaption>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead 
                className="font-bold cursor-pointer py-2"
                onClick={() => requestSort('nombre')}
              >
                <div className="flex items-center">
                  Nombre
                  {getSortIcon('nombre')}
                </div>
              </TableHead>
              <TableHead 
                className="font-bold cursor-pointer py-2"
                onClick={() => requestSort('numeroDocumento')}
              >
                <div className="flex items-center">
                  Documento
                  {getSortIcon('numeroDocumento')}
                </div>
              </TableHead>
              <TableHead 
                className="font-bold cursor-pointer py-2"
                onClick={() => requestSort('telefono')}
              >
                <div className="flex items-center">
                  Teléfono
                  {getSortIcon('telefono')}
                </div>
              </TableHead>
              <TableHead 
                className="font-bold cursor-pointer py-2"
                onClick={() => requestSort('ciudad')}
              >
                <div className="flex items-center">
                  Ciudad
                  {getSortIcon('ciudad')}
                </div>
              </TableHead>
              <TableHead 
                className="font-bold cursor-pointer py-2"
                onClick={() => requestSort('tipoCliente')}
              >
                <div className="flex items-center">
                  Tipo
                  {getSortIcon('tipoCliente')}
                </div>
              </TableHead>
              <TableHead className="text-right font-bold py-2">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell className="font-medium py-1.5">{cliente.nombre}</TableCell>
                  <TableCell className="py-1.5">{cliente.numeroDocumento}</TableCell>
                  <TableCell className="py-1.5">{cliente.telefono}</TableCell>
                  <TableCell className="py-1.5">{cliente.ciudad}</TableCell>
                  <TableCell className="py-1.5">{cliente.tipoCliente}</TableCell>
                  <TableCell className="text-right py-1.5">
                    <div className="flex justify-end gap-2">
                      <ClienteSheet 
                        cliente={cliente}
                        onClienteUpdated={handleClienteUpdated}
                      >
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                      </ClienteSheet>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          if (window.confirm("¿Está seguro de que desea eliminar este cliente? Esta acción no se puede deshacer.")) {
                            // Aquí iría la lógica para eliminar el cliente
                            console.log("Cliente eliminado:", cliente);
                            // En una aplicación real, aquí se recargarían los datos desde el servidor
                            handleClienteUpdated();
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No se encontraron clientes
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      {filteredAndSortedClientes.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">
              Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredAndSortedClientes.length)} de {filteredAndSortedClientes.length} clientes
            </span>
            <div className="flex items-center space-x-2">
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
              <span className="text-sm text-gray-700">por página</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
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
              // Mostrar 5 páginas como máximo
              let pageNum;
              if (totalPages <= 5) {
                // Si hay 5 o menos páginas, mostrarlas todas
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                // Si estamos en las primeras 3 páginas, mostrar 1-5
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                // Si estamos en las últimas 3 páginas, mostrar las últimas 5
                pageNum = totalPages - 4 + i;
              } else {
                // En otro caso, mostrar 2 antes y 2 después de la página actual
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className="h-8 w-8 p-0"
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