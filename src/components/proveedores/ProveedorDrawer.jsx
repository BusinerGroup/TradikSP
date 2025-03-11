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
import { ProveedorForm } from "@/components/forms/ProveedorForm";
import { 
  FileText, 
  CreditCard, 
  History, 
  MessageSquare, 
  FileEdit, 
  Trash2,
  X
} from "lucide-react";

// Componente para mostrar la información general del proveedor
function InformacionGeneral({ proveedor }) {
  return (
    <div className="space-y-6 p-2 bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Nombre</h3>
          <p className="text-base font-semibold text-gray-900">{proveedor.nombre}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Tipo de Proveedor</h3>
          <p className="text-base font-semibold text-gray-900">{proveedor.tipoProveedor}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Tipo de Documento</h3>
          <p className="text-base font-semibold text-gray-900">{proveedor.tipoDocumento || "No especificado"}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Número de Documento</h3>
          <p className="text-base font-semibold text-gray-900">{proveedor.numeroDocumento || proveedor.documento}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Dirección</h3>
          <p className="text-base font-semibold text-gray-900">{proveedor.direccion || "No especificada"}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Ciudad</h3>
          <p className="text-base font-semibold text-gray-900">{proveedor.ciudad}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Contacto</h3>
          <p className="text-base font-semibold text-gray-900">{proveedor.contacto || "No especificado"}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
          <p className="text-base font-semibold text-gray-900">{proveedor.telefono}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Correo Electrónico</h3>
          <p className="text-base font-semibold text-gray-900">{proveedor.email || "No especificado"}</p>
        </div>
      </div>
    </div>
  );
}

