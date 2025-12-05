import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { CreditCard, Building2, Banknote, CheckCircle } from 'lucide-react';

interface PaiementDialogProps {
  facture: Facture | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaiement: (factureId: string, modePaiement: string, reference?: string) => void;
}

const modesPaiement = [
  { value: 'virement', label: 'Virement bancaire', icon: Building2 },
  { value: 'cheque', label: 'Chèque', icon: Banknote },
  { value: 'carte', label: 'Carte bancaire', icon: CreditCard },
  { value: 'especes', label: 'Espèces', icon: Banknote },
];

export function PaiementDialog({
  facture,
  open,
  onOpenChange,
  onPaiement,
}: PaiementDialogProps) {
  const [modePaiement, setModePaiement] = useState('');
  const [reference, setReference] = useState('');
  const [datePaiement, setDatePaiement] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facture || !modePaiement) return;
    
    onPaiement(facture.id, modePaiement, reference);
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setModePaiement('');
    setReference('');
    setDatePaiement(new Date().toISOString().split('T')[0]);
  };

  if (!facture) return null;

  const selectedMode = modesPaiement.find(m => m.value === modePaiement);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Enregistrer le paiement
            </DialogTitle>
            <DialogDescription>
              Paiement de la facture FAC-{facture.id.padStart(4, '0')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Invoice summary */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Montant à payer</span>
                <span className="text-2xl font-bold text-primary">
                  {facture.montant.toLocaleString()} TND
                </span>
              </div>
            </div>

            {/* Payment mode */}
            <div className="space-y-2">
              <Label htmlFor="mode-paiement">Mode de paiement</Label>
              <Select value={modePaiement} onValueChange={setModePaiement} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un mode de paiement" />
                </SelectTrigger>
                <SelectContent>
                  {modesPaiement.map(mode => (
                    <SelectItem key={mode.value} value={mode.value}>
                      <div className="flex items-center gap-2">
                        <mode.icon className="h-4 w-4" />
                        {mode.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reference */}
            <div className="space-y-2">
              <Label htmlFor="reference">
                {modePaiement === 'virement' && 'Numéro de virement'}
                {modePaiement === 'cheque' && 'Numéro de chèque'}
                {modePaiement === 'carte' && 'Référence transaction'}
                {modePaiement === 'especes' && 'Référence reçu'}
                {!modePaiement && 'Référence'}
              </Label>
              <Input
                id="reference"
                placeholder="Ex: VIR-2025-001"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </div>

            {/* Payment date */}
            <div className="space-y-2">
              <Label htmlFor="date-paiement">Date du paiement</Label>
              <Input
                id="date-paiement"
                type="date"
                value={datePaiement}
                onChange={(e) => setDatePaiement(e.target.value)}
                required
              />
            </div>

            {/* Confirmation */}
            {modePaiement && (
              <div className="rounded-lg bg-success/10 border border-success/30 p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm text-success font-medium">
                    Paiement par {selectedMode?.label.toLowerCase()}
                  </span>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={!modePaiement} className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Confirmer le paiement
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
