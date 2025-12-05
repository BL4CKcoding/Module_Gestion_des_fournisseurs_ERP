import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Facture } from '@/types/erp';
import { mockBonsLivraison, mockCommandes, mockFournisseurs } from '@/services/mockData';
import { FileText, Truck, Building2, Calendar, Hash, Banknote } from 'lucide-react';

interface FactureDetailsDialogProps {
  facture: Facture | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FactureDetailsDialog({
  facture,
  open,
  onOpenChange,
}: FactureDetailsDialogProps) {
  if (!facture) return null;

  const bonLivraison = mockBonsLivraison.find(bl => bl.id === facture.bon_livraison_id);
  const commande = bonLivraison ? mockCommandes.find(c => c.id === bonLivraison.commande_id) : null;
  const fournisseur = commande ? mockFournisseurs.find(f => f.id === commande.fournisseur_id) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Détails de la facture
          </DialogTitle>
          <DialogDescription>
            FAC-{facture.id.padStart(4, '0')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Statut actuel</span>
            <StatusBadge status={facture.status} />
          </div>

          {/* Main info */}
          <div className="rounded-lg border border-border bg-card p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Banknote className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Montant total</p>
                <p className="text-2xl font-bold">{facture.montant.toLocaleString()} TND</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Date facture</p>
                  <p className="text-sm font-medium">{facture.date_facture}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Hash className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">N° Facture</p>
                  <p className="text-sm font-medium font-mono">FAC-{facture.id.padStart(4, '0')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related documents */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Documents liés</h4>
            
            {bonLivraison && (
              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="rounded-lg bg-info/10 p-2">
                  <Truck className="h-4 w-4 text-info" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Bon de livraison</p>
                  <p className="text-xs text-muted-foreground">
                    BL-{bonLivraison.id.padStart(4, '0')} • {bonLivraison.date_livraison}
                  </p>
                </div>
                <StatusBadge status={bonLivraison.conformite_stock} />
              </div>
            )}

            {fournisseur && (
              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="rounded-lg bg-success/10 p-2">
                  <Building2 className="h-4 w-4 text-success" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{fournisseur.nom}</p>
                  <p className="text-xs text-muted-foreground">{fournisseur.email}</p>
                </div>
                <StatusBadge status={fournisseur.statut === 'actif' ? 'APPROVED' : 'REJECTED'} />
              </div>
            )}
          </div>

          {/* Workflow history */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Historique du workflow</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-success" />
                <span className="text-muted-foreground">Réception</span>
                <span className="text-xs text-muted-foreground ml-auto">{facture.date_facture}</span>
              </div>
              {facture.status !== 'RECEIVED' && (
                <div className="flex items-center gap-2 text-sm">
                  <div className={`h-2 w-2 rounded-full ${facture.status === 'REJECTED' ? 'bg-destructive' : 'bg-success'}`} />
                  <span className="text-muted-foreground">
                    {facture.status === 'REJECTED' ? 'Rejetée' : 'Contrôle conformité'}
                  </span>
                </div>
              )}
              {facture.status === 'VALIDATED' && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span className="text-muted-foreground">Validation comptable</span>
                </div>
              )}
              {facture.status === 'PAID' && (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-success" />
                    <span className="text-muted-foreground">Validation comptable</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-success" />
                    <span className="text-muted-foreground">Paiement effectué</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
