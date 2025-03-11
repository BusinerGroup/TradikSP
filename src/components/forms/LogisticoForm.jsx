import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SheetClose } from "@/components/ui/sheet";

export function LogisticoForm({ initialData, onSuccess, inDialog = false }) {
  const [formData, setFormData] = useState(initialData || {
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    numeroDocumento: "",
    categoria: "",
    fechaNacimiento: "",
    direccion: "",
    ciudad: "",
    telefono: "",
    email: "",
    licenciaConduccion: "",
    fechaIngreso: "",
    eps: "",
    arl: "",
    contactoEmergencia: "",
    telefonoEmergencia: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Guardando personal logístico:", formData);
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nombres">Nombres</Label>
          <Input
            id="nombres"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="apellidos">Apellidos</Label>
          <Input
            id="apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoria">Categoría</Label>
          <Select
            value={formData.categoria}
            onValueChange={(value) => handleSelectChange("categoria", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Auxiliar">Auxiliar</SelectItem>
              <SelectItem value="Auxiliar Líder">Auxiliar Líder</SelectItem>
              <SelectItem value="Técnico">Técnico</SelectItem>
              <SelectItem value="Coordinador">Coordinador</SelectItem>
              <SelectItem value="Almacenista">Almacenista</SelectItem>
              <SelectItem value="Conductor">Conductor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
          <Select
            value={formData.tipoDocumento}
            onValueChange={(value) => handleSelectChange("tipoDocumento", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
              <SelectItem value="CE">Cédula de Extranjería</SelectItem>
              <SelectItem value="PA">Pasaporte</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="numeroDocumento">Número de Documento</Label>
          <Input
            id="numeroDocumento"
            name="numeroDocumento"
            value={formData.numeroDocumento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
          <Input
            id="fechaNacimiento"
            name="fechaNacimiento"
            type="date"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="direccion">Dirección</Label>
          <Input
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ciudad">Ciudad</Label>
          <Input
            id="ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="licenciaConduccion">Licencia de Conducción</Label>
          <Input
            id="licenciaConduccion"
            name="licenciaConduccion"
            value={formData.licenciaConduccion}
            onChange={handleChange}
            placeholder="Opcional - Solo para conductores"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fechaIngreso">Fecha de Ingreso</Label>
          <Input
            id="fechaIngreso"
            name="fechaIngreso"
            type="date"
            value={formData.fechaIngreso}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="eps">EPS</Label>
          <Input
            id="eps"
            name="eps"
            value={formData.eps}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="arl">ARL</Label>
          <Input
            id="arl"
            name="arl"
            value={formData.arl}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactoEmergencia">Contacto de Emergencia</Label>
          <Input
            id="contactoEmergencia"
            name="contactoEmergencia"
            value={formData.contactoEmergencia}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telefonoEmergencia">Teléfono de Emergencia</Label>
          <Input
            id="telefonoEmergencia"
            name="telefonoEmergencia"
            value={formData.telefonoEmergencia}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {!inDialog && (
        <div className="flex justify-end gap-2">
          {inDialog && (
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </SheetClose>
          )}
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            {initialData ? "Guardar Cambios" : "Guardar Personal"}
          </Button>
        </div>
      )}
    </form>
  );
} 