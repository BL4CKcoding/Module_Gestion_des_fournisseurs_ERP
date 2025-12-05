import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { mockCommandes, mockFournisseurs } from '@/services/mockData';
import { Commande } from '@/types/erp';

export default function CommandesPage() {
  const [search, setSearch] = useState('');
  
  const getFournisseurName = (id: string) => {
    return mockFournisseurs.find(f => f.id === id)?.nom || 'N/A';
  };

  const columns = [
    { 
      header: 'N° Commande', 
      accessor: (row: Commande) => (
        <span className="font-mono text-sm font-medium text-primary">CMD-{row.id.padStart(4, '0')}</span>
      )
    },
    { 
      header: 'Fournisseur', 
      accessor: (row: Commande) => getFournisseurName(row.fournisseur_id)
    },
    { header: 'Date émission', accessor: 'date_emission' as const },
    { 
      header: 'Statut', 
      accessor: (row: Commande) => <StatusBadge status={row.status} />
    },
  ];

  return (
    <MainLayout title="Commandes" subtitle="Suivi des commandes fournisseurs">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher une commande..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle commande
        </Button>
      </div>

      <DataTable columns={columns} data={mockCommandes} />
    </MainLayout>
  );
}
