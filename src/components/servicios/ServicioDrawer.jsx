import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ServicioSheet({ children, servicio, onServicioUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

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
    // Si el número viene en formato SS-YYYY-XXX, mantener el año y los 5 dígitos
    const match = numeroSS.match(/SS-(\d{4})-(\d{3})$/);
    if (match) {
      const [_, year, number] = match;
      return `${year}-${number.padStart(5, '0')}`;
    }
    // Si es solo números, usar el año actual
    const currentYear = new Date().getFullYear();
    const digits = numeroSS.replace(/\D/g, '').slice(0, 5);
    return `${currentYear}-${digits.padStart(5, '0')}`;
  };

  // Componente para la pestaña de Información General
  function InformacionGeneral() {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Nº SS</label>
            <div className="mt-1">{formatNumeroSS(servicio.numeroSS)}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Cliente</label>
            <div className="mt-1">{servicio.cliente}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Evento</label>
            <div className="mt-1">{servicio.evento}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Fecha Solicitud</label>
            <div className="mt-1">{new Date(servicio.fechaSolicitud).toLocaleDateString()}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Fecha/Hora Montaje</label>
            <div className="mt-1">{formatDateTime(servicio.fechaMontaje)}</div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Valor Total</label>
            <div className="mt-1 font-semibold text-green-600">{formatCurrency(servicio.valor)}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Costos de Producción</label>
            <div className="mt-1 text-red-600">{formatCurrency(servicio.costosProduccion)}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Abonos</label>
            <div className="mt-1 text-blue-600">{formatCurrency(servicio.abonos)}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Saldo</label>
            <div className="mt-1 font-semibold">{formatCurrency(servicio.saldo)}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Coordinador</label>
            <div className="mt-1">{servicio.coordinador}</div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div>
              <label className="text-sm font-medium text-gray-700">Estado</label>
              <div className="mt-1">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  servicio.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                  servicio.estado === 'En Proceso' ? 'bg-blue-100 text-blue-800' :
                  servicio.estado === 'Ejecutado' ? 'bg-green-100 text-green-800' :
                  servicio.estado === 'Facturado' ? 'bg-purple-100 text-purple-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {servicio.estado}
                </span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Tipo Documento</label>
              <div className="mt-1">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  servicio.facturaRemision === 'F' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {servicio.facturaRemision === 'F' ? 'Factura' : 'Remisión'}
                </span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Nº Documento</label>
              <div className="mt-1 font-medium">{servicio.numeroFactura || 'Pendiente'}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Componente para la pestaña de Planeador
  function Planeador() {
    const planeadorData = [
      {
        id: 1,
        item: "Montaje",
        detalle: "Montaje de tarima 6x4",
        unidad: "Unidad",
        valorUnitario: 2500000,
        cantidad: 1,
        totalItem: 2500000,
        responsable: "Juan Pérez",
        costo: 1500000,
        documentoCobro: "FACT-001",
        plazoPago: "30 días"
      },
      {
        id: 2,
        item: "Sonido",
        detalle: "Sistema line array 12000W",
        unidad: "Sistema",
        valorUnitario: 3500000,
        cantidad: 1,
        totalItem: 3500000,
        responsable: "Ana Martínez",
        costo: 2000000,
        documentoCobro: "FACT-002",
        plazoPago: "15 días"
      }
    ];

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Planeador de Servicio</h3>
          <Button size="sm">
            Agregar Item
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-bold">Item</TableHead>
                <TableHead className="font-bold">Detalle</TableHead>
                <TableHead className="font-bold">Unidad</TableHead>
                <TableHead className="font-bold text-right">Valor Unit.</TableHead>
                <TableHead className="font-bold text-right">Total</TableHead>
                <TableHead className="font-bold">Responsable</TableHead>
                <TableHead className="font-bold text-right">Costo</TableHead>
                <TableHead className="font-bold">Doc. Cobro</TableHead>
                <TableHead className="font-bold">Plazo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {planeadorData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.item}</TableCell>
                  <TableCell>{item.detalle}</TableCell>
                  <TableCell>{item.unidad}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.valorUnitario)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(item.totalItem)}</TableCell>
                  <TableCell>{item.responsable}</TableCell>
                  <TableCell className="text-right text-red-600">{formatCurrency(item.costo)}</TableCell>
                  <TableCell>{item.documentoCobro}</TableCell>
                  <TableCell>{item.plazoPago}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <div>
            <span className="text-sm text-gray-500">Total Planeado:</span>
            <span className="ml-2 font-semibold">{formatCurrency(6000000)}</span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Total Costos:</span>
            <span className="ml-2 font-semibold text-red-600">{formatCurrency(3500000)}</span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Margen:</span>
            <span className="ml-2 font-semibold text-green-600">{formatCurrency(2500000)}</span>
          </div>
        </div>
      </div>
    );
  }

  // Componente para la pestaña de Bitácora
  function Bitacora() {
    const bitacoraData = [
      {
        id: 1,
        fecha: "2024-03-15T10:30:00",
        novedad: "Solicitud inicial del servicio",
        responsable: "Ana Martínez"
      },
      {
        id: 2,
        fecha: "2024-03-16T15:45:00",
        novedad: "Confirmación de disponibilidad de equipos",
        responsable: "Carlos Rodríguez"
      }
    ];

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Bitácora de Servicio</h3>
          <Button size="sm">
            Nueva Entrada
          </Button>
        </div>
        <div className="space-y-4">
          {bitacoraData.map((entrada) => (
            <div key={entrada.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    {formatDateTime(entrada.fecha)}
                  </p>
                  <p className="text-gray-900">{entrada.novedad}</p>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {entrada.responsable}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="flex flex-col w-full sm:max-w-md md:max-w-xl lg:max-w-4xl xl:max-w-5xl overflow-y-auto bg-gray-50"
      >
        <SheetHeader className="border-b bg-white shadow-sm pb-4">
          <SheetTitle className="text-xl font-bold text-gray-900">
            Detalle del Servicio
          </SheetTitle>
          <SheetDescription className="text-gray-600">
            {formatNumeroSS(servicio.numeroSS)} - {servicio.evento}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start bg-white border-b rounded-none h-12 space-x-8">
              <TabsTrigger value="general" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                Información General
              </TabsTrigger>
              <TabsTrigger value="planeador" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                Planeador
              </TabsTrigger>
              <TabsTrigger value="bitacora" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                Bitácora
              </TabsTrigger>
            </TabsList>
            <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
              <TabsContent value="general">
                <InformacionGeneral />
              </TabsContent>
              <TabsContent value="planeador">
                <Planeador />
              </TabsContent>
              <TabsContent value="bitacora">
                <Bitacora />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="sticky bottom-0 border-t bg-white py-4 px-6">
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
              onClick={() => {
                if (window.confirm("¿Está seguro de que desea eliminar este servicio? Esta acción no se puede deshacer.")) {
                  console.log("Eliminando servicio:", servicio.id);
                }
              }}
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
        </div>
      </SheetContent>
    </Sheet>
  );
} 