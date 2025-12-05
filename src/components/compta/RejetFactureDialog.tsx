import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Facture } from '@/types/erp';
import { XCircle, AlertTriangle } from 'lucide-react';

interface RejetFactureDialogProps {
  facture: Facture | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRejet: (factureId: string, motif: string) => void;
}

const motifsRejet = [
  { value: 'montant', label: 'Montant incorrect' },
  { value: 'quantite', label: 'Quantité non conforme' },
  { value: 'bl', label: 'Bon de livraison non correspondant' },
  { value: 'doublon', label: 'Facture en doublon' },
  { value: 'signature', label: 'Signature manquante ou invalide' },
  { value: 'delai', label: 'Délai de paiement dépassé' },
  { value: 'autre', label: 'Autre motif' },
];

export function RejetFactureDialog({
  facture,
  open,
  onOpenChange,
  onRejet,
}: RejetFactureDialogProps) {
  const [motifType, setMotifType] = useState('');
  const [motifDetails, setMotifDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facture || !motifType) return;
    
    const selectedMotif = motifsRejet.find(m => m.value === motifType);
    const motifFinal = motifDetails 
      ? `${selectedMotif?.label}: ${motifDetails}`
      : selectedMotif?.label || '';
    
    onRejet(facture.id, motifFinal);
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setMotifType('');
    setMotifDetails('');
  };

  if (!facture) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <XCircle className="h-5 w-5" />
              Rejeter la facture
            </DialogTitle>
            <DialogDescription>
              Rejet de la facture FAC-{facture.id.padStart(4, '0')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Invoice details */}
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-destructive">Attention</p>
                  <p className="text-sm text-muted-foreground">
                    Cette action est irréversible. La facture sera marquée comme rejetée 
                    et le fournisseur devra en émettre une nouvelle.
                  </p>
                </div>
              </div>
            </div>

            {/* Invoice summary */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Montant:</span>
                  <span className="ml-2 font-semibold">{facture.montant.toLocaleString()} TND</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <span className="ml-2">{facture.date_facture}</span>
                </div>
              </div>
            </div>

            {/* Rejection reason */}
            <div className="space-y-2">
              <Label htmlFor="motif">Motif du rejet</Label>
              <Select value={motifType} onValueChange={setMotifType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un motif" />
                </SelectTrigger>
                <SelectContent>
                  {motifsRejet.map(motif => (
                    <SelectItem key={motif.value} value={motif.value}>
                      {motif.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <Label htmlFor="details">Détails supplémentaires</Label>
              <Textarea
                id="details"
                placeholder="Expliquez le motif du rejet en détail..."
                value={motifDetails}
                onChange={(e) => setMotifDetails(e.target.value)}
                rows={3}
                required={motifType === 'autre'}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" variant="destructive" disabled={!motifType} className="gap-2">
              <XCircle className="h-4 w-4" />
              Confirmer le rejet
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
