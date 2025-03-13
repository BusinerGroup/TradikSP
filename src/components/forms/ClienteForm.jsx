import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Esquema de validación con Zod
const formSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  tipoDocumento: z.string({
    required_error: "Por favor seleccione un tipo de documento.",
  }),
  numeroDocumento: z.string()
    .min(5, {
      message: "El número de documento debe tener al menos 5 caracteres.",
    })
    .regex(/^\d+$/, {
      message: "El número de documento debe contener solo dígitos numéricos.",
    }),
  direccion: z.string().min(5, {
    message: "La dirección debe tener al menos 5 caracteres.",
  }),
  ciudad: z.string().min(2, {
    message: "La ciudad debe tener al menos 2 caracteres.",
  }),
  contacto: z.string().min(2, {
    message: "El contacto debe tener al menos 2 caracteres.",
  }),
  telefono: z.string()
    .min(7, {
      message: "El teléfono debe tener al menos 7 caracteres.",
    })
    .regex(/^\d+$/, {
      message: "El teléfono debe contener solo dígitos numéricos.",
    }),
  email: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }).optional(),
  tipoCliente: z.string({
    required_error: "Por favor seleccione un tipo de cliente.",
  }),
});

export function ClienteForm({ onSuccess, inDialog = false, initialData = null }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Definir el formulario con React Hook Form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      nombre: "",
      tipoDocumento: "",
      numeroDocumento: "",
      direccion: "",
      ciudad: "",
      contacto: "",
      telefono: "",
      email: "",
      tipoCliente: "",
    },
  });

  // Función para manejar el envío del formulario
  function onSubmit(values) {
    setIsSubmitting(true);
    
    // Simulando una petición a un servidor
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      alert("Cliente guardado con éxito");
      form.reset();
      if (onSuccess) onSuccess();
    }, 1000);
  }

  // Contenido del formulario
  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-base font-semibold text-foreground">Nombre</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Nombre completo" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="tipoCliente"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-base font-semibold text-foreground">Tipo de Cliente</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Venue">Venue</SelectItem>
                    <SelectItem value="OPC">OPC</SelectItem>
                    <SelectItem value="Productor">Productor</SelectItem>
                    <SelectItem value="Centro de Convenciones">Centro de Convenciones</SelectItem>
                    <SelectItem value="Hotel">Hotel</SelectItem>
                    <SelectItem value="Restaurante">Restaurante</SelectItem>
                    <SelectItem value="Wedding & Event Planner">Wedding & Event Planner</SelectItem>
                    <SelectItem value="Colega">Colega</SelectItem>
                    <SelectItem value="Agencia de Publicidad">Agencia de Publicidad</SelectItem>
                    <SelectItem value="Institucional">Institucional</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="tipoDocumento"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-base font-semibold text-foreground">Tipo de Documento</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Cédula de Ciudadanía">Cédula de Ciudadanía</SelectItem>
                    <SelectItem value="NIT">NIT</SelectItem>
                    <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="numeroDocumento"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-base font-semibold text-foreground">Número de Documento</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Número de documento" 
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    {...field} 
                    onChange={(e) => {
                      // Solo permitir dígitos
                      const value = e.target.value.replace(/\D/g, '');
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="direccion"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-base font-semibold text-foreground">Dirección</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Dirección completa" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="ciudad"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-base font-semibold text-foreground">Ciudad</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una ciudad" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Bogotá">Bogotá</SelectItem>
                    <SelectItem value="Medellín">Medellín</SelectItem>
                    <SelectItem value="Cali">Cali</SelectItem>
                    <SelectItem value="Barranquilla">Barranquilla</SelectItem>
                    <SelectItem value="Cartagena">Cartagena</SelectItem>
                    <SelectItem value="Bucaramanga">Bucaramanga</SelectItem>
                    <SelectItem value="Pereira">Pereira</SelectItem>
                    <SelectItem value="Santa Marta">Santa Marta</SelectItem>
                    <SelectItem value="Manizales">Manizales</SelectItem>
                    <SelectItem value="Villavicencio">Villavicencio</SelectItem>
                    <SelectItem value="Pasto">Pasto</SelectItem>
                    <SelectItem value="Otra">Otra</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="contacto"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-base font-semibold text-foreground">Contacto</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Nombre de la persona de contacto" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-base font-semibold text-foreground">Teléfono</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Teléfono de contacto" 
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    {...field} 
                    onChange={(e) => {
                      // Solo permitir dígitos
                      const value = e.target.value.replace(/\D/g, '');
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-base font-semibold text-foreground">Correo Electrónico</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="correo@ejemplo.com" 
                    type="email"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {!inDialog && (
          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                form.reset();
                if (onSuccess) onSuccess();
              }}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? "Guardando..." : "Guardar Cliente"}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );

  // Si está en un diálogo, mostrar solo el contenido del formulario
  if (inDialog) {
    return formContent;
  }

  // Si no está en un diálogo, mostrar con tarjeta
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {initialData ? "Editar Cliente" : "Nuevo Cliente"}
        </CardTitle>
        <CardDescription>
          Complete el formulario para {initialData ? "actualizar la información del" : "registrar un nuevo"} cliente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {formContent}
      </CardContent>
    </Card>
  );
} 