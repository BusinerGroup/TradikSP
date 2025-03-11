import { useState } from "react";
import { ClientesTable } from "@/components/clientes/ClientesTable";

export function ClientesPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Gestión de Clientes</h1>
        <p className="text-muted-foreground mt-2">
          Registre nuevos clientes y administre la información de clientes existentes.
        </p>
      </div>
      
      <ClientesTable />
    </div>
  );
} 