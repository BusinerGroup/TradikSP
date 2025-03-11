import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Plus, Trash2 } from "lucide-react";
import { DynamicTable } from "@/components/tables/DynamicTable";

// Datos de ejemplo para la tabla
const ordenesData = [
  {
    id: 1,
    concepto: "Montaje de sonido",
    detalle: "Sistema de sonido para evento corporativo",
    cantidad: 1,
    proveedor: "AudioPro S.A.S",
    costo: 1500000
  },
  {
    id: 2,
    concepto: "Personal técnico",
    detalle: "Técnicos de sonido e iluminación",
    cantidad: 3,
    proveedor: "StaffTech Ltda.",
    costo: 900000
  },
  {
    id: 3,
    concepto: "Transporte de equipos",
    detalle: "Transporte ida y vuelta de equipos",
    cantidad: 1,
    proveedor: "LogisTrans S.A.",
    costo: 450000
  },
  {
    id: 4,
    concepto: "Alquiler de luces",
    detalle: "Sistema de iluminación LED para escenario",
    cantidad: 2,
    proveedor: "LightShow Colombia",
    costo: 1200000
  },
  {
    id: 5,
    concepto: "Montaje de tarima",
    detalle: "Tarima de 6x4 metros con escaleras",
    cantidad: 1,
    proveedor: "EventStage S.A.S",
    costo: 800000
  }
];

export function OrdenesTable() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Formatear moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Definir las columnas para DynamicTable
  const columns = [
    { 
      key: 'concepto', 
      label: 'Concepto', 
      sortable: true 
    },
    { 
      key: 'detalle', 
      label: 'Detalle', 
      sortable: true 
    },
    { 
      key: 'cantidad', 
      label: 'Cantidad', 
      sortable: true, 
      align: 'right' 
    },
    { 
      key: 'proveedor', 
      label: 'Proveedor', 
      sortable: true 
    },
    { 
      key: 'costo', 
      label: 'Costo', 
      sortable: true, 
      align: 'right',
      format: (value) => formatCurrency(value)
    }
  ];

  // Definir las acciones para DynamicTable
  const actions = [
    { 
      name: 'Ver', 
      icon: <Eye className="h-4 w-4" />, 
      onClick: (orden) => console.log("Ver orden:", orden) 
    },
    { 
      name: 'Eliminar', 
      icon: <Trash2 className="h-4 w-4" />, 
      variant: 'ghost',
      onClick: (orden) => {
        if (window.confirm("¿Está seguro de que desea eliminar esta orden? Esta acción no se puede deshacer.")) {
          console.log("Orden eliminada:", orden.id);
        }
      } 
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Input
            placeholder="Buscar por concepto, detalle o proveedor..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="font-medium">
          <Plus className="mr-2 h-4 w-4" /> Nueva Orden
        </Button>
      </div>

      <DynamicTable 
        columns={columns}
        data={ordenesData}
        actions={actions}
        caption="Listado de órdenes de trabajo"
        searchPlaceholder="Buscar por concepto, detalle o proveedor..."
        showSearch={false} // Desactivamos la búsqueda interna porque ya tenemos nuestro propio campo de búsqueda
        defaultItemsPerPage={10}
      />
    </div>
  );
} 