// Componente para mostrar las órdenes de compra del proveedor
function OrdenesCompra() {
  return (
    <div className="space-y-6 p-2 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Órdenes de Compra</h3>
        <Button size="sm" className="font-medium bg-blue-600 hover:bg-blue-700 text-white">
          <CreditCard className="h-4 w-4 mr-2" />
          Nueva Orden
        </Button>
      </div>
      <div className="rounded-md border-2 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 bg-gray-100">
              <th className="py-3 px-4 text-left text-sm font-bold text-gray-900">Número</th>
              <th className="py-3 px-4 text-left text-sm font-bold text-gray-900">Fecha</th>
              <th className="py-3 px-4 text-left text-sm font-bold text-gray-900">Monto</th>
              <th className="py-3 px-4 text-left text-sm font-bold text-gray-900">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-4 text-sm font-medium text-gray-900">OC-001</td>
              <td className="py-3 px-4 text-sm text-gray-700">01/06/2023</td>
              <td className="py-3 px-4 text-sm font-medium text-gray-900">$1,200.00</td>
              <td className="py-3 px-4 text-sm">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-800">
                  Completada
                </span>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4 text-sm font-medium text-gray-900">OC-002</td>
              <td className="py-3 px-4 text-sm text-gray-700">15/07/2023</td>
              <td className="py-3 px-4 text-sm font-medium text-gray-900">$850.00</td>
              <td className="py-3 px-4 text-sm">
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-bold text-yellow-800">
                  Pendiente
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-gray-900">OC-003</td>
              <td className="py-3 px-4 text-sm text-gray-700">30/08/2023</td>
              <td className="py-3 px-4 text-sm font-medium text-gray-900">$2,500.00</td>
              <td className="py-3 px-4 text-sm">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-800">
                  En proceso
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente para mostrar el historial de pagos
function Pagos() {
  return (
    <div className="space-y-6 p-2 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Historial de Pagos</h3>
        <Button size="sm" className="font-medium bg-blue-600 hover:bg-blue-700 text-white">
          <CreditCard className="h-4 w-4 mr-2" />
          Registrar Pago
        </Button>
      </div>
      <div className="rounded-md border-2 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 bg-gray-100">
              <th className="py-3 px-4 text-left text-sm font-bold text-gray-900">Referencia</th>
              <th className="py-3 px-4 text-left text-sm font-bold text-gray-900">Fecha</th>
              <th className="py-3 px-4 text-left text-sm font-bold text-gray-900">Monto</th>
              <th className="py-3 px-4 text-left text-sm font-bold text-gray-900">Método</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-4 text-sm font-medium text-gray-900">P-001</td>
              <td className="py-3 px-4 text-sm text-gray-700">15/06/2023</td>
              <td className="py-3 px-4 text-sm font-medium text-gray-900">$1,200.00</td>
              <td className="py-3 px-4 text-sm text-gray-700">Transferencia</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4 text-sm font-medium text-gray-900">P-002</td>
              <td className="py-3 px-4 text-sm text-gray-700">20/07/2023</td>
              <td className="py-3 px-4 text-sm font-medium text-gray-900">$850.00</td>
              <td className="py-3 px-4 text-sm text-gray-700">Cheque</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-gray-900">P-003</td>
              <td className="py-3 px-4 text-sm text-gray-700">05/09/2023</td>
              <td className="py-3 px-4 text-sm font-medium text-gray-900">$2,500.00</td>
              <td className="py-3 px-4 text-sm text-gray-700">Transferencia</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente para mostrar las notas del proveedor
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
            <span className="text-xs text-gray-500">01/01/2023</span>
          </div>
          <p className="text-sm text-gray-700">
            Reunión inicial con el proveedor para discutir términos de contrato y plazos de entrega.
            Se acordó un descuento del 5% para pedidos superiores a $1,000.
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-900">Cambio de contacto</h4>
            <span className="text-xs text-gray-500">15/03/2023</span>
          </div>
          <p className="text-sm text-gray-700">
            El proveedor ha cambiado su representante de ventas. 
            Nuevo contacto: Ana Martínez (ana.martinez@ejemplo.com)
          </p>
        </div>
      </div>
    </div>
  );
}

// Componente principal del drawer de proveedor
export function ProveedorSheet({ children, proveedor, onProveedorUpdated }) {
  const [activeTab, setActiveTab] = useState("informacion");
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleProveedorUpdated = () => {
    if (onProveedorUpdated) {
      onProveedorUpdated();
    }
    setIsEditing(false);
    setActiveTab("informacion");
  };

  const handleDelete = () => {
    if (window.confirm("¿Está seguro de que desea eliminar este proveedor? Esta acción no se puede deshacer.")) {
      // Aquí iría la lógica para eliminar el proveedor
      console.log("Proveedor eliminado:", proveedor);
      setIsOpen(false);
      onProveedorUpdated && onProveedorUpdated();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto bg-gray-50">
        <SheetHeader className="border-b bg-white shadow-sm pb-4">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-xl font-bold text-gray-900">
              {isEditing ? "Editar Proveedor" : proveedor.nombre}
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
          <SheetDescription className="text-gray-600">
            {isEditing 
              ? "Modifique la información del proveedor y guarde los cambios." 
              : `ID: ${proveedor.id} | Documento: ${proveedor.documento}`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          {isEditing ? (
            <div className="px-6 py-4 bg-white rounded-lg shadow-sm mx-2">
              <ProveedorForm 
                inDialog={true} 
                initialData={proveedor} 
                onSuccess={handleProveedorUpdated} 
              />
            </div>
          ) : (
            <Tabs defaultValue="informacion" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="informacion" className="text-xs sm:text-sm">
                  <FileText className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Información</span>
                </TabsTrigger>
                <TabsTrigger value="ordenes" className="text-xs sm:text-sm">
                  <CreditCard className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Órdenes</span>
                </TabsTrigger>
                <TabsTrigger value="pagos" className="text-xs sm:text-sm">
                  <History className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Pagos</span>
                </TabsTrigger>
                <TabsTrigger value="notas" className="text-xs sm:text-sm">
                  <MessageSquare className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Notas</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="informacion">
                <InformacionGeneral proveedor={proveedor} />
              </TabsContent>
              
              <TabsContent value="ordenes">
                <OrdenesCompra />
              </TabsContent>
              
              <TabsContent value="pagos">
                <Pagos />
              </TabsContent>
              
              <TabsContent value="notas">
                <Notas />
              </TabsContent>
            </Tabs>
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
