import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Plus, ChevronRight, ChevronLeft } from "lucide-react";
import { ServicioForm } from "@/components/forms/ServicioForm";
import { ServicioDetalle } from "./ServicioDetalle";

export function NuevoServicioDrawer({ onSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleSuccess = (data) => {
    setIsOpen(false);
    if (onSuccess) {
      onSuccess(data);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="font-medium bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Servicio
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="flex flex-col w-full sm:max-w-md md:max-w-xl lg:max-w-4xl xl:max-w-5xl overflow-y-auto bg-gray-50"
      >
        <SheetHeader className="border-b bg-white shadow-sm pb-4">
          <SheetTitle className="text-xl font-bold text-gray-900">
            Nuevo Servicio
          </SheetTitle>
          <SheetDescription className="text-gray-600">
            Complete el formulario para registrar un nuevo servicio.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-6">
          <div className="px-4 mb-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="bg-white hover:bg-gray-50"
            >
              {showDetails ? (
                <>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Volver al Formulario
                </>
              ) : (
                <>
                  Detalle del Servicio
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
          
          <div className="px-4">
            {!showDetails ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ServicioForm 
                  inDialog={true} 
                  onSuccess={handleSuccess} 
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ServicioDetalle />
              </div>
            )}
          </div>
        </div>
        
        <SheetFooter className="border-t bg-white py-4 px-6">
          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              form="servicioForm"
              variant="outline"
              size="sm"
              className="bg-white hover:bg-blue-50 text-blue-600"
            >
              Guardar
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
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
} 