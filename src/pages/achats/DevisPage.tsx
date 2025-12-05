import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { mockDevis, mockFournisseurs } from '@/services/mockData';
import { Devis } from '@/types/erp';

export default function DevisPage() {
  const [search, setSearch] = useState('');
  
  const getFournisseurName = (id: string) => {
    return mockFournisseurs.find(f => f.id === id)?.nom || 'N/A';
  };

  const columns = [
    { 
      header: 'ID', 
      accessor: (row: Devis) => (
        <span className="font-mono text-sm font-medium text-primary">DEV-{row.id.padStart(3, '0')}</span>
      )
    },
    { 
      header: 'Fournisseur', 
      accessor: (row: Devis) => getFournisseurName(row.fournisseur_id)
    },
    { 
      header: 'Prix proposé', 
      accessor: (row: Devis) => `${row.prix_propose.toLocaleString()} TND`
    },
    { header: 'Délai', accessor: 'delai_livraison' as const },
    { 
      header: 'Statut', 
      accessor: (row: Devis) => <StatusBadge status={row.status} />
    },
    { header: 'Conditions', accessor: 'conditions' as const },
  ];

  return (
    <MainLayout title="Devis" subtitle="Gestion des devis fournisseurs">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un devis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nouveau devis
        </Button>
      </div>

      <DataTable columns={columns} data={mockDevis} />
    </MainLayout>
  );
}
