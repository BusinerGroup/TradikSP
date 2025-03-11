/**
 * @file DynamicTableTest.jsx
 * @description Archivo de prueba para demostrar el uso del componente DynamicTable con diferentes configuraciones.
 */

import React, { useState } from 'react';
import { DynamicTable } from '@/components/tables/DynamicTable';
import { Eye, Edit, Trash2, Download, Mail, Phone, Calendar, DollarSign, User, Building, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DynamicTableTest() {
  const [activeTab, setActiveTab] = useState('clientes');

  // Datos de ejemplo para clientes
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
      fechaRegistro: "2023-01-15",
      saldo: 15000.50
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
      fechaRegistro: "2023-02-20",
      saldo: 2500.75
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
      fechaRegistro: "2023-03-10",
      saldo: 50000.00
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
      fechaRegistro: "2023-04-05",
      saldo: 35000.25
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
      fechaRegistro: "2023-05-12",
      saldo: 1800.30
    }
  ];

  // Datos de ejemplo para productos
  const productosData = [
    {
      id: 1,
      codigo: "PROD-001",
      nombre: "Laptop HP Pavilion",
      categoria: "Electrónica",
      precio: 1200.00,
      stock: 25,
      fechaCreacion: "2023-01-10",
      estado: "Activo"
    },
    {
      id: 2,
      codigo: "PROD-002",
      nombre: "Monitor Dell 27\"",
      categoria: "Electrónica",
      precio: 350.50,
      stock: 15,
      fechaCreacion: "2023-01-15",
      estado: "Activo"
    },
    {
      id: 3,
      codigo: "PROD-003",
      nombre: "Teclado Mecánico Logitech",
      categoria: "Periféricos",
      precio: 120.75,
      stock: 30,
      fechaCreacion: "2023-02-05",
      estado: "Activo"
    },
    {
      id: 4,
      codigo: "PROD-004",
      nombre: "Mouse Inalámbrico",
      categoria: "Periféricos",
      precio: 45.99,
      stock: 50,
      fechaCreacion: "2023-02-10",
      estado: "Activo"
    },
    {
      id: 5,
      codigo: "PROD-005",
      nombre: "Auriculares Bluetooth",
      categoria: "Audio",
      precio: 89.99,
      stock: 20,
      fechaCreacion: "2023-03-01",
      estado: "Activo"
    },
    {
      id: 6,
      codigo: "PROD-006",
      nombre: "Tablet Samsung",
      categoria: "Electrónica",
      precio: 450.00,
      stock: 10,
      fechaCreacion: "2023-03-15",
      estado: "Agotado"
    },
    {
      id: 7,
      codigo: "PROD-007",
      nombre: "Impresora Láser",
      categoria: "Oficina",
      precio: 299.99,
      stock: 5,
      fechaCreacion: "2023-04-01",
      estado: "Activo"
    }
  ];

  // Datos de ejemplo para órdenes
  const ordenesData = [
    {
      id: 1,
      numeroOrden: "ORD-2023-001",
      cliente: "Empresa ABC",
      fechaCreacion: "2023-01-20",
      fechaEntrega: "2023-01-25",
      estado: "Completada",
      total: 2500.75,
      metodoPago: "Transferencia"
    },
    {
      id: 2,
      numeroOrden: "ORD-2023-002",
      cliente: "Juan Pérez",
      fechaCreacion: "2023-02-05",
      fechaEntrega: "2023-02-10",
      estado: "Completada",
      total: 450.50,
      metodoPago: "Tarjeta de Crédito"
    },
    {
      id: 3,
      numeroOrden: "ORD-2023-003",
      cliente: "Ministerio de Educación",
      fechaCreacion: "2023-03-15",
      fechaEntrega: "2023-03-20",
      estado: "En Proceso",
      total: 15000.00,
      metodoPago: "Transferencia"
    },
    {
      id: 4,
      numeroOrden: "ORD-2023-004",
      cliente: "Universidad Central",
      fechaCreacion: "2023-04-10",
      fechaEntrega: "2023-04-15",
      estado: "Pendiente",
      total: 8750.25,
      metodoPago: "Cheque"
    },
    {
      id: 5,
      numeroOrden: "ORD-2023-005",
      cliente: "María García",
      fechaCreacion: "2023-05-01",
      fechaEntrega: "2023-05-06",
      estado: "Cancelada",
      total: 320.99,
      metodoPago: "Efectivo"
    }
  ];

  // Configuración para la tabla de clientes
  const clientesColumns = [
    { key: 'nombre', label: 'Nombre', sortable: true },
    { key: 'numeroDocumento', label: 'Documento', sortable: true },
    { key: 'telefono', label: 'Teléfono', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'ciudad', label: 'Ciudad', sortable: true },
    { 
      key: 'fechaRegistro', 
      label: 'Fecha Registro', 
      sortable: true,
      format: (value) => new Date(value).toLocaleDateString('es-ES')
    },
    { 
      key: 'saldo', 
      label: 'Saldo', 
      sortable: true, 
      align: 'right',
      format: (value) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)
    }
  ];

  const clientesActions = [
    { 
      name: 'Ver', 
      icon: <Eye className="h-4 w-4" />, 
      onClick: (item) => alert(`Ver cliente: ${item.nombre}`) 
    },
    { 
      name: 'Editar', 
      icon: <Edit className="h-4 w-4" />, 
      onClick: (item) => alert(`Editar cliente: ${item.nombre}`) 
    },
    { 
      name: 'Eliminar', 
      icon: <Trash2 className="h-4 w-4" />, 
      variant: 'ghost',
      onClick: (item) => alert(`Eliminar cliente: ${item.nombre}`) 
    }
  ];

  // Configuración para la tabla de productos
  const productosColumns = [
    { key: 'codigo', label: 'Código', sortable: true },
    { key: 'nombre', label: 'Nombre', sortable: true },
    { key: 'categoria', label: 'Categoría', sortable: true },
    { 
      key: 'precio', 
      label: 'Precio', 
      sortable: true, 
      align: 'right',
      format: (value) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)
    },
    { 
      key: 'stock', 
      label: 'Stock', 
      sortable: true, 
      align: 'right' 
    },
    { 
      key: 'estado', 
      label: 'Estado', 
      sortable: true,
      format: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    }
  ];

  const productosActions = [
    { 
      name: 'Ver', 
      icon: <Eye className="h-4 w-4" />, 
      onClick: (item) => alert(`Ver producto: ${item.nombre}`) 
    },
    { 
      name: 'Editar', 
      icon: <Edit className="h-4 w-4" />, 
      onClick: (item) => alert(`Editar producto: ${item.nombre}`) 
    },
    { 
      name: 'Eliminar', 
      icon: <Trash2 className="h-4 w-4" />, 
      variant: 'ghost',
      onClick: (item) => alert(`Eliminar producto: ${item.nombre}`) 
    }
  ];

  // Configuración para la tabla de órdenes
  const ordenesColumns = [
    { key: 'numeroOrden', label: 'Número', sortable: true },
    { key: 'cliente', label: 'Cliente', sortable: true },
    { 
      key: 'fechaCreacion', 
      label: 'Fecha Creación', 
      sortable: true,
      format: (value) => new Date(value).toLocaleDateString('es-ES')
    },
    { 
      key: 'fechaEntrega', 
      label: 'Fecha Entrega', 
      sortable: true,
      format: (value) => new Date(value).toLocaleDateString('es-ES')
    },
    { 
      key: 'estado', 
      label: 'Estado', 
      sortable: true,
      format: (value) => {
        let bgColor = 'bg-gray-100';
        let textColor = 'text-gray-800';
        
        if (value === 'Completada') {
          bgColor = 'bg-green-100';
          textColor = 'text-green-800';
        } else if (value === 'En Proceso') {
          bgColor = 'bg-blue-100';
          textColor = 'text-blue-800';
        } else if (value === 'Pendiente') {
          bgColor = 'bg-yellow-100';
          textColor = 'text-yellow-800';
        } else if (value === 'Cancelada') {
          bgColor = 'bg-red-100';
          textColor = 'text-red-800';
        }
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${bgColor} ${textColor}`}>
            {value}
          </span>
        );
      }
    },
    { 
      key: 'total', 
      label: 'Total', 
      sortable: true, 
      align: 'right',
      format: (value) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)
    }
  ];

  const ordenesActions = [
    { 
      name: 'Ver', 
      icon: <Eye className="h-4 w-4" />, 
      onClick: (item) => alert(`Ver orden: ${item.numeroOrden}`) 
    },
    { 
      name: 'Descargar', 
      icon: <Download className="h-4 w-4" />, 
      onClick: (item) => alert(`Descargar orden: ${item.numeroOrden}`) 
    }
  ];

  // Función para manejar el clic en una fila
  const handleRowClick = (item) => {
    console.log('Fila clickeada:', item);
  };

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Prueba de DynamicTable</h1>
      
      {/* Tabs para cambiar entre ejemplos */}
      <div className="flex space-x-2 mb-6">
        <Button 
          variant={activeTab === 'clientes' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('clientes')}
          className="flex items-center"
        >
          <User className="mr-2 h-4 w-4" />
          Clientes
        </Button>
        <Button 
          variant={activeTab === 'productos' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('productos')}
          className="flex items-center"
        >
          <Building className="mr-2 h-4 w-4" />
          Productos
        </Button>
        <Button 
          variant={activeTab === 'ordenes' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('ordenes')}
          className="flex items-center"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Órdenes
        </Button>
      </div>
      
      {/* Ejemplo de tabla de clientes */}
      {activeTab === 'clientes' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Tabla de Clientes</h2>
          <p className="mb-4 text-gray-600">
            Este ejemplo muestra una tabla de clientes con columnas personalizadas, 
            acciones y formato de datos.
          </p>
          <DynamicTable 
            columns={clientesColumns}
            data={clientesData}
            actions={clientesActions}
            caption="Listado de clientes registrados"
            searchPlaceholder="Buscar clientes..."
            onRowClick={handleRowClick}
          />
          
          <div className="mt-8 p-4 bg-gray-50 rounded-md border">
            <h3 className="text-lg font-medium mb-2">Código de ejemplo:</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Definir las columnas
const clientesColumns = [
  { key: 'nombre', label: 'Nombre', sortable: true },
  { key: 'numeroDocumento', label: 'Documento', sortable: true },
  { key: 'telefono', label: 'Teléfono', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'ciudad', label: 'Ciudad', sortable: true },
  { 
    key: 'fechaRegistro', 
    label: 'Fecha Registro', 
    sortable: true,
    format: (value) => new Date(value).toLocaleDateString('es-ES')
  },
  { 
    key: 'saldo', 
    label: 'Saldo', 
    sortable: true, 
    align: 'right',
    format: (value) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)
  }
];

// Definir las acciones
const clientesActions = [
  { 
    name: 'Ver', 
    icon: <Eye className="h-4 w-4" />, 
    onClick: (item) => alert(\`Ver cliente: \${item.nombre}\`) 
  },
  { 
    name: 'Editar', 
    icon: <Edit className="h-4 w-4" />, 
    onClick: (item) => alert(\`Editar cliente: \${item.nombre}\`) 
  },
  { 
    name: 'Eliminar', 
    icon: <Trash2 className="h-4 w-4" />, 
    variant: 'ghost',
    onClick: (item) => alert(\`Eliminar cliente: \${item.nombre}\`) 
  }
];

// Usar el componente
<DynamicTable 
  columns={clientesColumns}
  data={clientesData}
  actions={clientesActions}
  caption="Listado de clientes registrados"
  searchPlaceholder="Buscar clientes..."
  onRowClick={handleRowClick}
/>`}
            </pre>
          </div>
        </div>
      )}
      
      {/* Ejemplo de tabla de productos */}
      {activeTab === 'productos' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Tabla de Productos</h2>
          <p className="mb-4 text-gray-600">
            Este ejemplo muestra una tabla de productos con formato personalizado 
            para el estado y el precio.
          </p>
          <DynamicTable 
            columns={productosColumns}
            data={productosData}
            actions={productosActions}
            caption="Catálogo de productos"
            searchPlaceholder="Buscar productos..."
            defaultItemsPerPage={5}
          />
          
          <div className="mt-8 p-4 bg-gray-50 rounded-md border">
            <h3 className="text-lg font-medium mb-2">Código de ejemplo:</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Definir las columnas
const productosColumns = [
  { key: 'codigo', label: 'Código', sortable: true },
  { key: 'nombre', label: 'Nombre', sortable: true },
  { key: 'categoria', label: 'Categoría', sortable: true },
  { 
    key: 'precio', 
    label: 'Precio', 
    sortable: true, 
    align: 'right',
    format: (value) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)
  },
  { 
    key: 'stock', 
    label: 'Stock', 
    sortable: true, 
    align: 'right' 
  },
  { 
    key: 'estado', 
    label: 'Estado', 
    sortable: true,
    format: (value) => (
      <span className={\`px-2 py-1 rounded-full text-xs \${
        value === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }\`}>
        {value}
      </span>
    )
  }
];

// Usar el componente
<DynamicTable 
  columns={productosColumns}
  data={productosData}
  actions={productosActions}
  caption="Catálogo de productos"
  searchPlaceholder="Buscar productos..."
  defaultItemsPerPage={5}
/>`}
            </pre>
          </div>
        </div>
      )}
      
      {/* Ejemplo de tabla de órdenes */}
      {activeTab === 'ordenes' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Tabla de Órdenes</h2>
          <p className="mb-4 text-gray-600">
            Este ejemplo muestra una tabla de órdenes con estados visuales 
            y diferentes acciones.
          </p>
          <DynamicTable 
            columns={ordenesColumns}
            data={ordenesData}
            actions={ordenesActions}
            caption="Listado de órdenes"
            searchPlaceholder="Buscar órdenes..."
            showPagination={true}
          />
          
          <div className="mt-8 p-4 bg-gray-50 rounded-md border">
            <h3 className="text-lg font-medium mb-2">Código de ejemplo:</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Definir las columnas con formato condicional para el estado
const ordenesColumns = [
  { key: 'numeroOrden', label: 'Número', sortable: true },
  { key: 'cliente', label: 'Cliente', sortable: true },
  { 
    key: 'fechaCreacion', 
    label: 'Fecha Creación', 
    sortable: true,
    format: (value) => new Date(value).toLocaleDateString('es-ES')
  },
  { 
    key: 'estado', 
    label: 'Estado', 
    sortable: true,
    format: (value) => {
      let bgColor = 'bg-gray-100';
      let textColor = 'text-gray-800';
      
      if (value === 'Completada') {
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
      } else if (value === 'En Proceso') {
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-800';
      } else if (value === 'Pendiente') {
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-800';
      } else if (value === 'Cancelada') {
        bgColor = 'bg-red-100';
        textColor = 'text-red-800';
      }
      
      return (
        <span className={\`px-2 py-1 rounded-full text-xs \${bgColor} \${textColor}\`}>
          {value}
        </span>
      );
    }
  },
  { 
    key: 'total', 
    label: 'Total', 
    sortable: true, 
    align: 'right',
    format: (value) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)
  }
];

// Usar el componente
<DynamicTable 
  columns={ordenesColumns}
  data={ordenesData}
  actions={ordenesActions}
  caption="Listado de órdenes"
  searchPlaceholder="Buscar órdenes..."
  showPagination={true}
/>`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default DynamicTableTest; 