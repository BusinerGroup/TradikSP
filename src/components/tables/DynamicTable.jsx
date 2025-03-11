/**
 * @file DynamicTable.jsx
 * @description Componente de tabla dinámico y reutilizable que permite personalizar columnas,
 * datos y acciones según el módulo donde se utilice.
 * 
 * @requires react
 * @requires @/components/ui/table
 * @requires @/components/ui/button
 * @requires @/components/ui/input
 * @requires @/components/ui/select
 * @requires lucide-react
 */

import { useState, useMemo } from "react";
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Componente de tabla dinámico y reutilizable
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.columns - Array de objetos que definen las columnas de la tabla
 *   @param {string} props.columns[].key - Clave del objeto de datos que corresponde a esta columna
 *   @param {string} props.columns[].label - Etiqueta a mostrar en el encabezado de la columna
 *   @param {boolean} props.columns[].sortable - Indica si la columna es ordenable (default: true)
 *   @param {boolean} props.columns[].searchable - Indica si se debe buscar en esta columna (default: true)
 *   @param {string} props.columns[].align - Alineación del texto ('left', 'center', 'right') (default: 'left')
 *   @param {function} props.columns[].format - Función para formatear el valor antes de mostrarlo
 * @param {Array} props.data - Array de objetos con los datos a mostrar
 * @param {Array} props.actions - Array de objetos que definen las acciones disponibles para cada fila
 *   @param {string} props.actions[].name - Nombre de la acción
 *   @param {function} props.actions[].onClick - Función a ejecutar cuando se hace clic en la acción
 *   @param {string} props.actions[].icon - Nombre del icono a mostrar (debe importarse manualmente)
 *   @param {string} props.actions[].variant - Variante del botón ('default', 'ghost', 'outline', etc.)
 * @param {string} props.caption - Texto a mostrar como leyenda de la tabla
 * @param {string} props.searchPlaceholder - Texto a mostrar como placeholder en el campo de búsqueda
 * @param {boolean} props.showSearch - Indica si se debe mostrar el campo de búsqueda (default: true)
 * @param {boolean} props.showPagination - Indica si se debe mostrar la paginación (default: true)
 * @param {number} props.defaultItemsPerPage - Número de elementos por página por defecto (default: 10)
 * @param {Array} props.itemsPerPageOptions - Opciones para el selector de elementos por página (default: [5, 10, 20, 50])
 * @param {function} props.onRowClick - Función a ejecutar cuando se hace clic en una fila
 * @returns {JSX.Element} Componente de tabla dinámico
 */
