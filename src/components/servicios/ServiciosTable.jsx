import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash2, Eye } from "lucide-react";
import { DynamicTable } from "@/components/tables/DynamicTable";
import { ServicioSheet } from "./ServicioDrawer";
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
  },
  { 
    id: 3,
    numeroSS: "SS-2024-003",
    fechaSolicitud: "2024-03-18",
    fechaMontaje: "2024-04-01T10:00:00",
    cliente: "Ministerio de Cultura",
    evento: "Festival de Arte Urbano",
    valor: 22000000,
    facturaRemision: "F",
    numeroFactura: "FACT-2024-002",
    estado: "Pendiente",
    costosProduccion: 12000000,
    abonos: 11000000,
    saldo: 11000000,
    coordinador: "Laura Gómez",
    createdAt: "2024-03-18T09:45:00",
    updatedAt: "2024-03-18T09:45:00"
  },
  { 
    id: 4,
    numeroSS: "SS-2024-004",
    fechaSolicitud: "2024-03-20",
    fechaMontaje: "2024-03-28T16:30:00",
    cliente: "Colegio San José",
    evento: "Feria de Ciencias",
    valor: 5800000,
    facturaRemision: "R",
    numeroFactura: "REM-2024-002",
    estado: "Ejecutado",
    costosProduccion: 3200000,
    abonos: 5800000,
    saldo: 0,
    coordinador: "Pedro Sánchez",
    createdAt: "2024-03-20T14:20:00",
    updatedAt: "2024-03-29T10:15:00"
  },
  { 
    id: 5,
    numeroSS: "SS-2024-005",
    fechaSolicitud: "2024-03-22",
    fechaMontaje: "2024-04-05T08:00:00",
    cliente: "Empresa XYZ",
    evento: "Conferencia Anual",
    valor: 18500000,
    facturaRemision: "F",
    numeroFactura: "FACT-2024-003",
    estado: "En Proceso",
    costosProduccion: 9800000,
    abonos: 9250000,
    saldo: 9250000,
    coordinador: "Ana Martínez",
    createdAt: "2024-03-22T11:30:00",
    updatedAt: "2024-03-22T11:30:00"
  },
  { 
    id: 6,
    numeroSS: "SS-2024-006",
    fechaSolicitud: "2024-03-25",
    fechaMontaje: "2024-04-10T19:00:00",
    cliente: "Teatro Municipal",
    evento: "Obra de Teatro",
    valor: 7200000,
    facturaRemision: "R",
    numeroFactura: "REM-2024-003",
    estado: "Pendiente",
    costosProduccion: 4100000,
    abonos: 3600000,
    saldo: 3600000,
    coordinador: "Carlos Rodríguez",
    createdAt: "2024-03-25T15:45:00",
    updatedAt: "2024-03-25T15:45:00"
  },
  { 
    id: 7,
    numeroSS: "SS-2024-007",
    fechaSolicitud: "2024-03-26",
    fechaMontaje: "2024-03-30T11:00:00",
    cliente: "Ayuntamiento",
    evento: "Feria Municipal",
    valor: 25000000,
    facturaRemision: "F",
    numeroFactura: "FACT-2024-004",
    estado: "Ejecutado",
    costosProduccion: 14000000,
    abonos: 25000000,
    saldo: 0,
    coordinador: "Laura Gómez",
    createdAt: "2024-03-26T10:00:00",
    updatedAt: "2024-03-31T09:30:00"
  },
  { 
    id: 8,
    numeroSS: "SS-2024-008",
    fechaSolicitud: "2024-03-28",
    fechaMontaje: "2024-04-15T09:30:00",
    cliente: "Empresa ABC",
    evento: "Capacitación Empleados",
    valor: 6500000,
    facturaRemision: "R",
    numeroFactura: "REM-2024-004",
    estado: "Pendiente",
    costosProduccion: 3800000,
    abonos: 3250000,
    saldo: 3250000,
    coordinador: "Pedro Sánchez",
    createdAt: "2024-03-28T13:15:00",
    updatedAt: "2024-03-28T13:15:00"
  },
  { 
    id: 9,
    numeroSS: "SS-2024-009",
    fechaSolicitud: "2024-03-29",
    fechaMontaje: "2024-04-02T15:00:00",
    cliente: "Hospital Central",
    evento: "Congreso Médico",
    valor: 12000000,
    facturaRemision: "F",
    numeroFactura: "FACT-2024-005",
    estado: "En Proceso",
    costosProduccion: 6500000,
    abonos: 6000000,
    saldo: 6000000,
    coordinador: "Ana Martínez",
    createdAt: "2024-03-29T09:45:00",
    updatedAt: "2024-03-29T09:45:00"
  },
  { 
    id: 10,
    numeroSS: "SS-2024-010",
    fechaSolicitud: "2024-04-01",
    fechaMontaje: "2024-04-20T10:00:00",
    cliente: "Universidad Central",
    evento: "Simposio Científico",
    valor: 9800000,
    facturaRemision: "R",
    numeroFactura: "REM-2024-005",
    estado: "Pendiente",
    costosProduccion: 5400000,
    abonos: 4900000,
    saldo: 4900000,
    coordinador: "Carlos Rodríguez",
    createdAt: "2024-04-01T11:30:00",
    updatedAt: "2024-04-01T11:30:00"
  },
  { 
    id: 11,
    numeroSS: "SS-2024-011",
    fechaSolicitud: "2024-04-02",
    fechaMontaje: "2024-04-08T18:00:00",
    cliente: "Empresa XYZ",
    evento: "Lanzamiento Producto Y",
    valor: 16500000,
    facturaRemision: "F",
    numeroFactura: "FACT-2024-006",
    estado: "Facturado",
    costosProduccion: 9000000,
    abonos: 16500000,
    saldo: 0,
    coordinador: "Laura Gómez",
    createdAt: "2024-04-02T14:20:00",
    updatedAt: "2024-04-09T10:15:00"
  },
  { 
    id: 12,
    numeroSS: "SS-2024-012",
    fechaSolicitud: "2024-04-03",
    fechaMontaje: "2024-04-25T09:00:00",
    cliente: "Colegio San José",
    evento: "Festival de Fin de Curso",
    valor: 7500000,
    facturaRemision: "R",
    numeroFactura: "REM-2024-006",
    estado: "Pendiente",
    costosProduccion: 4200000,
    abonos: 3750000,
    saldo: 3750000,
    coordinador: "Pedro Sánchez",
    createdAt: "2024-04-03T09:30:00",
    updatedAt: "2024-04-03T09:30:00"
  },
  { 
    id: 13,
    numeroSS: "SS-2024-013",
    fechaSolicitud: "2024-04-05",
    fechaMontaje: "2024-04-12T14:30:00",
    cliente: "Ministerio de Cultura",
    evento: "Exposición de Arte",
    valor: 14000000,
    facturaRemision: "F",
    numeroFactura: "FACT-2024-007",
    estado: "En Proceso",
    costosProduccion: 7800000,
    abonos: 7000000,
    saldo: 7000000,
    coordinador: "Ana Martínez",
    createdAt: "2024-04-05T11:45:00",
    updatedAt: "2024-04-05T11:45:00"
  },
  { 
    id: 14,
    numeroSS: "SS-2024-014",
    fechaSolicitud: "2024-04-06",
    fechaMontaje: "2024-04-15T16:00:00",
    cliente: "Teatro Municipal",
    evento: "Concierto Benéfico",
    valor: 8900000,
    facturaRemision: "R",
    numeroFactura: "REM-2024-007",
    estado: "Cancelado",
    costosProduccion: 2000000,
    abonos: 0,
    saldo: 0,
    coordinador: "Carlos Rodríguez",
    createdAt: "2024-04-06T10:15:00",
    updatedAt: "2024-04-08T09:30:00"
  },
  { 
    id: 15,
    numeroSS: "SS-2024-015",
    fechaSolicitud: "2024-04-08",
    fechaMontaje: "2024-04-30T11:30:00",
    cliente: "Ayuntamiento",
    evento: "Celebración Día de la Ciudad",
    valor: 28000000,
    facturaRemision: "F",
    numeroFactura: "FACT-2024-008",
    estado: "Pendiente",
    costosProduccion: 15000000,
    abonos: 14000000,
    saldo: 14000000,
    coordinador: "Laura Gómez",
    createdAt: "2024-04-08T13:00:00",
    updatedAt: "2024-04-08T13:00:00"
  }
];

