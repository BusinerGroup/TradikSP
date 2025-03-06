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
  documento: z.string().min(5, {
    message: "El documento debe tener al menos 5 caracteres.",
  }),
  direccion: z.string().min(5, {
    message: "La dirección debe tener al menos 5 caracteres.",
  }),
  telefono: z.string().min(7, {
    message: "El teléfono debe tener al menos 7 caracteres.",
  }),
  ciudad: z.string().min(2, {
    message: "La ciudad debe tener al menos 2 caracteres.",
  }),
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
      documento: "",
      direccion: "",
      telefono: "",
      ciudad: "",
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
                    className="bg-background border-2 border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </FormControl>
                <FormMessage className="text-sm font-medium text-destructive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="documento"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-base font-semibold text-foreground">Documento de Identificación</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Número de documento" 
                    {...field} 
                    className="bg-background border-2 border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </FormControl>
                <FormMessage className="text-sm font-medium text-destructive" />
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
                    placeholder="Número de teléfono" 
                    {...field} 
                    className="bg-background border-2 border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </FormControl>
                <FormMessage className="text-sm font-medium text-destructive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ciudad"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-base font-semibold text-foreground">Ciudad</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ciudad" 
                    {...field} 
                    className="bg-background border-2 border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </FormControl>
                <FormMessage className="text-sm font-medium text-destructive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tipoCliente"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-base font-semibold text-foreground">Tipo de Cliente</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-background border-2 border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <SelectValue placeholder="Seleccione un tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="corporativo">Corporativo</SelectItem>
                    <SelectItem value="gubernamental">Gubernamental</SelectItem>
                    <SelectItem value="educativo">Educativo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-sm font-medium text-destructive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="direccion"
            render={({ field }) => (
              <FormItem className="md:col-span-2 space-y-2">
                <FormLabel className="text-base font-semibold text-foreground">Dirección</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Dirección completa"
                    className="resize-none bg-background border-2 border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm font-medium text-destructive" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="font-medium border-2"
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="font-medium bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting ? "Guardando..." : "Guardar Cliente"}
          </Button>
        </div>
      </form>
    </Form>
  );

  // Si el formulario está dentro de un diálogo, devolver directamente el contenido
  if (inDialog) {
    return formContent;
  }

  // Si no, envolver en una tarjeta
  return (
    <Card className="w-full max-w-2xl mx-auto border-2 shadow-md">
      <CardHeader className="bg-muted/30">
        <CardTitle className="text-xl font-bold text-foreground">Registro de Cliente</CardTitle>
        <CardDescription className="text-muted-foreground font-medium">
          Ingrese los datos del nuevo cliente en el formulario a continuación.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {formContent}
      </CardContent>
    </Card>
  );
} 