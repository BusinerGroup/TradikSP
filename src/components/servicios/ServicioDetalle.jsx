import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Trash, Edit, Check, X } from "lucide-react";

export function ServicioDetalle() {
  const [items, setItems] = useState([
    { 
      id: 1, 
      concepto: "Alquiler de equipo", 
      detalle: "Sistema de sonido profesional", 
      cantidad: 1, 
      dias: 2, 
      vrInicial: 500000, 
      vrAdicional: 50000, 
      total: 550000,
      isEditing: false
    },
    { 
      id: 2, 
      concepto: "Personal", 
      detalle: "Técnico de sonido", 
      cantidad: 2, 
      dias: 2, 
      vrInicial: 300000, 
      vrAdicional: 0, 
      total: 300000,
      isEditing: false
    }
  ]);

  // Siempre mantener una fila vacía al final para agregar nuevos items
  const [newItem, setNewItem] = useState(createEmptyItem());
  const lastRowRef = useRef(null);

  function createEmptyItem() {
    return {
      id: Date.now(),
      concepto: "",
      detalle: "",
      cantidad: 1,
      dias: 1,
      vrInicial: 0,
      vrAdicional: 0,
      total: 0,
      isNew: true
    };
  }

  const calculateTotal = (item) => {
    const vrInicial = parseFloat(item.vrInicial) || 0;
    const vrAdicional = parseFloat(item.vrAdicional) || 0;
    const cantidad = parseInt(item.cantidad) || 1;
    const dias = parseInt(item.dias) || 1;
    
    // Nueva fórmula: (cantidad x vr. inicial) + (cantidad x (vr. adicional x (dias - 1)))
    return (cantidad * vrInicial) + (cantidad * (vrAdicional * Math.max(0, dias - 1)));
  };

  const handleInputChange = (e, item, isNewRow = false) => {
    const { name, value } = e.target;
    
    if (isNewRow) {
      // Para la fila de nuevo item
      const updatedItem = { ...newItem, [name]: value };
      
      // Si los campos principales están llenos, preparar para agregar automáticamente
      const shouldAddNewRow = 
        name === "vrAdicional" && 
        newItem.concepto.trim() !== "" && 
        newItem.detalle.trim() !== "";
      
      // Actualizar el total
      updatedItem.total = calculateTotal(updatedItem);
      
      setNewItem(updatedItem);
      
      // Si se completaron los campos principales y se está en el último campo, agregar automáticamente
      if (shouldAddNewRow && e.key === "Tab" && !e.shiftKey) {
        handleAddItem();
      }
    } else {
      // Para filas existentes en modo edición
      const updatedItems = items.map(i => {
        if (i.id === item.id) {
          const updatedItem = { ...i, [name]: value };
          updatedItem.total = calculateTotal(updatedItem);
          return updatedItem;
        }
        return i;
      });
      
      setItems(updatedItems);
    }
  };

  const handleKeyDown = (e, item, isNewRow = false) => {
    // Si se presiona Tab en el último campo de la fila nueva y hay datos, agregar automáticamente
    if (e.key === "Tab" && !e.shiftKey && isNewRow && name === "vrAdicional") {
      if (newItem.concepto.trim() !== "" && newItem.detalle.trim() !== "") {
        e.preventDefault(); // Prevenir el comportamiento por defecto del Tab
        handleAddItem();
      }
    }
  };

  const handleAddItem = () => {
    if (newItem.concepto.trim() === "" && newItem.detalle.trim() === "") {
      return; // No agregar filas vacías
    }
    
    // Calcular el total final
    const itemToAdd = { 
      ...newItem, 
      total: calculateTotal(newItem),
      isNew: false
    };
    
    setItems([...items, itemToAdd]);
    setNewItem(createEmptyItem());
    
    // Enfocar la primera celda de la nueva fila vacía
    setTimeout(() => {
      if (lastRowRef.current) {
        const firstInput = lastRowRef.current.querySelector('input');
        if (firstInput) firstInput.focus();
      }
    }, 0);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const toggleEditMode = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, isEditing: !item.isEditing } : item
    ));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  const calculateGrandTotal = () => {
    return items.reduce((sum, item) => sum + parseFloat(item.total || 0), 0);
  };

  // Efecto para enfocar el primer campo cuando se carga el componente
  useEffect(() => {
    if (lastRowRef.current) {
      const firstInput = lastRowRef.current.querySelector('input');
      if (firstInput) firstInput.focus();
    }
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Detalle del Servicio</h3>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Concepto</TableHead>
              <TableHead>Detalle</TableHead>
              <TableHead className="text-right">Cantidad</TableHead>
              <TableHead className="text-right">Días</TableHead>
              <TableHead className="text-right">Vr. Inicial</TableHead>
              <TableHead className="text-right">Vr. Adicional</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Filas existentes */}
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.isEditing ? (
                    <Input 
                      name="concepto"
                      value={item.concepto}
                      onChange={(e) => handleInputChange(e, item)}
                      className="w-full"
                    />
                  ) : (
                    item.concepto
                  )}
                </TableCell>
                <TableCell>
                  {item.isEditing ? (
                    <Input 
                      name="detalle"
                      value={item.detalle}
                      onChange={(e) => handleInputChange(e, item)}
                      className="w-full"
                    />
                  ) : (
                    item.detalle
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {item.isEditing ? (
                    <Input 
                      type="number" 
                      min="1"
                      name="cantidad"
                      value={item.cantidad}
                      onChange={(e) => handleInputChange(e, item)}
                      className="w-full text-right"
                    />
                  ) : (
                    item.cantidad
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {item.isEditing ? (
                    <Input 
                      type="number" 
                      min="1"
                      name="dias"
                      value={item.dias}
                      onChange={(e) => handleInputChange(e, item)}
                      className="w-full text-right"
                    />
                  ) : (
                    item.dias
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {item.isEditing ? (
                    <Input 
                      type="number" 
                      min="0"
                      name="vrInicial"
                      value={item.vrInicial}
                      onChange={(e) => handleInputChange(e, item)}
                      className="w-full text-right"
                    />
                  ) : (
                    formatCurrency(item.vrInicial)
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {item.isEditing ? (
                    <Input 
                      type="number" 
                      min="0"
                      name="vrAdicional"
                      value={item.vrAdicional}
                      onChange={(e) => handleInputChange(e, item)}
                      className="w-full text-right"
                    />
                  ) : (
                    formatCurrency(item.vrAdicional)
                  )}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(item.total)}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => toggleEditMode(item.id)}
                      className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                    >
                      {item.isEditing ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Edit className="h-4 w-4" />
                      )}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemoveItem(item.id)}
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {/* Fila para agregar nuevo item */}
            <TableRow ref={lastRowRef}>
              <TableCell>
                <Input 
                  placeholder="Concepto" 
                  name="concepto"
                  value={newItem.concepto}
                  onChange={(e) => handleInputChange(e, newItem, true)}
                  onKeyDown={(e) => handleKeyDown(e, newItem, true)}
                  className="w-full"
                />
              </TableCell>
              <TableCell>
                <Input 
                  placeholder="Detalle" 
                  name="detalle"
                  value={newItem.detalle}
                  onChange={(e) => handleInputChange(e, newItem, true)}
                  onKeyDown={(e) => handleKeyDown(e, newItem, true)}
                  className="w-full"
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number" 
                  min="1"
                  name="cantidad"
                  value={newItem.cantidad}
                  onChange={(e) => handleInputChange(e, newItem, true)}
                  onKeyDown={(e) => handleKeyDown(e, newItem, true)}
                  className="w-full text-right"
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number" 
                  min="1"
                  name="dias"
                  value={newItem.dias}
                  onChange={(e) => handleInputChange(e, newItem, true)}
                  onKeyDown={(e) => handleKeyDown(e, newItem, true)}
                  className="w-full text-right"
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number" 
                  min="0"
                  name="vrInicial"
                  value={newItem.vrInicial}
                  onChange={(e) => handleInputChange(e, newItem, true)}
                  onKeyDown={(e) => handleKeyDown(e, newItem, true)}
                  className="w-full text-right"
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number" 
                  min="0"
                  name="vrAdicional"
                  value={newItem.vrAdicional}
                  onChange={(e) => handleInputChange(e, newItem, true)}
                  onKeyDown={(e) => handleKeyDown(e, newItem, true)}
                  onBlur={handleAddItem}
                  className="w-full text-right"
                />
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(newItem.total)}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            
            {/* Fila de total */}
            <TableRow className="bg-gray-50 font-medium">
              <TableCell colSpan={6} className="text-right">Total:</TableCell>
              <TableCell className="text-right">{formatCurrency(calculateGrandTotal())}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 