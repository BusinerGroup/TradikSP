import { useState } from "react";
import { ProveedoresTable } from "@/components/proveedores/ProveedoresTable";

export function ProveedoresPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Gestión de Proveedores</h1>
        <p className="text-muted-foreground mt-2">
          Registre nuevos proveedores y administre la información de proveedores existentes.
        </p>
      </div>
      
      <ProveedoresTable />
    </div>
  );
} 