import { useNavigate } from "react-router-dom";
import { ClienteForm } from "@/components/forms/ClienteForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function NuevoClientePage() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Redirigir a la página de clientes después de guardar
    navigate("/terceros/clientes");
  };

  const handleVolver = () => {
    navigate("/terceros/clientes");
  };

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleVolver}
          className="mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Nuevo Cliente</h1>
          <p className="text-muted-foreground mt-2">
            Complete el formulario para registrar un nuevo cliente en el sistema.
          </p>
        </div>
      </div>
      
      <ClienteForm onSuccess={handleSuccess} />
    </div>
  );
} 