import { Users, DollarSign, CreditCard, Activity } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { BarChartComponent } from "@/components/dashboard/BarChartComponent";
import { LineChartComponent } from "@/components/dashboard/LineChartComponent";
import { PieChartComponent } from "@/components/dashboard/PieChartComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Datos de ejemplo para los gráficos
const barChartData = [
  { name: "Ene", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Abr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
];

const lineChartData = [
  { name: "Ene", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Abr", value: 8000 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 9500 },
];

const pieChartData = [
  { name: "Clientes", value: 400 },
  { name: "Proveedores", value: 300 },
  { name: "Empleados", value: 200 },
  { name: "Contactos", value: 100 },
];

export function DashboardPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Resumen de estadísticas y métricas clave del sistema.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Clientes"
          value="2,345"
          icon={<Users className="h-4 w-4" />}
          description="Total de clientes registrados"
          trend="up"
          trendValue="+12.5% desde el mes pasado"
        />
        <StatCard
          title="Ingresos"
          value="$45,231.89"
          icon={<DollarSign className="h-4 w-4" />}
          description="Ingresos del mes actual"
          trend="up"
          trendValue="+8.2% desde el mes pasado"
        />
        <StatCard
          title="Facturas Pendientes"
          value="12"
          icon={<CreditCard className="h-4 w-4" />}
          description="Facturas pendientes de pago"
          trend="down"
          trendValue="-3 desde el mes pasado"
        />
        <StatCard
          title="Tasa de Conversión"
          value="24.5%"
          icon={<Activity className="h-4 w-4" />}
          description="Tasa de conversión de prospectos"
          trend="up"
          trendValue="+2.1% desde el mes pasado"
        />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <BarChartComponent 
          title="Ventas Mensuales" 
          data={barChartData} 
        />
        <LineChartComponent 
          title="Ingresos Mensuales" 
          data={lineChartData} 
        />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PieChartComponent 
          title="Distribución de Terceros" 
          data={pieChartData} 
        />
        <Card className="col-span-1 md:col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: "Juan Pérez", action: "creó un nuevo cliente", time: "hace 2 horas" },
                { user: "María García", action: "generó una factura", time: "hace 3 horas" },
                { user: "Carlos Rodríguez", action: "registró un pago", time: "hace 5 horas" },
                { user: "Ana Martínez", action: "actualizó un contrato", time: "hace 1 día" },
                { user: "Luis Sánchez", action: "añadió un nuevo proveedor", time: "hace 1 día" },
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-4 rounded-full bg-primary/10 p-2">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      <span className="font-semibold">{item.user}</span> {item.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 