import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ServicioForm({ servicio, onSuccess, inDialog = false }) {
  const [formData, setFormData] = useState(
    servicio || {
      numeroSS: "",
      fechaSolicitud: new Date().toISOString().split('T')[0],
      fechaMontaje: new Date().toISOString().slice(0, 16),
      cliente: "",
      evento: "",
      valor: "",
      facturaRemision: "F",
      numeroFactura: "",
      estado: "Pendiente",
      costosProduccion: "",
      abonos: "",
      saldo: "",
      coordinador: ""
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar el servicio
    console.log("Guardando servicio:", formData);
    onSuccess?.();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatNumeroSS = (value) => {
    const currentYear = new Date().getFullYear();
    const digits = value.replace(/\D/g, '').slice(0, 3);
    if (!digits) return "";
    return `SS-${currentYear}-${digits.padStart(3, '0')}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="servicioForm">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Nº SS</Label>
          <Input
            name="numeroSS"
            value={formData.numeroSS}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 3);
              const formattedValue = formatNumeroSS(rawValue);
              setFormData(prev => ({
                ...prev,
                numeroSS: formattedValue || rawValue
              }));
            }}
            onBlur={(e) => {
              const rawValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 3);
              const formattedValue = formatNumeroSS(rawValue);
              setFormData(prev => ({
                ...prev,
                numeroSS: formattedValue
              }));
            }}
            type="text"
            placeholder="SS-2024-000"
            required
            title="El formato debe ser SS-YYYY-XXX donde XXX son números"
            className="font-mono"
          />
        </div>

        <div className="space-y-2">
          <Label>Cliente</Label>
          <Input
            name="cliente"
            value={formData.cliente}
            onChange={handleInputChange}
            placeholder="Nombre del cliente"
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label>Evento</Label>
          <Input
            name="evento"
            value={formData.evento}
            onChange={handleInputChange}
            placeholder="Nombre del evento"
          />
        </div>

        <div className="space-y-2">
          <Label>Fecha Solicitud</Label>
          <Input
            type="date"
            name="fechaSolicitud"
            value={formData.fechaSolicitud}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label>Fecha/Hora Montaje</Label>
          <Input
            type="datetime-local"
            name="fechaMontaje"
            value={formData.fechaMontaje}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label>Valor Total</Label>
          <Input
            type="number"
            name="valor"
            value={formData.valor}
            onChange={handleInputChange}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label>Costos de Producción</Label>
          <Input
            type="number"
            name="costosProduccion"
            value={formData.costosProduccion}
            onChange={handleInputChange}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label>Abonos</Label>
          <Input
            type="number"
            name="abonos"
            value={formData.abonos}
            onChange={handleInputChange}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label>Saldo</Label>
          <Input
            type="number"
            name="saldo"
            value={formData.saldo}
            onChange={handleInputChange}
            placeholder="0"
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label>Tipo Documento</Label>
          <Select
            name="facturaRemision"
            value={formData.facturaRemision}
            onValueChange={(value) =>
              setFormData(prev => ({ ...prev, facturaRemision: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="F">Factura</SelectItem>
              <SelectItem value="R">Remisión</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Nº Documento</Label>
          <Input
            name="numeroFactura"
            value={formData.numeroFactura}
            onChange={handleInputChange}
            placeholder="FACT-2024-001"
          />
        </div>

        <div className="space-y-2">
          <Label>Estado</Label>
          <Select
            name="estado"
            value={formData.estado}
            onValueChange={(value) =>
              setFormData(prev => ({ ...prev, estado: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pendiente">Pendiente</SelectItem>
              <SelectItem value="En Proceso">En Proceso</SelectItem>
              <SelectItem value="Ejecutado">Ejecutado</SelectItem>
              <SelectItem value="Facturado">Facturado</SelectItem>
              <SelectItem value="Cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Coordinador</Label>
          <Input
            name="coordinador"
            value={formData.coordinador}
            onChange={handleInputChange}
            placeholder="Nombre del coordinador"
          />
        </div>
      </div>

      {!inDialog && (
        <div className={`flex justify-end gap-2 ${inDialog ? '' : 'border-t pt-4'}`}>
          <Button type="submit" size="sm">
            {servicio ? "Guardar Cambios" : "Crear Servicio"}
          </Button>
        </div>
      )}
    </form>
  );
} 