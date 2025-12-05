import { useState } from 'react';
import { Facture } from '@/types/erp';
import { mockFactures as initialFactures, mockBonsLivraison } from '@/services/mockData';
import { toast } from '@/hooks/use-toast';

export function useFactures() {
  const [factures, setFactures] = useState<Facture[]>(initialFactures);

  // 1. Réception Facture - POST /compta/facture
  const receptionFacture = (newFacture: Omit<Facture, 'id' | 'status'>) => {
    const facture: Facture = {
      ...newFacture,
      id: (factures.length + 1).toString(),
      status: 'RECEIVED',
    };
    setFactures(prev => [...prev, facture]);
    toast({
      title: "Facture enregistrée",
      description: `Facture FAC-${facture.id.padStart(4, '0')} reçue avec succès`,
    });
    return facture;
  };

  // 2. Contrôle Conformité - POST /compta/facture/controle
  const controleFacture = (factureId: string, isConforme: boolean, commentaire?: string) => {
    setFactures(prev => prev.map(f => {
      if (f.id === factureId) {
        if (isConforme) {
          toast({
            title: "Contrôle validé",
            description: `Facture FAC-${f.id.padStart(4, '0')} conforme - En attente de validation comptable`,
          });
          return { ...f, status: 'VALIDATED' as const };
        } else {
          toast({
            title: "Facture non conforme",
            description: commentaire || "La facture ne respecte pas les critères de conformité",
            variant: "destructive",
          });
          return { ...f, status: 'REJECTED' as const };
        }
      }
      return f;
    }));
  };

  // 3. Validation Comptable (part of controle flow)
  const validationComptable = (factureId: string) => {
    setFactures(prev => prev.map(f => {
      if (f.id === factureId && f.status === 'RECEIVED') {
        toast({
          title: "Validation comptable",
          description: `Facture FAC-${f.id.padStart(4, '0')} validée par la comptabilité`,
        });
        return { ...f, status: 'VALIDATED' as const };
      }
      return f;
    }));
  };

  // 4. Paiement - POST /compta/facture/paiement
  const paiementFacture = (factureId: string, modePaiement: string, reference?: string) => {
    setFactures(prev => prev.map(f => {
      if (f.id === factureId && f.status === 'VALIDATED') {
        toast({
          title: "Paiement effectué",
          description: `Facture FAC-${f.id.padStart(4, '0')} payée via ${modePaiement}`,
        });
        return { ...f, status: 'PAID' as const };
      }
      return f;
    }));
  };

  // 5. Rejet Facture - POST /compta/facture/rejet
  const rejetFacture = (factureId: string, motif: string) => {
    setFactures(prev => prev.map(f => {
      if (f.id === factureId) {
        toast({
          title: "Facture rejetée",
          description: `Facture FAC-${f.id.padStart(4, '0')} rejetée: ${motif}`,
          variant: "destructive",
        });
        return { ...f, status: 'REJECTED' as const };
      }
      return f;
    }));
  };

  // Get related bon de livraison
  const getBonLivraison = (bonLivraisonId: string) => {
    return mockBonsLivraison.find(bl => bl.id === bonLivraisonId);
  };

  // Stats
  const stats = {
    received: factures.filter(f => f.status === 'RECEIVED').length,
    validated: factures.filter(f => f.status === 'VALIDATED').length,
    paid: factures.filter(f => f.status === 'PAID').length,
    rejected: factures.filter(f => f.status === 'REJECTED').length,
    totalAmount: factures.reduce((acc, f) => acc + f.montant, 0),
    pendingAmount: factures.filter(f => f.status === 'VALIDATED').reduce((acc, f) => acc + f.montant, 0),
  };

  return {
    factures,
    stats,
    receptionFacture,
    controleFacture,
    validationComptable,
    paiementFacture,
    rejetFacture,
    getBonLivraison,
  };
}
