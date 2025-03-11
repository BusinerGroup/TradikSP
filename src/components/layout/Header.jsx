import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { 
  Menu, 
  ChevronDown, 
  ChevronRight, 
  Users, 
  Briefcase, 
  CreditCard, 
  Settings,
  LayoutDashboard
} from "lucide-react";

export function Header({ onSidebarToggle }) {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <MobileNav />
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-lg font-semibold">
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Sun Partners</span>
                <span className="mx-2 text-gray-400">-</span>
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Control de Eventos</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Iniciar sesión
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  const location = useLocation();
  
  return (
    <div className="flex flex-col gap-4 p-4">
      <NavLink 
        href="/" 
        label="Menú Principal" 
        icon={<LayoutDashboard className="h-4 w-4" />} 
        isActive={location.pathname === "/"}
        className="text-lg font-semibold mb-2"
      />
      <NavLinkWithSubmenu 
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
      
      <NavLinkWithSubmenu 
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
      
      <NavLinkWithSubmenu 
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
      
      <NavLink 
        href="/configuracion" 
        label="Configuración" 
        icon={<Settings className="h-4 w-4" />} 
        isActive={location.pathname === "/configuracion"}
      />
    </div>
  );
}

function NavLink({ href, label, icon, isActive, className = "" }) {
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

function NavLinkWithSubmenu({ label, icon, submenuItems, currentPath }) {
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