import { LogisticosTable } from "@/components/logisticos/LogisticosTable";

export function LogisticosPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Personal Logístico</h1>
        <p className="text-muted-foreground">
          Gestione el personal logístico, sus categorías y asignaciones desde este panel.
        </p>
      </div>
      <LogisticosTable />
    </div>
  );
} 