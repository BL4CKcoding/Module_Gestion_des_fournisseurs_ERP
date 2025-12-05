import { NavLink, useLocation } from 'react-router-dom';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  Receipt, 
  LayoutDashboard,
  ChevronRight,
  FileText,
  ClipboardList,
  Truck
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Tableau de bord', href: '/', icon: LayoutDashboard },
  { name: 'Stock', href: '/stock', icon: Package },
  { 
    name: 'Achats', 
    href: '/achats',
    icon: ShoppingCart,
    children: [
      { name: 'Demandes', href: '/achats/demandes', icon: ClipboardList },
      { name: 'Devis', href: '/achats/devis', icon: FileText },
      { name: 'Commandes', href: '/achats/commandes', icon: Truck },
    ]
  },
  { name: 'Fournisseurs', href: '/fournisseurs', icon: Users },
  { name: 'Comptabilité', href: '/compta', icon: Receipt },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
            <Package className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">ERP System</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 scrollbar-thin">
          {navigation.map((item) => (
            <div key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive && !item.children
                      ? 'bg-sidebar-accent text-sidebar-primary'
                      : 'text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground'
                  )
                }
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="flex-1">{item.name}</span>
                {item.children && (
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:rotate-90" />
                )}
              </NavLink>
              
              {item.children && location.pathname.startsWith('/achats') && (
                <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-4">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.name}
                      to={child.href}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200',
                          isActive
                            ? 'bg-sidebar-accent text-sidebar-primary'
                            : 'text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground'
                        )
                      }
                    >
                      <child.icon className="h-4 w-4" />
                      {child.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary text-sm font-medium text-sidebar-primary-foreground">
              AL
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Aziz Lakhal</p>
              <p className="text-xs text-sidebar-muted truncate">Comptabilité</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
