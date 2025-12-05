import { cn } from '@/lib/utils';

type StatusType = 
  | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  | 'CREATED' | 'SENT' | 'APPROVED' | 'REJECTED' 
  | 'RECEIVED' | 'ANALYSED' | 'NEGOTIATED' | 'VALIDATED'
  | 'EMITTED' | 'ACCEPTED' | 'IN_DELIVERY'
  | 'PENDING' | 'PAID'
  | 'actif' | 'suspendu';

const statusConfig: Record<string, { label: string; className: string }> = {
  success: { label: 'Succès', className: 'bg-success/10 text-success border-success/20' },
  warning: { label: 'Attention', className: 'bg-warning/10 text-warning border-warning/20' },
  error: { label: 'Erreur', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  info: { label: 'Info', className: 'bg-info/10 text-info border-info/20' },
  neutral: { label: 'Neutre', className: 'bg-muted text-muted-foreground border-border' },
  
  // Demande d'achat statuses
  CREATED: { label: 'Créée', className: 'bg-muted text-muted-foreground border-border' },
  SENT: { label: 'Envoyée', className: 'bg-info/10 text-info border-info/20' },
  APPROVED: { label: 'Approuvée', className: 'bg-success/10 text-success border-success/20' },
  REJECTED: { label: 'Rejetée', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  
  // Devis statuses
  RECEIVED: { label: 'Reçu', className: 'bg-info/10 text-info border-info/20' },
  ANALYSED: { label: 'Analysé', className: 'bg-warning/10 text-warning border-warning/20' },
  NEGOTIATED: { label: 'Négocié', className: 'bg-accent/10 text-accent border-accent/20' },
  VALIDATED: { label: 'Validé', className: 'bg-success/10 text-success border-success/20' },
  
  // Commande statuses
  EMITTED: { label: 'Émise', className: 'bg-muted text-muted-foreground border-border' },
  ACCEPTED: { label: 'Acceptée', className: 'bg-success/10 text-success border-success/20' },
  IN_DELIVERY: { label: 'En livraison', className: 'bg-info/10 text-info border-info/20' },
  
  // Bon de livraison statuses
  PENDING: { label: 'En attente', className: 'bg-warning/10 text-warning border-warning/20' },
  
  // Facture statuses
  PAID: { label: 'Payée', className: 'bg-success/10 text-success border-success/20' },
  
  // Fournisseur statuses
  actif: { label: 'Actif', className: 'bg-success/10 text-success border-success/20' },
  suspendu: { label: 'Suspendu', className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.neutral;
  
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
