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
import { LogisticoForm } from "@/components/forms/LogisticoForm";
import { LogisticoSheet } from "./LogisticoDrawer";
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
const logisticosData = [
  { 
    id: 1, 
    nombres: "Juan Carlos", 
    apellidos: "Pérez Rodríguez",
    tipoDocumento: "CC",
    numeroDocumento: "1234567890", 
    telefono: "555-1234", 
    email: "juan.perez@empresa.com",
    categoria: "Conductor",
    fechaIngreso: "2023-01-15",
    licenciaConduccion: "C2-123456",
    eps: "Nueva EPS",
    arl: "Positiva",
    ciudad: "Madrid",
    direccion: "Calle Principal 123",
    fechaNacimiento: "1985-06-20",
    contactoEmergencia: "María Pérez",
    telefonoEmergencia: "555-9876"
  },
  { 
    id: 2, 
    nombres: "Ana María", 
    apellidos: "López García",
    tipoDocumento: "CC",
    numeroDocumento: "0987654321", 
    telefono: "555-5678", 
    email: "ana.lopez@empresa.com",
    categoria: "Coordinador",
    fechaIngreso: "2022-08-10",
    licenciaConduccion: "",
    eps: "Sanitas",
    arl: "Sura",
    ciudad: "Barcelona",
    direccion: "Avenida Central 456",
    fechaNacimiento: "1990-03-15",
    contactoEmergencia: "Carlos López",
    telefonoEmergencia: "555-4321"
  },
  { 
    id: 3, 
    nombres: "Pedro José", 
    apellidos: "Martínez Sánchez",
    tipoDocumento: "CC",
    numeroDocumento: "5678901234", 
    telefono: "555-9012", 
    email: "pedro.martinez@empresa.com",
    categoria: "Almacenista",
    fechaIngreso: "2023-03-20",
    licenciaConduccion: "",
    eps: "Compensar",
    arl: "Colmena",
    ciudad: "Valencia",
    direccion: "Plaza Mayor 789",
    fechaNacimiento: "1988-12-10",
    contactoEmergencia: "Laura Martínez",
    telefonoEmergencia: "555-8765"
  }
];

export function LogisticosTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [logisticos, setLogisticos] = useState(logisticosData);
  const [nuevoLogisticoSheetOpen, setNuevoLogisticoSheetOpen] = useState(false);
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

  // Filtrar y ordenar logísticos
  const filteredAndSortedLogisticos = useMemo(() => {
    // Primero filtramos
    let tempLogisticos = logisticos.filter(logistico => 
      logistico.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      logistico.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      logistico.numeroDocumento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      logistico.telefono.toLowerCase().includes(searchTerm.toLowerCase()) ||
      logistico.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Luego ordenamos si hay una configuración de ordenamiento
    if (sortConfig.key) {
      tempLogisticos = [...tempLogisticos].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return tempLogisticos;
  }, [logisticos, searchTerm, sortConfig]);

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedLogisticos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedLogisticos.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handleLogisticoUpdated = () => {
    console.log("Logístico actualizado, recargando datos...");
  };

  const handleNuevoLogisticoSuccess = () => {
    setNuevoLogisticoSheetOpen(false);
    console.log("Nuevo logístico guardado, recargando datos...");
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
            placeholder="Buscar personal..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Sheet open={nuevoLogisticoSheetOpen} onOpenChange={setNuevoLogisticoSheetOpen}>
          <SheetTrigger asChild>
            <Button className="font-medium">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Personal
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto bg-gray-50">
            <SheetHeader className="border-b bg-white shadow-sm pb-4">
              <SheetTitle className="text-xl font-bold text-gray-900">
                Nuevo Personal
              </SheetTitle>
              <SheetDescription className="text-gray-600">
                Complete el formulario para registrar un nuevo personal logístico.
              </SheetDescription>
            </SheetHeader>
            <div className="py-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <LogisticoForm 
                  inDialog={true} 
                  onSuccess={handleNuevoLogisticoSuccess} 
                />
              </div>
            </div>
            <SheetFooter className="fixed bottom-0 left-0 right-0 py-4 px-6 bg-white border-t">
              <div className="flex justify-end gap-2">
                <Button
                  type="submit"
                  form="logisticoForm"
                  variant="outline"
                  size="sm"
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
              <TableHead className="font-bold cursor-pointer py-2" onClick={() => requestSort('apellidos')}>
                <div className="flex items-center">
                  Apellidos y Nombres {getSortIcon('apellidos')}
                </div>
              </TableHead>
              <TableHead className="font-bold cursor-pointer py-2" onClick={() => requestSort('numeroDocumento')}>
                <div className="flex items-center">
                  Documento {getSortIcon('numeroDocumento')}
                </div>
              </TableHead>
              <TableHead className="font-bold cursor-pointer py-2" onClick={() => requestSort('categoria')}>
                <div className="flex items-center">
                  Categoría {getSortIcon('categoria')}
                </div>
              </TableHead>
              <TableHead className="font-bold cursor-pointer py-2" onClick={() => requestSort('telefono')}>
                <div className="flex items-center">
                  Teléfono {getSortIcon('telefono')}
                </div>
              </TableHead>
              <TableHead className="font-bold cursor-pointer py-2" onClick={() => requestSort('fechaIngreso')}>
                <div className="flex items-center">
                  Fecha Ingreso {getSortIcon('fechaIngreso')}
                </div>
              </TableHead>
              <TableHead className="text-right font-bold py-2">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((logistico) => (
                <TableRow key={logistico.id}>
                  <TableCell className="py-1.5">{`${logistico.apellidos}, ${logistico.nombres}`}</TableCell>
                  <TableCell className="py-1.5">{`${logistico.tipoDocumento} ${logistico.numeroDocumento}`}</TableCell>
                  <TableCell className="py-1.5">{logistico.categoria}</TableCell>
                  <TableCell className="py-1.5">{logistico.telefono}</TableCell>
                  <TableCell className="py-1.5">{new Date(logistico.fechaIngreso).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right py-1.5">
                    <div className="flex justify-end gap-2">
                      <LogisticoSheet logistico={logistico} onSuccess={handleLogisticoUpdated}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </LogisticoSheet>
                      <Button variant="ghost" size="icon" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No se encontró personal
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      {filteredAndSortedLogisticos.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">
              Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredAndSortedLogisticos.length)} de {filteredAndSortedLogisticos.length} logísticos
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
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-700">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 