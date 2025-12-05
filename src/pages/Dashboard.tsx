import { MainLayout } from '@/components/layout/MainLayout';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Package, ShoppingCart, Users, Receipt, AlertTriangle, TrendingUp } from 'lucide-react';
import { mockStock, mockDemandesAchat, mockFactures } from '@/services/mockData';

export default function Dashboard() {
  const lowStockItems = mockStock.filter(item => item.quantite <= item.seuil_alerte);
  const pendingDemandes = mockDemandesAchat.filter(d => d.status === 'CREATED' || d.status === 'SENT');
  const pendingFactures = mockFactures.filter(f => f.status === 'RECEIVED' || f.status === 'VALIDATED');

  const recentActivityColumns = [
    { header: 'Référence', accessor: 'reference' as const },
    { header: 'Produit', accessor: 'produit' as const },
    { 
      header: 'Statut', 
      accessor: (row: typeof mockDemandesAchat[0]) => <StatusBadge status={row.status} />
    },
    { header: 'Date', accessor: 'date_creation' as const },
  ];

  return (
    <MainLayout title="Tableau de bord" subtitle="Vue d'ensemble de votre système ERP">
      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Articles en stock"
          value={mockStock.reduce((acc, item) => acc + item.quantite, 0)}
          change="+12% ce mois"
          changeType="positive"
          icon={Package}
          iconColor="bg-primary/10 text-primary"
        />
        <KPICard
          title="Demandes en cours"
          value={pendingDemandes.length}
          change={`${mockDemandesAchat.length} total`}
          changeType="neutral"
          icon={ShoppingCart}
          iconColor="bg-info/10 text-info"
        />
        <KPICard
          title="Fournisseurs actifs"
          value={3}
          change="2 nouveaux"
          changeType="positive"
          icon={Users}
          iconColor="bg-success/10 text-success"
        />
        <KPICard
          title="Factures à traiter"
          value={pendingFactures.length}
          change={`${mockFactures.reduce((acc, f) => acc + f.montant, 0).toLocaleString()} TND`}
          changeType="neutral"
          icon={Receipt}
          iconColor="bg-warning/10 text-warning"
        />
      </div>

      {/* Alerts & Activity */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Stock Alerts */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <h2 className="text-lg font-semibold text-card-foreground">Alertes Stock</h2>
          </div>
          {lowStockItems.length > 0 ? (
            <div className="space-y-3">
              {lowStockItems.map(item => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between rounded-lg bg-warning/5 border border-warning/20 p-3"
                >
                  <div>
                    <p className="font-medium text-card-foreground">{item.designation}</p>
                    <p className="text-sm text-muted-foreground">{item.reference}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-warning">{item.quantite} unités</p>
                    <p className="text-xs text-muted-foreground">Seuil: {item.seuil_alerte}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Aucune alerte de stock</p>
          )}
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-card-foreground">Demandes récentes</h2>
          </div>
          <div className="space-y-3">
            {mockDemandesAchat.slice(0, 4).map(demande => (
              <div 
                key={demande.id}
                className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
              >
                <div>
                  <p className="font-medium text-card-foreground">{demande.reference}</p>
                  <p className="text-sm text-muted-foreground">{demande.produit}</p>
                </div>
                <StatusBadge status={demande.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
