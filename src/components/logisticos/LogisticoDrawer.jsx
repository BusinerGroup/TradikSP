import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
import { LogisticoForm } from "@/components/forms/LogisticoForm";
import { 
  FileText, 
  CreditCard, 
  History, 
  MessageSquare, 
  FileEdit, 
  Trash2,
  X
} from "lucide-react";

// Componente para mostrar la información general del logístico
function InformacionGeneral({ logistico }) {
  return (
    <div className="space-y-6 p-2 bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Nombres</h3>
          <p className="text-base font-semibold text-gray-900">{logistico.nombres}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Apellidos</h3>
          <p className="text-base font-semibold text-gray-900">{logistico.apellidos}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Categoría</h3>
          <p className="text-base font-semibold text-gray-900">{logistico.categoria}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Tipo de Documento</h3>
          <p className="text-base font-semibold text-gray-900">{logistico.tipoDocumento}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Número de Documento</h3>
          <p className="text-base font-semibold text-gray-900">{logistico.numeroDocumento}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Fecha de Nacimiento</h3>
          <p className="text-base font-semibold text-gray-900">
            {new Date(logistico.fechaNacimiento).toLocaleDateString()}
          </p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Fecha de Ingreso</h3>
          <p className="text-base font-semibold text-gray-900">
            {new Date(logistico.fechaIngreso).toLocaleDateString()}
          </p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Dirección</h3>
          <p className="text-base font-semibold text-gray-900">{logistico.direccion}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Ciudad</h3>
          <p className="text-base font-semibold text-gray-900">{logistico.ciudad}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
          <p className="text-base font-semibold text-gray-900">{logistico.telefono}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Correo Electrónico</h3>
          <p className="text-base font-semibold text-gray-900">{logistico.email}</p>
        </div>
        {logistico.licenciaConduccion && (
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500">Licencia de Conducción</h3>
            <p className="text-base font-semibold text-gray-900">{logistico.licenciaConduccion}</p>
          </div>
        )}
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">EPS</h3>
          <p className="text-base font-semibold text-gray-900">{logistico.eps}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">ARL</h3>
          <p className="text-base font-semibold text-gray-900">{logistico.arl}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Contacto de Emergencia</h3>
          <p className="text-base font-semibold text-gray-900">{logistico.contactoEmergencia}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Teléfono de Emergencia</h3>
          <p className="text-base font-semibold text-gray-900">{logistico.telefonoEmergencia}</p>
        </div>
      </div>
    </div>
  );
}

// Componente para mostrar las asignaciones
function Asignaciones() {
  return (
    <div className="space-y-6 p-2 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Asignaciones</h3>
        <Button size="sm" className="font-medium bg-blue-600 hover:bg-blue-700 text-white">
          <CreditCard className="h-4 w-4 mr-2" />
          Nueva Asignación
        </Button>
      </div>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-900">Proyecto ABC</h4>
            <span className="text-xs text-gray-500">En Progreso</span>
          </div>
          <p className="text-sm text-gray-700">
            Asignado como conductor principal para entregas en la zona norte.
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-900">Operación XYZ</h4>
            <span className="text-xs text-gray-500">Completado</span>
          </div>
          <p className="text-sm text-gray-700">
            Coordinación de inventario en almacén central.
          </p>
        </div>
      </div>
    </div>
  );
}

// Componente para mostrar los servicios del logístico
function Servicios() {
  return (
    <div className="space-y-6 p-2 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Servicios</h3>
        <Button size="sm" className="font-medium bg-blue-600 hover:bg-blue-700 text-white">
          <CreditCard className="h-4 w-4 mr-2" />
          Nuevo Servicio
        </Button>
      </div>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-900">Transporte Nacional</h4>
            <span className="text-xs text-gray-500">Activo</span>
          </div>
          <p className="text-sm text-gray-700">
            Servicio de transporte terrestre a nivel nacional con cobertura en las principales ciudades.
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-900">Almacenamiento</h4>
            <span className="text-xs text-gray-500">Activo</span>
          </div>
          <p className="text-sm text-gray-700">
            Servicio de almacenamiento y gestión de inventarios en bodegas climatizadas.
          </p>
        </div>
      </div>
    </div>
  );
}

