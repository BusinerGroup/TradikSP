import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Trash2, Eye } from "lucide-react";
import { LogisticoForm } from "@/components/forms/LogisticoForm";
import { LogisticoSheet } from "./LogisticoDrawer";
import { DynamicTable } from "@/components/tables/DynamicTable";
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
  
  const handleLogisticoUpdated = () => {
    console.log("Logístico actualizado, recargando datos...");
  };

  const handleNuevoLogisticoSuccess = () => {
    setNuevoLogisticoSheetOpen(false);
    console.log("Nuevo logístico guardado, recargando datos...");
  };

  // Definir las columnas para DynamicTable
  const columns = [
    { 
      key: 'nombreCompleto', 
      label: 'Apellidos y Nombres', 
      sortable: true,
      format: (_, item) => `${item.apellidos}, ${item.nombres}`
    },
    { 
      key: 'documento', 
      label: 'Documento', 
      sortable: true,
      format: (_, item) => `${item.tipoDocumento} ${item.numeroDocumento}`
    },
    { 
      key: 'categoria', 
      label: 'Categoría', 
      sortable: true 
    },
    { 
      key: 'telefono', 
      label: 'Teléfono', 
      sortable: true 
    },
    { 
      key: 'fechaIngreso', 
      label: 'Fecha Ingreso', 
      sortable: true,
      format: (value) => new Date(value).toLocaleDateString()
    }
  ];

  // Definir las acciones para DynamicTable
  const actions = [
    { 
      name: 'Ver', 
      icon: <Eye className="h-4 w-4" />, 
      onClick: (logistico) => {
        // Esta acción se maneja a través del componente LogisticoSheet
        // que ya está configurado en el renderizado
      },
      customRender: (logistico) => (
        <LogisticoSheet logistico={logistico} onSuccess={handleLogisticoUpdated}>
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
        </LogisticoSheet>
      )
    },
    { 
      name: 'Eliminar', 
      icon: <Trash2 className="h-4 w-4" />, 
      variant: 'ghost',
      className: 'text-red-600',
      onClick: (logistico) => {
        if (window.confirm(`¿Está seguro de que desea eliminar a ${logistico.nombres} ${logistico.apellidos}?`)) {
          console.log("Logístico eliminado:", logistico.id);
        }
      } 
    }
  ];

  // Filtrar datos según el término de búsqueda
  const filteredData = useMemo(() => {
    return logisticos.filter(logistico => 
      logistico.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      logistico.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      logistico.numeroDocumento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      logistico.telefono.toLowerCase().includes(searchTerm.toLowerCase()) ||
      logistico.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [logisticos, searchTerm]);

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
      
      <DynamicTable 
        columns={columns}
        data={filteredData}
        actions={actions}
        caption="Listado de personal logístico"
        searchPlaceholder="Buscar personal..."
        showSearch={false} // Desactivamos la búsqueda interna porque ya tenemos nuestro propio campo de búsqueda
        defaultItemsPerPage={10}
        itemsPerPageOptions={[5, 10, 20, 50]}
      />
    </div>
  );
} 