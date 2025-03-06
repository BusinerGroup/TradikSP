import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { 
  ChevronDown, 
  ChevronRight, 
  Users, 
  Briefcase, 
  CreditCard, 
  Building, 
  FileText, 
  ShoppingCart, 
  DollarSign, 
  PiggyBank, 
  BarChart4, 
  Settings,
  LayoutDashboard
} from "lucide-react";

export function Sidebar() {
  const location = useLocation();
  
  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full flex-col gap-2">
        <div className="px-3 py-2">
          <NavItem 
            href="/" 
            label="Menú Principal" 
            icon={<LayoutDashboard className="h-4 w-4" />} 
            isActive={location.pathname === "/"}
            className="mb-2 px-1 text-lg font-semibold"
          />
          <div className="space-y-1">
            <NavItemWithSubmenu 
              label="Terceros" 
              icon={<Users className="h-4 w-4" />}
              currentPath={location.pathname}
              submenuItems={[
                { href: "/terceros/clientes", label: "Clientes" },
                { href: "/terceros/proveedores", label: "Proveedores" },
                { href: "/terceros/empleados", label: "Empleados" },
                { href: "/terceros/contactos", label: "Contactos" }
              ]}
            />
            
            <NavItemWithSubmenu 
              label="Servicios" 
              icon={<Briefcase className="h-4 w-4" />}
              currentPath={location.pathname}
              submenuItems={[
                { href: "/servicios/catalogo", label: "Catálogo de Servicios" },
                { href: "/servicios/contratos", label: "Contratos" },
                { href: "/servicios/proyectos", label: "Proyectos" },
                { href: "/servicios/soporte", label: "Soporte Técnico" }
              ]}
            />
            
            <NavItemWithSubmenu 
              label="Tesorería" 
              icon={<CreditCard className="h-4 w-4" />}
              currentPath={location.pathname}
              submenuItems={[
                { href: "/tesoreria/facturas", label: "Facturas" },
                { href: "/tesoreria/pagos", label: "Pagos" },
                { href: "/tesoreria/cobros", label: "Cobros" },
                { href: "/tesoreria/informes", label: "Informes Financieros" }
              ]}
            />
          </div>
        </div>
        <Separator />
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Administración
          </h2>
          <div className="space-y-1">
            <NavItem 
              href="/configuracion" 
              label="Configuración" 
              icon={<Settings className="h-4 w-4" />} 
              isActive={location.pathname === "/configuracion"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ href, label, icon, isActive, className = "" }) {
  return (
    <Link
      to={href}
      className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
        isActive 
          ? "bg-accent text-accent-foreground" 
          : "hover:bg-accent hover:text-accent-foreground"
      } ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{label}</span>
    </Link>
  );
}

function NavItemWithSubmenu({ label, icon, submenuItems, currentPath }) {
  const isAnyChildActive = submenuItems.some(item => currentPath === item.href);
  const [isOpen, setIsOpen] = useState(isAnyChildActive);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full"
    >
      <CollapsibleTrigger className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium ${
        isAnyChildActive 
          ? "bg-accent/50 text-accent-foreground" 
          : "hover:bg-accent hover:text-accent-foreground"
      }`}>
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <span>{label}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-6 pt-1">
        <div className="flex flex-col space-y-1">
          {submenuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                currentPath === item.href 
                  ? "bg-accent text-accent-foreground" 
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
} 