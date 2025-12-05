import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { mockDemandesAchat } from '@/services/mockData';
import { DemandeAchat } from '@/types/erp';

export default function DemandesPage() {
  const [search, setSearch] = useState('');
  
  const filteredDemandes = mockDemandesAchat.filter(d => 
    d.reference.toLowerCase().includes(search.toLowerCase()) ||
    d.produit.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { 
      header: 'Référence', 
      accessor: (row: DemandeAchat) => (
        <span className="font-mono text-sm font-medium text-primary">{row.reference}</span>
      )
    },
    { header: 'Produit', accessor: 'produit' as const },
    { header: 'Quantité', accessor: 'quantite' as const },
    { 
      header: 'Statut', 
      accessor: (row: DemandeAchat) => <StatusBadge status={row.status} />
    },
    { header: 'Responsable', accessor: 'stock_responsable' as const },
    { header: 'Date', accessor: 'date_creation' as const },
  ];

  return (
    <MainLayout title="Demandes d'Achat" subtitle="Gérer les demandes d'approvisionnement">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher une demande..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle demande
        </Button>
      </div>

      <DataTable columns={columns} data={filteredDemandes} />
    </MainLayout>
  );
}
