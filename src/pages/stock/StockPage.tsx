import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Package, AlertTriangle } from 'lucide-react';
import { mockStock } from '@/services/mockData';
import { StockItem } from '@/types/erp';
import { cn } from '@/lib/utils';

export default function StockPage() {
  const [search, setSearch] = useState('');
  
  const filteredStock = mockStock.filter(item => 
    item.designation.toLowerCase().includes(search.toLowerCase()) ||
    item.reference.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { 
      header: 'Référence', 
      accessor: (row: StockItem) => (
        <span className="font-mono text-sm font-medium text-primary">{row.reference}</span>
      )
    },
    { header: 'Désignation', accessor: 'designation' as const },
    { header: 'Catégorie', accessor: 'categorie' as const },
    { 
      header: 'Quantité', 
      accessor: (row: StockItem) => (
        <div className="flex items-center gap-2">
          <span className={cn(
            'font-semibold',
            row.quantite <= row.seuil_alerte ? 'text-destructive' : 'text-foreground'
          )}>
            {row.quantite}
          </span>
          {row.quantite <= row.seuil_alerte && (
            <AlertTriangle className="h-4 w-4 text-warning" />
          )}
        </div>
      )
    },
    { 
      header: 'Prix unitaire', 
      accessor: (row: StockItem) => `${row.prix_unitaire.toLocaleString()} TND`
    },
    { header: 'Emplacement', accessor: 'emplacement' as const },
  ];

  const totalValue = mockStock.reduce((acc, item) => acc + (item.quantite * item.prix_unitaire), 0);
  const lowStockCount = mockStock.filter(item => item.quantite <= item.seuil_alerte).length;

  return (
    <MainLayout title="Gestion du Stock" subtitle="Inventaire et mouvements de stock">
      {/* Stats */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
          <div className="rounded-lg bg-primary/10 p-3">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total articles</p>
            <p className="text-2xl font-semibold">{mockStock.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
          <div className="rounded-lg bg-success/10 p-3">
            <Package className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Valeur totale</p>
            <p className="text-2xl font-semibold">{totalValue.toLocaleString()} TND</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
          <div className="rounded-lg bg-warning/10 p-3">
            <AlertTriangle className="h-6 w-6 text-warning" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Stock faible</p>
            <p className="text-2xl font-semibold">{lowStockCount}</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un article..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nouvel article
        </Button>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredStock} />
    </MainLayout>
  );
}