// Componente para mostrar el historial
function Historial() {
  return (
    <div className="space-y-6 p-2 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Historial de Servicios</h3>
      </div>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-900">Transporte de Mercancía</h4>
            <span className="text-xs text-gray-500">15/03/2024</span>
          </div>
          <p className="text-sm text-gray-700">
            Entrega exitosa de mercancía en Madrid. Cliente: Empresa ABC
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-900">Almacenamiento</h4>
            <span className="text-xs text-gray-500">10/03/2024</span>
          </div>
          <p className="text-sm text-gray-700">
            Inicio de servicio de almacenamiento. Cliente: XYZ Corp
          </p>
        </div>
      </div>
    </div>
  );
}

// Componente para mostrar las notas
function Notas() {
  return (
    <div className="space-y-6 p-2 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Notas</h3>
        <Button size="sm" className="font-medium bg-blue-600 hover:bg-blue-700 text-white">
          <MessageSquare className="h-4 w-4 mr-2" />
          Nueva Nota
        </Button>
      </div>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-900">Reunión inicial</h4>
            <span className="text-xs text-gray-500">01/03/2024</span>
          </div>
          <p className="text-sm text-gray-700">
            Reunión inicial con el logístico para discutir términos de servicio y plazos de entrega.
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-900">Actualización de tarifas</h4>
            <span className="text-xs text-gray-500">15/02/2024</span>
          </div>
          <p className="text-sm text-gray-700">
            Se acordó nueva estructura de tarifas para servicios de transporte internacional.
          </p>
        </div>
      </div>
    </div>
  );
}

// Componente principal del drawer de logístico
export function LogisticoSheet({ logistico, children, onSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("informacion");

  const handleLogisticoUpdated = () => {
    setIsEditing(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto bg-gray-50"
      >
        <SheetHeader className="border-b bg-white shadow-sm pb-4">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-xl font-bold text-gray-900">
              {isEditing ? "Editar Personal" : "Detalles del Personal"}
            </SheetTitle>
          </div>
          <SheetDescription className="text-gray-600">
            {isEditing 
              ? "Modifique los datos del personal según sea necesario." 
              : "Información detallada del personal y sus asignaciones."}
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          {isEditing ? (
            <div className="px-6 py-4 bg-white rounded-lg shadow-sm mx-2">
              <LogisticoForm 
                inDialog={true} 
                initialData={logistico} 
                onSuccess={handleLogisticoUpdated} 
              />
            </div>
          ) : (
            <div className="px-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
                <TabsList className="w-full grid grid-cols-4 h-12 bg-white shadow-sm">
                  <TabsTrigger value="informacion" className="flex-1 font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                    <FileText className="h-4 w-4 mr-2" />
                    Información
                  </TabsTrigger>
                  <TabsTrigger value="asignaciones" className="flex-1 font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Asignaciones
                  </TabsTrigger>
                  <TabsTrigger value="historial" className="flex-1 font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                    <History className="h-4 w-4 mr-2" />
                    Historial
                  </TabsTrigger>
                  <TabsTrigger value="notas" className="flex-1 font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Notas
                  </TabsTrigger>
                </TabsList>
                <div className="mt-6 pb-4">
                  <TabsContent value="informacion">
                    <InformacionGeneral logistico={logistico} />
                  </TabsContent>
                  <TabsContent value="asignaciones">
                    <Asignaciones />
                  </TabsContent>
                  <TabsContent value="historial">
                    <Historial />
                  </TabsContent>
                  <TabsContent value="notas">
                    <Notas />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          )}
        </div>

        {!isEditing && (
          <SheetFooter className="fixed bottom-0 left-0 right-0 py-4 px-6 bg-white border-t">
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="bg-white hover:bg-blue-50 text-blue-600"
              >
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white hover:bg-red-50 text-red-600"
              >
                Eliminar
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
        )}
      </SheetContent>
    </Sheet>
  );
} 