import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Mail, Phone, MapPin } from 'lucide-react';
import { mockFournisseurs } from '@/services/mockData';
import { Fournisseur } from '@/types/erp';

export default function FournisseursPage() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'table' | 'cards'>('cards');
  
  const filteredFournisseurs = mockFournisseurs.filter(f => 
    f.nom.toLowerCase().includes(search.toLowerCase()) ||
    f.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { header: 'Nom', accessor: 'nom' as const },
    { header: 'Email', accessor: 'email' as const },
    { header: 'Téléphone', accessor: 'telephone' as const },
    { 
      header: 'Statut', 
      accessor: (row: Fournisseur) => <StatusBadge status={row.statut} />
    },
    { 
      header: 'Documents', 
      accessor: (row: Fournisseur) => `${row.documents.length} fichier(s)`
    },
  ];

  return (
    <MainLayout title="Fournisseurs" subtitle="Gestion de la base fournisseurs">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un fournisseur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={view === 'cards' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setView('cards')}
          >
            Cartes
          </Button>
          <Button 
            variant={view === 'table' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setView('table')}
          >
            Tableau
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nouveau
          </Button>
        </div>
      </div>

      {view === 'cards' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFournisseurs.map(fournisseur => (
            <div 
              key={fournisseur.id}
              className="rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-lg"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">{fournisseur.nom}</h3>
                  <StatusBadge status={fournisseur.statut} className="mt-1" />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {fournisseur.nom.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{fournisseur.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{fournisseur.telephone}</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{fournisseur.adresse}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Voir détails
                </Button>
                <Button variant="outline" size="sm">
                  Modifier
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <DataTable columns={columns} data={filteredFournisseurs} />
      )}
    </MainLayout>
  );
}
