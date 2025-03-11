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
import { ClienteForm } from "@/components/forms/ClienteForm";
import { 
  FileText, 
  CreditCard, 
  History, 
  MessageSquare, 
  FileEdit, 
  Trash2,
  X
} from "lucide-react";

// Componente para mostrar la información general del cliente
function InformacionGeneral({ cliente }) {
  return (
    <div className="space-y-6 p-2 bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Nombre</h3>
          <p className="text-base font-semibold text-gray-900">{cliente.nombre}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Tipo de Cliente</h3>
          <p className="text-base font-semibold text-gray-900">{cliente.tipoCliente}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Tipo de Documento</h3>
          <p className="text-base font-semibold text-gray-900">{cliente.tipoDocumento || "No especificado"}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Número de Documento</h3>
          <p className="text-base font-semibold text-gray-900">{cliente.numeroDocumento || cliente.documento}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Dirección</h3>
          <p className="text-base font-semibold text-gray-900">{cliente.direccion || "No especificada"}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Ciudad</h3>
          <p className="text-base font-semibold text-gray-900">{cliente.ciudad}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Contacto</h3>
          <p className="text-base font-semibold text-gray-900">{cliente.contacto || "No especificado"}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
          <p className="text-base font-semibold text-gray-900">{cliente.telefono}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">Correo Electrónico</h3>
          <p className="text-base font-semibold text-gray-900">{cliente.email || "No especificado"}</p>
        </div>
      </div>
    </div>
  );
}

// Componente para mostrar las facturas del cliente
function Facturas() {
  return (
    <div className="space-y-6 p-2 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Facturas</h3>
        <Button size="sm" className="font-medium bg-blue-600 hover:bg-blue-700 text-white">
          <CreditCard className="h-4 w-4 mr-2" />
          Nueva Factura
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
              <td className="py-3 px-4 text-sm font-medium text-gray-900">F-001</td>
              <td className="py-3 px-4 text-sm text-gray-700">01/06/2023</td>
              <td className="py-3 px-4 text-sm font-medium text-gray-900">$1,200.00</td>
              <td className="py-3 px-4 text-sm">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-800">
                  Pagada
                </span>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4 text-sm font-medium text-gray-900">F-002</td>
              <td className="py-3 px-4 text-sm text-gray-700">15/07/2023</td>
              <td className="py-3 px-4 text-sm font-medium text-gray-900">$850.00</td>
              <td className="py-3 px-4 text-sm">
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-bold text-yellow-800">
                  Pendiente
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-gray-900">F-003</td>
              <td className="py-3 px-4 text-sm text-gray-700">10/08/2023</td>
              <td className="py-3 px-4 text-sm font-medium text-gray-900">$1,500.00</td>
              <td className="py-3 px-4 text-sm">
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-800">
                  Vencida
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente para mostrar el historial de actividades del cliente
function Historial() {
  return (
    <div className="space-y-6 p-2 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-bold text-gray-900">Historial de Actividades</h3>
      <div className="space-y-4">
        {[
          { fecha: "10/08/2023", hora: "14:30", accion: "Factura generada", usuario: "María García" },
          { fecha: "15/07/2023", hora: "10:15", accion: "Información actualizada", usuario: "Juan Pérez" },
          { fecha: "01/06/2023", hora: "09:45", accion: "Cliente registrado", usuario: "Ana Martínez" },
        ].map((item, index) => (
          <div key={index} className="flex items-start space-x-3 border-b pb-4">
            <div className="rounded-full bg-blue-100 p-2">
              <History className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                <span className="font-bold">{item.accion}</span> por {item.usuario}
              </p>
              <p className="text-xs font-medium text-gray-500">
                {item.fecha} a las {item.hora}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente para mostrar las notas del cliente
function Notas() {
  const [notas, setNotas] = useState([
    { fecha: "15/07/2023", texto: "Cliente solicitó información sobre nuevos servicios.", usuario: "Juan Pérez" },
    { fecha: "01/06/2023", texto: "Primera reunión con el cliente. Interesado en contratar servicios de consultoría.", usuario: "Ana Martínez" },
  ]);
  const [nuevaNota, setNuevaNota] = useState("");

  const agregarNota = () => {
    if (nuevaNota.trim()) {
      const fecha = new Date().toLocaleDateString();
      setNotas([
        { fecha, texto: nuevaNota, usuario: "Usuario Actual" },
        ...notas,
      ]);
      setNuevaNota("");
    }
  };

  return (
    <div className="space-y-6 p-2 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-bold text-gray-900">Notas</h3>
      <div className="flex space-x-2">
        <textarea
          className="flex-1 min-h-[100px] rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Agregar una nota..."
          value={nuevaNota}
          onChange={(e) => setNuevaNota(e.target.value)}
        />
        <Button onClick={agregarNota} className="self-end font-medium bg-blue-600 hover:bg-blue-700 text-white">
          <MessageSquare className="h-4 w-4 mr-2" />
          Agregar
        </Button>
      </div>
      <div className="space-y-4 mt-4">
        {notas.map((nota, index) => (
          <div key={index} className="rounded-md border-2 p-4 bg-white shadow-sm">
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium text-gray-900">{nota.texto}</p>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-500 hover:text-gray-700">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs font-medium text-gray-500 mt-2">
              {nota.usuario} - {nota.fecha}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClienteSheet({ cliente, children, onClienteUpdated }) {
  const [activeTab, setActiveTab] = useState("informacion");
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    if (window.confirm("¿Está seguro de que desea eliminar este cliente? Esta acción no se puede deshacer.")) {
      // Aquí iría la lógica para eliminar el cliente
      console.log("Cliente eliminado:", cliente);
      setIsOpen(false);
      onClienteUpdated && onClienteUpdated();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto bg-gray-50">
        <SheetHeader className="border-b bg-white shadow-sm pb-4">
          <SheetTitle className="text-xl font-bold text-gray-900">
            {isEditing ? "Editar Cliente" : cliente.nombre}
          </SheetTitle>
          <SheetDescription className="text-gray-600 font-medium">
            {isEditing 
              ? "Modifique la información del cliente y guarde los cambios." 
              : `ID: ${cliente.id} | Documento: ${cliente.documento}`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          {isEditing ? (
            <div className="px-6 py-4 bg-white rounded-lg shadow-sm mx-2">
              <ClienteForm 
                inDialog={true} 
                initialData={cliente} 
                onSuccess={() => {
                  setIsEditing(false);
                  onClienteUpdated && onClienteUpdated();
                }} 
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
                  <TabsTrigger value="facturas" className="flex-1 font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Facturas
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
                    <InformacionGeneral cliente={cliente} />
                  </TabsContent>
                  <TabsContent value="facturas">
                    <Facturas />
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