export function ServiciosTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [servicios, setServicios] = useState(serviciosData);
  
  const handleServicioUpdated = () => {
    console.log("Servicio actualizado, recargando datos...");
  };

  const handleNuevoServicioSuccess = () => {
    console.log("Nuevo servicio guardado, recargando datos...");
    // Aquí iría la lógica para recargar los datos desde la API
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

  // Definir las columnas para DynamicTable
  const columns = [
    { 
      key: 'fechaMontaje', 
      label: 'Fecha Montaje', 
      sortable: true,
      format: (value) => formatDateTime(value)
    },
    { 
      key: 'numeroSS', 
      label: 'Nº SS', 
      sortable: true,
      format: (value) => formatNumeroSS(value)
    },
    { 
      key: 'cliente', 
      label: 'Cliente', 
      sortable: true
    },
    { 
      key: 'evento', 
      label: 'Evento', 
      sortable: true
    },
    { 
      key: 'valor', 
      label: 'Valor', 
      sortable: true,
      align: 'right',
      format: (value) => formatCurrency(value)
    },
    { 
      key: 'facturaRemision', 
      label: 'F/R', 
      sortable: true,
      align: 'center',
      format: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'F' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'numeroFactura', 
      label: 'NºFact', 
      sortable: true
    },
    { 
      key: 'estado', 
      label: 'Estado', 
      sortable: true,
      format: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
          value === 'En Proceso' ? 'bg-blue-100 text-blue-800' :
          value === 'Ejecutado' ? 'bg-green-100 text-green-800' :
          value === 'Facturado' ? 'bg-purple-100 text-purple-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    }
  ];

  // Definir las acciones para DynamicTable
  const actions = [
    { 
      name: 'Ver', 
      icon: <Eye className="h-4 w-4 text-blue-600" />, 
      variant: 'ghost',
      className: 'hover:bg-blue-50',
      customRender: (servicio) => (
        <ServicioSheet 
          servicio={servicio} 
          onServicioUpdated={handleServicioUpdated}
        >
          <Button variant="ghost" size="icon" className="hover:bg-blue-50">
            <Eye className="h-4 w-4 text-blue-600" />
          </Button>
        </ServicioSheet>
      )
    },
    { 
      name: 'Eliminar', 
      icon: <Trash2 className="h-4 w-4 text-red-600" />, 
      variant: 'ghost',
      className: 'hover:bg-red-50',
      onClick: (servicio) => {
        if (window.confirm("¿Está seguro de que desea eliminar este servicio? Esta acción no se puede deshacer.")) {
          console.log("Servicio eliminado:", servicio);
          handleServicioUpdated();
        }
      } 
    }
  ];

  // Filtrar datos según el término de búsqueda
  const filteredData = useMemo(() => {
    return servicios.filter(servicio => 
      servicio.numeroSS.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servicio.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servicio.evento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servicio.estado.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [servicios, searchTerm]);

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
      
      <DynamicTable 
        columns={columns}
        data={filteredData}
        actions={actions}
        caption="Listado de servicios"
        searchPlaceholder="Buscar servicios..."
        showSearch={false} // Desactivamos la búsqueda interna porque ya tenemos nuestro propio campo de búsqueda
        defaultItemsPerPage={10}
        itemsPerPageOptions={[5, 10, 20, 50]}
      />
    </div>
  );
} 