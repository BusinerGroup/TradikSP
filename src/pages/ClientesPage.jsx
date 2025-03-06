import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClienteForm } from "@/components/forms/ClienteForm";
import { ClientesTable } from "@/components/clientes/ClientesTable";

export function ClientesPage() {
  const [activeTab, setActiveTab] = useState("listado");

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Gestión de Clientes</h1>
        <p className="text-muted-foreground mt-2">
          Registre nuevos clientes y administre la información de clientes existentes.
        </p>
      </div>
      
      <Tabs defaultValue="listado" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="listado">Listado de Clientes</TabsTrigger>
          <TabsTrigger value="formulario">Formulario de Registro</TabsTrigger>
        </TabsList>
        <TabsContent value="listado">
          <ClientesTable />
        </TabsContent>
        <TabsContent value="formulario">
          <ClienteForm onSuccess={() => setActiveTab("listado")} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 