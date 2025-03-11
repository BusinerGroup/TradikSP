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
import { ProveedorForm } from "@/components/forms/ProveedorForm";
import { ProveedorSheet } from "./ProveedorDrawer";
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
const proveedoresData = [
  { 
    id: 1, 
    nombre: "Distribuidora XYZ", 
    tipoDocumento: "CIF",
    numeroDocumento: "A123456789", 
    telefono: "555-1234", 
    email: "contacto@distribuidoraxyz.com",
    ciudad: "Madrid", 
    contacto: "Juan Pérez",
    tipoProveedor: "Mayorista",
    direccion: "Calle Principal 123, Madrid, España"
  },
  { 
    id: 2, 
    nombre: "Suministros Industriales", 
    tipoDocumento: "CIF",
    numeroDocumento: "B987654321", 
    telefono: "555-5678", 
    email: "info@suministrosindustriales.com",
    ciudad: "Barcelona", 
    contacto: "María López",
    tipoProveedor: "Fabricante",
    direccion: "Avenida Central 456, Barcelona, España"
  },
  { 
    id: 3, 
    nombre: "Importadora Global", 
    tipoDocumento: "CIF",
    numeroDocumento: "C456789123", 
    telefono: "555-9012", 
    email: "contacto@importadoraglobal.com",
    ciudad: "Valencia", 
    contacto: "Ana Martínez",
    tipoProveedor: "Importador",
    direccion: "Plaza Mayor 789, Valencia, España"
  },
  { 
    id: 4, 
    nombre: "Tecnología Avanzada", 
    tipoDocumento: "CIF",
    numeroDocumento: "D789123456", 
    telefono: "555-3456", 
    email: "info@tecnologiaavanzada.com",
    ciudad: "Sevilla", 
    contacto: "Carlos Rodríguez",
    tipoProveedor: "Especializado",
    direccion: "Calle Tecnología 101, Sevilla, España"
  },
  { 
    id: 5, 
    nombre: "Materiales Construcción", 
    tipoDocumento: "CIF",
    numeroDocumento: "E321654987", 
    telefono: "555-7890", 
    email: "ventas@materialesconstruccion.com",
    ciudad: "Bilbao", 
    contacto: "Luis Fernández",
    tipoProveedor: "Mayorista",
    direccion: "Paseo Industrial 202, Bilbao, España"
  },
  { 
    id: 6, 
    nombre: "Servicios Logísticos", 
    tipoDocumento: "CIF",
    numeroDocumento: "F123789456", 
    telefono: "555-4567", 
    email: "info@servicioslogisticos.com",
    ciudad: "Madrid", 
    contacto: "Ana Sánchez",
    tipoProveedor: "Servicios",
    direccion: "Avenida Logística 303, Madrid, España"
  },
  { 
    id: 7, 
    nombre: "Productos Químicos", 
    tipoDocumento: "CIF",
    numeroDocumento: "G456123789", 
    telefono: "555-7891", 
    email: "contacto@productosquimicos.com",
    ciudad: "Barcelona", 
    contacto: "Pedro Gómez",
    tipoProveedor: "Fabricante",
    direccion: "Calle Química 404, Barcelona, España"
  },
];

