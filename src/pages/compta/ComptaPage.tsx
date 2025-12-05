import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { KPICard } from '@/components/ui/KPICard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Receipt, 
  CheckCircle, 
  Clock, 
  CreditCard,
  FileCheck,
  XCircle,
  Banknote
} from 'lucide-react';
import { Facture } from '@/types/erp';
import { useFactures } from '@/hooks/useFactures';
import { NouvelleFactureDialog } from '@/components/compta/NouvelleFactureDialog';
import { ControleConformiteDialog } from '@/components/compta/ControleConformiteDialog';
import { PaiementDialog } from '@/components/compta/PaiementDialog';
import { RejetFactureDialog } from '@/components/compta/RejetFactureDialog';
import { FactureDetailsDialog } from '@/components/compta/FactureDetailsDialog';
import { FactureTable } from '@/components/compta/FactureTable';
import { WorkflowDiagram } from '@/components/compta/WorkflowDiagram';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export default function ComptaPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Dialog states
  const [controleDialogOpen, setControleDialogOpen] = useState(false);
  const [paiementDialogOpen, setPaiementDialogOpen] = useState(false);
  const [rejetDialogOpen, setRejetDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedFacture, setSelectedFacture] = useState<Facture | null>(null);

  const {
    factures,
    stats,
    receptionFacture,
    controleFacture,
    paiementFacture,
    rejetFacture,
  } = useFactures();

  // Filter factures based on search and tab
  const filteredFactures = factures.filter(f => {
    const matchesSearch = 
      f.id.includes(search) || 
      f.montant.toString().includes(search) ||
      f.date_facture.includes(search);
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'received') return matchesSearch && f.status === 'RECEIVED';
    if (activeTab === 'validated') return matchesSearch && f.status === 'VALIDATED';
    if (activeTab === 'paid') return matchesSearch && f.status === 'PAID';
    if (activeTab === 'rejected') return matchesSearch && f.status === 'REJECTED';
    return matchesSearch;
  });

  // Action handlers
  const handleControle = (facture: Facture) => {
    setSelectedFacture(facture);
    setControleDialogOpen(true);
  };

  const handlePaiement = (facture: Facture) => {
    setSelectedFacture(facture);
    setPaiementDialogOpen(true);
  };

  const handleRejet = (facture: Facture) => {
    setSelectedFacture(facture);
    setRejetDialogOpen(true);
  };

  const handleView = (facture: Facture) => {
    setSelectedFacture(facture);
    setDetailsDialogOpen(true);
  };

  return (
    <MainLayout title="Comptabilité" subtitle="Gestion des factures et paiements — Module Aziz Lakhal">
      {/* KPI Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <KPICard
          title="Factures reçues"
          value={stats.received}
          icon={Receipt}
          iconColor="bg-info/10 text-info"
        />
        <KPICard
          title="À valider"
          value={stats.validated}
          icon={Clock}
          iconColor="bg-warning/10 text-warning"
        />
        <KPICard
          title="Payées"
          value={stats.paid}
          icon={CheckCircle}
          iconColor="bg-success/10 text-success"
        />
        <KPICard
          title="Rejetées"
          value={stats.rejected}
          icon={XCircle}
          iconColor="bg-destructive/10 text-destructive"
        />
        <KPICard
          title="Montant en attente"
          value={`${stats.pendingAmount.toLocaleString()} TND`}
          icon={Banknote}
          iconColor="bg-primary/10 text-primary"
        />
      </div>

      {/* Workflow Diagram */}
      <div className="mb-8">
        <WorkflowDiagram stats={stats} />
      </div>

      {/* Quick Actions */}
      <div className="mb-6 rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-card-foreground">Actions rapides</h3>
        <div className="flex flex-wrap gap-3">
          <NouvelleFactureDialog onSubmit={receptionFacture} />
          
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => {
              const receivedFacture = factures.find(f => f.status === 'RECEIVED');
              if (receivedFacture) handleControle(receivedFacture);
            }}
            disabled={stats.received === 0}
          >
            <FileCheck className="h-4 w-4" />
            Contrôle factures ({stats.received})
          </Button>
          
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => {
              const validatedFacture = factures.find(f => f.status === 'VALIDATED');
              if (validatedFacture) handlePaiement(validatedFacture);
            }}
            disabled={stats.validated === 0}
          >
            <CreditCard className="h-4 w-4" />
            Traiter paiements ({stats.validated})
          </Button>
        </div>
      </div>

      {/* Factures Table with Tabs */}
      <div className="rounded-xl border border-border bg-card">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between border-b border-border">
            <TabsList>
              <TabsTrigger value="all">Toutes ({factures.length})</TabsTrigger>
              <TabsTrigger value="received">Reçues ({stats.received})</TabsTrigger>
              <TabsTrigger value="validated">Validées ({stats.validated})</TabsTrigger>
              <TabsTrigger value="paid">Payées ({stats.paid})</TabsTrigger>
              <TabsTrigger value="rejected">Rejetées ({stats.rejected})</TabsTrigger>
            </TabsList>
            
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <TabsContent value={activeTab} className="m-0">
            <FactureTable
              factures={filteredFactures}
              onControle={handleControle}
              onPaiement={handlePaiement}
              onRejet={handleRejet}
              onView={handleView}
            />
          </TabsContent>
        </Tabs>
      </div>


      {/* Dialogs */}
      <ControleConformiteDialog
        facture={selectedFacture}
        open={controleDialogOpen}
        onOpenChange={setControleDialogOpen}
        onControle={controleFacture}
      />
      
      <PaiementDialog
        facture={selectedFacture}
        open={paiementDialogOpen}
        onOpenChange={setPaiementDialogOpen}
        onPaiement={paiementFacture}
      />
      
      <RejetFactureDialog
        facture={selectedFacture}
        open={rejetDialogOpen}
        onOpenChange={setRejetDialogOpen}
        onRejet={rejetFacture}
      />
      
      <FactureDetailsDialog
        facture={selectedFacture}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
      />
    </MainLayout>
  );
}
