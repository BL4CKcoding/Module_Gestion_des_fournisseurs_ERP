import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Facture } from '@/types/erp';
import { FileCheck, CreditCard, Ban, Eye } from 'lucide-react';

interface FactureTableProps {
  factures: Facture[];
  onControle: (facture: Facture) => void;
  onPaiement: (facture: Facture) => void;
  onRejet: (facture: Facture) => void;
  onView: (facture: Facture) => void;
}

export function FactureTable({
  factures,
  onControle,
  onPaiement,
  onRejet,
  onView,
}: FactureTableProps) {
  const columns = [
    { 
      header: 'N° Facture', 
      accessor: (row: Facture) => (
        <span className="font-mono text-sm font-medium text-primary">
          FAC-{row.id.padStart(4, '0')}
        </span>
      )
    },
    { 
      header: 'Bon de livraison', 
      accessor: (row: Facture) => (
        <span className="font-mono text-sm text-muted-foreground">
          BL-{row.bon_livraison_id.padStart(4, '0')}
        </span>
      )
    },
    { 
      header: 'Montant', 
      accessor: (row: Facture) => (
        <span className="font-semibold">{row.montant.toLocaleString()} TND</span>
      )
    },
    { header: 'Date', accessor: 'date_facture' as const },
    { 
      header: 'Statut', 
      accessor: (row: Facture) => <StatusBadge status={row.status} />
    },
    {
      header: 'Actions',
      accessor: (row: Facture) => (
        <div className="flex gap-1">
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-7 w-7 p-0"
            onClick={() => onView(row)}
          >
            <Eye className="h-3.5 w-3.5" />
          </Button>
          
          {row.status === 'RECEIVED' && (
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 gap-1 text-xs"
              onClick={() => onControle(row)}
            >
              <FileCheck className="h-3 w-3" />
              Contrôler
            </Button>
          )}
          
          {row.status === 'VALIDATED' && (
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 gap-1 text-xs"
              onClick={() => onPaiement(row)}
            >
              <CreditCard className="h-3 w-3" />
              Payer
            </Button>
          )}
          
          {(row.status === 'RECEIVED' || row.status === 'VALIDATED') && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-7 gap-1 text-xs text-destructive hover:text-destructive"
              onClick={() => onRejet(row)}
            >
              <Ban className="h-3 w-3" />
              Rejeter
            </Button>
          )}
        </div>
      )
    },
  ];

  return <DataTable columns={columns} data={factures} />;
}