export function DynamicTable({ 
  columns = [], 
  data = [], 
  actions = [],
  caption = "",
  searchPlaceholder = "Buscar...",
  showSearch = true,
  showPagination = true,
  defaultItemsPerPage = 10,
  itemsPerPageOptions = [5, 10, 20, 50],
  onRowClick = null
}) {
  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estado para el ordenamiento
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  
  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  // Función para solicitar ordenamiento
  const requestSort = (key) => {
    // Solo ordenar si la columna es ordenable
    const column = columns.find(col => col.key === key);
    if (column && column.sortable === false) return;

    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filtrar y ordenar datos
  const filteredAndSortedData = useMemo(() => {
    // Primero filtramos
    let filteredData = [...data];
    
    if (searchTerm.trim() !== "") {
      const searchableColumns = columns
        .filter(column => column.searchable !== false)
        .map(column => column.key);
      
      filteredData = filteredData.filter(item => {
        return searchableColumns.some(key => {
          const value = item[key];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
    }
    
    // Luego ordenamos si hay una configuración de ordenamiento
    if (sortConfig.key) {
      filteredData = [...filteredData].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        // Manejar valores nulos o indefinidos
        if (aValue === null || aValue === undefined) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (bValue === null || bValue === undefined) return sortConfig.direction === 'ascending' ? 1 : -1;
        
        // Ordenar según el tipo de dato
        if (typeof aValue === 'string') {
          return sortConfig.direction === 'ascending' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        } else {
          return sortConfig.direction === 'ascending' 
            ? aValue - bValue 
            : bValue - aValue;
        }
      });
    }
    
    return filteredData;
  }, [data, searchTerm, sortConfig, columns]);

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  // Cambiar página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Cambiar items por página
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Resetear a la primera página cuando cambia el número de items por página
  };

  // Obtener icono de ordenamiento
  const getSortIcon = (key) => {
    // Verificar si la columna es ordenable
    const column = columns.find(col => col.key === key);
    if (column && column.sortable === false) return null;

    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' 
        ? <ArrowUpDown className="h-4 w-4 ml-1 text-blue-600" /> 
        : <ArrowUpDown className="h-4 w-4 ml-1 text-blue-600 rotate-180" />;
    }
    return <ArrowUpDown className="h-4 w-4 ml-1 opacity-30" />;
  };

  // Formatear el valor de una celda
  const formatCellValue = (item, column) => {
    const value = item[column.key];
    
    // Si hay una función de formato definida, usarla
    if (column.format && typeof column.format === 'function') {
      return column.format(value, item);
    }
    
    // Si no hay valor, mostrar un guión
    if (value === null || value === undefined) {
      return "-";
    }
    
    // Devolver el valor como string
    return String(value);
  };

  // Obtener la alineación de una columna
  const getColumnAlignment = (column) => {
    if (column.align === 'right') return "text-right";
    if (column.align === 'center') return "text-center";
    return ""; // Alineación izquierda por defecto
  };

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda */}
      {showSearch && (
        <div className="flex justify-between items-center">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Tabla */}
      <div className="rounded-md border-2 overflow-hidden">
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            <TableRow className="bg-muted/30">
              {columns.map((column) => (
                <TableHead 
                  key={column.key}
                  className={`font-bold py-2 ${column.sortable !== false ? 'cursor-pointer' : ''} ${getColumnAlignment(column)}`}
                  onClick={() => column.sortable !== false && requestSort(column.key)}
                >
                  <div className={`flex items-center ${column.align === 'right' ? 'justify-end' : ''}`}>
                    {column.label}
                    {getSortIcon(column.key)}
                  </div>
                </TableHead>
              ))}
              {actions.length > 0 && (
                <TableHead className="text-right font-bold py-2">Acciones</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (actions.length > 0 ? 1 : 0)} className="h-24 text-center">
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            ) : (
              currentItems.map((item, index) => (
                <TableRow 
                  key={index} 
                  className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {columns.map((column) => (
                    <TableCell 
                      key={`${index}-${column.key}`} 
                      className={`py-1.5 ${column.key === columns[0].key ? 'font-medium' : ''} ${getColumnAlignment(column)}`}
                    >
                      {formatCellValue(item, column)}
                    </TableCell>
                  ))}
                  {actions.length > 0 && (
                    <TableCell className="text-right py-1.5">
                      <div className="flex justify-end gap-2">
                        {actions.map((action, actionIndex) => (
                          <Button 
                            key={actionIndex}
                            variant={action.variant || "ghost"} 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation(); // Evitar que se propague al onClick de la fila
                              action.onClick(item);
                            }}
                            title={action.name}
                          >
                            {action.icon && action.icon}
                          </Button>
                        ))}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      {showPagination && filteredAndSortedData.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">
              Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredAndSortedData.length)} de {filteredAndSortedData.length} resultados
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Mostrar</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={handleItemsPerPageChange}
              >
                <SelectTrigger className="w-[70px] h-8">
                  <SelectValue placeholder={itemsPerPage} />
                </SelectTrigger>
                <SelectContent>
                  {itemsPerPageOptions.map(option => (
                    <SelectItem key={option} value={option.toString()}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-700">por página</span>
            </div>
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Mostrar 5 páginas como máximo
                let pageNum;
                if (totalPages <= 5) {
                  // Si hay 5 o menos páginas, mostrarlas todas
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  // Si estamos en las primeras 3 páginas, mostrar 1-5
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  // Si estamos en las últimas 3 páginas, mostrar las últimas 5
                  pageNum = totalPages - 4 + i;
                } else {
                  // En otro caso, mostrar 2 antes y 2 después de la página actual
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className={`h-8 w-8 p-0 ${
                      currentPage === pageNum ? "bg-blue-600" : ""
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Ejemplo de uso:
 * 
 * ```jsx
 * import { DynamicTable } from "@/components/tables/DynamicTable";
 * import { Eye, Edit, Trash2 } from "lucide-react";
 * 
 * // Definir las columnas
 * const columns = [
 *   { key: 'nombre', label: 'Nombre' },
 *   { key: 'email', label: 'Correo Electrónico' },
 *   { key: 'telefono', label: 'Teléfono' },
 *   { 
 *     key: 'fechaRegistro', 
 *     label: 'Fecha de Registro', 
 *     format: (value) => new Date(value).toLocaleDateString() 
 *   },
 *   { 
 *     key: 'saldo', 
 *     label: 'Saldo', 
 *     align: 'right',
 *     format: (value) => `$${value.toFixed(2)}` 
 *   }
 * ];
 * 
 * // Definir los datos
 * const data = [
 *   { 
 *     id: 1, 
 *     nombre: 'Juan Pérez', 
 *     email: 'juan@ejemplo.com', 
 *     telefono: '123-456-7890',
 *     fechaRegistro: '2023-01-15',
 *     saldo: 1500.75
 *   },
 *   // ... más datos
 * ];
 * 
 * // Definir las acciones
 * const actions = [
 *   { 
 *     name: 'Ver', 
 *     icon: <Eye className="h-4 w-4" />, 
 *     onClick: (item) => console.log('Ver', item) 
 *   },
 *   { 
 *     name: 'Editar', 
 *     icon: <Edit className="h-4 w-4" />, 
 *     onClick: (item) => console.log('Editar', item) 
 *   },
 *   { 
 *     name: 'Eliminar', 
 *     icon: <Trash2 className="h-4 w-4" />, 
 *     variant: 'ghost',
 *     onClick: (item) => console.log('Eliminar', item) 
 *   }
 * ];
 * 
 * // Usar el componente
 * function MiComponente() {
 *   return (
 *     <DynamicTable 
 *       columns={columns}
 *       data={data}
 *       actions={actions}
 *       caption="Listado de usuarios"
 *       searchPlaceholder="Buscar usuarios..."
 *     />
 *   );
 * }
 * ```
 */ 