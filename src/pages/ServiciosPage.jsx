import { ServiciosTable } from "@/components/servicios/ServiciosTable";

export function ServiciosPage() {
  return (
    <div className="container mx-auto py-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Servicios</h1>
        <p className="text-gray-600">
          Gestione los servicios, su planeación y seguimiento desde este panel.
        </p>
      </div>

      <ServiciosTable />
    </div>
  );
} 