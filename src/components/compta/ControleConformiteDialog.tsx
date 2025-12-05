import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Facture } from '@/types/erp';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface ControleConformiteDialogProps {
  facture: Facture | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onControle: (factureId: string, isConforme: boolean, commentaire?: string) => void;
}

export function ControleConformiteDialog({
  facture,
  open,
  onOpenChange,
  onControle,
}: ControleConformiteDialogProps) {
  const [checkMontant, setCheckMontant] = useState(false);
  const [checkQuantite, setCheckQuantite] = useState(false);
  const [checkBonLivraison, setCheckBonLivraison] = useState(false);
  const [checkSignature, setCheckSignature] = useState(false);
  const [commentaire, setCommentaire] = useState('');

  const allChecked = checkMontant && checkQuantite && checkBonLivraison && checkSignature;
  const someChecked = checkMontant || checkQuantite || checkBonLivraison || checkSignature;

  const handleValidate = () => {
    if (!facture) return;
    onControle(facture.id, true);
    resetForm();
    onOpenChange(false);
  };

  const handleReject = () => {
    if (!facture) return;
    const motifs: string[] = [];
    if (!checkMontant) motifs.push('Montant non conforme');
    if (!checkQuantite) motifs.push('Quantité incorrecte');
    if (!checkBonLivraison) motifs.push('Bon de livraison non correspondant');
    if (!checkSignature) motifs.push('Signature manquante');
    
    const finalCommentaire = commentaire || motifs.join(', ');
    onControle(facture.id, false, finalCommentaire);
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setCheckMontant(false);
    setCheckQuantite(false);
    setCheckBonLivraison(false);
    setCheckSignature(false);
    setCommentaire('');
  };

  if (!facture) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Contrôle de conformité
          </DialogTitle>
          <DialogDescription>
            Vérification de la facture FAC-{facture.id.padStart(4, '0')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Invoice details */}
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Montant:</span>
                <span className="ml-2 font-semibold">{facture.montant.toLocaleString()} TND</span>
              </div>
              <div>
                <span className="text-muted-foreground">Date:</span>
                <span className="ml-2">{facture.date_facture}</span>
              </div>
              <div>
                <span className="text-muted-foreground">BL associé:</span>
                <span className="ml-2">BL-{facture.bon_livraison_id.padStart(4, '0')}</span>
              </div>
            </div>
          </div>

          {/* Conformity checklist */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Liste de vérification</h4>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="check-montant"
                  checked={checkMontant}
                  onCheckedChange={(checked) => setCheckMontant(checked as boolean)}
                />
                <Label htmlFor="check-montant" className="text-sm cursor-pointer">
                  Le montant correspond au devis validé
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="check-quantite"
                  checked={checkQuantite}
                  onCheckedChange={(checked) => setCheckQuantite(checked as boolean)}
                />
                <Label htmlFor="check-quantite" className="text-sm cursor-pointer">
                  Les quantités facturées correspondent aux quantités livrées
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="check-bl"
                  checked={checkBonLivraison}
                  onCheckedChange={(checked) => setCheckBonLivraison(checked as boolean)}
                />
                <Label htmlFor="check-bl" className="text-sm cursor-pointer">
                  Le bon de livraison est conforme et validé
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="check-signature"
                  checked={checkSignature}
                  onCheckedChange={(checked) => setCheckSignature(checked as boolean)}
                />
                <Label htmlFor="check-signature" className="text-sm cursor-pointer">
                  Toutes les signatures requises sont présentes
                </Label>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <Label htmlFor="commentaire">Commentaire (optionnel)</Label>
            <Textarea
              id="commentaire"
              placeholder="Ajouter un commentaire sur le contrôle..."
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              rows={3}
            />
          </div>

          {/* Status indicator */}
          <div className={`rounded-lg p-3 ${allChecked ? 'bg-success/10 border border-success/30' : 'bg-warning/10 border border-warning/30'}`}>
            <div className="flex items-center gap-2">
              {allChecked ? (
                <>
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm text-success font-medium">Tous les critères sont validés</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="text-sm text-warning font-medium">
                    {someChecked ? 'Contrôle incomplet' : 'Aucun critère validé'}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleReject}
            className="gap-2"
          >
            <XCircle className="h-4 w-4" />
            Rejeter
          </Button>
          <Button
            type="button"
            onClick={handleValidate}
            disabled={!allChecked}
            className="gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            Valider
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
