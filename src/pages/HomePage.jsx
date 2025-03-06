export function HomePage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold">Bienvenido al Sistema de Gestión</h1>
        <p className="text-muted-foreground max-w-2xl">
          Utilice el menú lateral para navegar entre las diferentes secciones del sistema.
          Gestione terceros, servicios y tesorería de manera eficiente.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {[
            { title: "Terceros", description: "Gestión de clientes, proveedores y empleados" },
            { title: "Servicios", description: "Administración de servicios y contratos" },
            { title: "Tesorería", description: "Control de facturas, pagos y cobros" }
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col h-40 w-full items-center justify-center rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
            >
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 