export function ProveedoresTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [proveedores, setProveedores] = useState(proveedoresData);
  const [nuevoProveedorSheetOpen, setNuevoProveedorSheetOpen] = useState(false);
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

  // Filtrar y ordenar proveedores
  const filteredAndSortedProveedores = useMemo(() => {
    // Primero filtramos
    let tempProveedores = proveedores.filter(proveedor => 
      proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.numeroDocumento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.telefono.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.ciudad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.tipoProveedor.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Luego ordenamos si hay una configuración de ordenamiento
    if (sortConfig.key) {
      tempProveedores = [...tempProveedores].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return tempProveedores;
  }, [proveedores, searchTerm, sortConfig]);

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedProveedores.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedProveedores.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Resetear a la primera página cuando cambia el número de items por página
  };

  const handleProveedorUpdated = () => {
    // En una aplicación real, aquí se recargarían los datos desde el servidor
    console.log("Proveedor actualizado, recargando datos...");
  };

  const handleNuevoProveedorSuccess = () => {
    // Cerrar el sheet y actualizar la lista de proveedores
    setNuevoProveedorSheetOpen(false);
    // En una aplicación real, aquí se recargarían los datos desde el servidor
    console.log("Nuevo proveedor guardado, recargando datos...");
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
            placeholder="Buscar proveedores..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Sheet open={nuevoProveedorSheetOpen} onOpenChange={setNuevoProveedorSheetOpen}>
          <SheetTrigger asChild>
            <Button className="font-medium">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Proveedor
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto bg-gray-50">
            <SheetHeader className="border-b bg-white shadow-sm pb-4">
              <SheetTitle className="text-xl font-bold text-gray-900">
                Nuevo Proveedor
              </SheetTitle>
              <SheetDescription className="text-gray-600">
                Complete el formulario para registrar un nuevo proveedor.
              </SheetDescription>
            </SheetHeader>
            <div className="py-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ProveedorForm 
                  inDialog={true} 
                  onSuccess={handleNuevoProveedorSuccess} 
                />
              </div>
            </div>
            <SheetFooter className="fixed bottom-0 left-0 right-0 py-4 px-6 bg-white border-t">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  type="submit"
                  form="proveedorForm"
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
      
      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-bold cursor-pointer py-2" onClick={() => requestSort('nombre')}>
                <div className="flex items-center">
                  Nombre {getSortIcon('nombre')}
                </div>
              </TableHead>
              <TableHead className="font-bold cursor-pointer py-2" onClick={() => requestSort('numeroDocumento')}>
                <div className="flex items-center">
                  Documento {getSortIcon('numeroDocumento')}
                </div>
              </TableHead>
              <TableHead className="font-bold cursor-pointer py-2" onClick={() => requestSort('telefono')}>
                <div className="flex items-center">
                  Teléfono {getSortIcon('telefono')}
                </div>
              </TableHead>
              <TableHead className="font-bold cursor-pointer py-2" onClick={() => requestSort('ciudad')}>
                <div className="flex items-center">
                  Ciudad {getSortIcon('ciudad')}
                </div>
              </TableHead>
              <TableHead className="font-bold cursor-pointer py-2" onClick={() => requestSort('tipoProveedor')}>
                <div className="flex items-center">
                  Tipo {getSortIcon('tipoProveedor')}
                </div>
              </TableHead>
              <TableHead className="text-right font-bold py-2">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No se encontraron proveedores con los criterios de búsqueda.
                </TableCell>
              </TableRow>
            ) : (
              currentItems.map((proveedor) => (
                <TableRow key={proveedor.id}>
                  <TableCell className="font-medium py-1.5">{proveedor.nombre}</TableCell>
                  <TableCell className="py-1.5">{proveedor.numeroDocumento}</TableCell>
                  <TableCell className="py-1.5">{proveedor.telefono}</TableCell>
                  <TableCell className="py-1.5">{proveedor.ciudad}</TableCell>
                  <TableCell className="py-1.5">{proveedor.tipoProveedor}</TableCell>
                  <TableCell className="text-right py-1.5">
                    <div className="flex justify-end gap-2">
                      <ProveedorSheet 
                        proveedor={proveedor} 
                        onProveedorUpdated={handleProveedorUpdated}
                      >
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </ProveedorSheet>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          if (window.confirm("¿Está seguro de que desea eliminar este proveedor? Esta acción no se puede deshacer.")) {
                            // Aquí iría la lógica para eliminar el proveedor
                            console.log("Proveedor eliminado:", proveedor);
                            // En una aplicación real, aquí se recargarían los datos desde el servidor
                            handleProveedorUpdated();
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Mostrar</span>
          <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="w-16">
              <SelectValue placeholder={itemsPerPage} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-500">por página</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            // Mostrar páginas alrededor de la página actual
            let pageToShow;
            if (totalPages <= 5) {
              pageToShow = i + 1;
            } else if (currentPage <= 3) {
              pageToShow = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageToShow = totalPages - 4 + i;
            } else {
              pageToShow = currentPage - 2 + i;
            }
            
            return (
              <Button 
                key={pageToShow}
                variant={currentPage === pageToShow ? "default" : "outline"}
                size="icon"
                onClick={() => handlePageChange(pageToShow)}
              >
                {pageToShow}
              </Button>
            );
          })}
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
