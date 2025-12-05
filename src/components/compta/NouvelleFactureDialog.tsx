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
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { mockBonsLivraison } from '@/services/mockData';

interface NouvelleFactureDialogProps {
  onSubmit: (data: { bon_livraison_id: string; montant: number; date_facture: string }) => void;
}

export function NouvelleFactureDialog({ onSubmit }: NouvelleFactureDialogProps) {
  const [open, setOpen] = useState(false);
  const [bonLivraisonId, setBonLivraisonId] = useState('');
  const [montant, setMontant] = useState('');
  const [dateFacture, setDateFacture] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bonLivraisonId || !montant || !dateFacture) return;
    
    onSubmit({
      bon_livraison_id: bonLivraisonId,
      montant: parseFloat(montant),
      date_facture: dateFacture,
    });
    
    // Reset form
    setBonLivraisonId('');
    setMontant('');
    setDateFacture(new Date().toISOString().split('T')[0]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Réception Facture
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Réception d'une nouvelle facture</DialogTitle>
            <DialogDescription>
              Enregistrer une facture fournisseur
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bon-livraison">Bon de livraison</Label>
              <Select value={bonLivraisonId} onValueChange={setBonLivraisonId}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un bon de livraison" />
                </SelectTrigger>
                <SelectContent>
                  {mockBonsLivraison.map(bl => (
                    <SelectItem key={bl.id} value={bl.id}>
                      BL-{bl.id.padStart(4, '0')} - {bl.date_livraison}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="montant">Montant (TND)</Label>
              <Input
                id="montant"
                type="number"
                step="0.01"
                placeholder="Ex: 15000.00"
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date-facture">Date de la facture</Label>
              <Input
                id="date-facture"
                type="date"
                value={dateFacture}
                onChange={(e) => setDateFacture(e.target.value)}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer la facture</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
