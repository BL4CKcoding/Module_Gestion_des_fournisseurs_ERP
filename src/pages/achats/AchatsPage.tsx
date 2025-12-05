import { MainLayout } from '@/components/layout/MainLayout';
import { KPICard } from '@/components/ui/KPICard';
import { ClipboardList, FileText, Truck, CheckCircle } from 'lucide-react';
import { mockDemandesAchat, mockDevis, mockCommandes } from '@/services/mockData';
import { Link } from 'react-router-dom';

export default function AchatsPage() {
  const pendingDemandes = mockDemandesAchat.filter(d => d.status === 'CREATED' || d.status === 'SENT').length;
  const pendingDevis = mockDevis.filter(d => d.status !== 'VALIDATED').length;
  const activeCommandes = mockCommandes.filter(c => c.status === 'IN_DELIVERY').length;

  return (
    <MainLayout title="Module Achats" subtitle="Gestion du processus d'approvisionnement">
      {/* KPI Overview */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Demandes en attente"
          value={pendingDemandes}
          icon={ClipboardList}
          iconColor="bg-info/10 text-info"
        />
        <KPICard
          title="Devis à traiter"
          value={pendingDevis}
          icon={FileText}
          iconColor="bg-warning/10 text-warning"
        />
        <KPICard
          title="Commandes actives"
          value={activeCommandes}
          icon={Truck}
          iconColor="bg-primary/10 text-primary"
        />
        <KPICard
          title="Taux de validation"
          value="87%"
          change="+5% vs mois dernier"
          changeType="positive"
          icon={CheckCircle}
          iconColor="bg-success/10 text-success"
        />
      </div>

      {/* Quick Links */}
      <div className="grid gap-6 md:grid-cols-3">
        <Link 
          to="/achats/demandes"
          className="group rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary hover:shadow-lg"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-info/10 transition-colors group-hover:bg-info/20">
            <ClipboardList className="h-6 w-6 text-info" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-card-foreground">Demandes d'achat</h3>
          <p className="text-sm text-muted-foreground">
            Créer et gérer les demandes d'approvisionnement
          </p>
        </Link>

        <Link 
          to="/achats/devis"
          className="group rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary hover:shadow-lg"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10 transition-colors group-hover:bg-warning/20">
            <FileText className="h-6 w-6 text-warning" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-card-foreground">Devis</h3>
          <p className="text-sm text-muted-foreground">
            Analyser et comparer les offres fournisseurs
          </p>
        </Link>

        <Link 
          to="/achats/commandes"
          className="group rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary hover:shadow-lg"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
            <Truck className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-card-foreground">Commandes</h3>
          <p className="text-sm text-muted-foreground">
            Suivre les commandes et les livraisons
          </p>
        </Link>
      </div>
    </MainLayout>
  );
}
