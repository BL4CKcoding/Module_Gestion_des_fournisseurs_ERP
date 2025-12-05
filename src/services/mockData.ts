import { Fournisseur, DemandeAchat, Devis, Commande, BonLivraison, Facture, StockItem } from '@/types/erp';

export const mockFournisseurs: Fournisseur[] = [
  { id: '1', nom: 'Tech Solutions SARL', adresse: '123 Rue Principale, Tunis', email: 'contact@techsolutions.tn', telephone: '+216 71 123 456', statut: 'actif', documents: ['doc1.pdf'] },
  { id: '2', nom: 'Industrial Parts Co', adresse: '45 Zone Industrielle, Sfax', email: 'info@indparts.tn', telephone: '+216 74 987 654', statut: 'actif', documents: [] },
  { id: '3', nom: 'Office Supplies Ltd', adresse: '78 Avenue Bourguiba, Sousse', email: 'sales@officesupplies.tn', telephone: '+216 73 456 789', statut: 'suspendu', documents: ['doc2.pdf', 'doc3.pdf'] },
];

export const mockDemandesAchat: DemandeAchat[] = [
  { id: '1', reference: 'DA-2025-001', produit: 'Ordinateurs portables', quantite: 10, date_creation: '2025-01-15', status: 'APPROVED', stock_responsable: 'Ahmed Ben Ali', commentaire: 'Urgent pour nouveau projet' },
  { id: '2', reference: 'DA-2025-002', produit: 'Fournitures de bureau', quantite: 50, date_creation: '2025-01-18', status: 'SENT', stock_responsable: 'Fatma Trabelsi', commentaire: 'Réapprovisionnement mensuel' },
  { id: '3', reference: 'DA-2025-003', produit: 'Pièces mécaniques', quantite: 25, date_creation: '2025-01-20', status: 'CREATED', stock_responsable: 'Mohamed Karim', commentaire: 'Maintenance préventive' },
];

export const mockDevis: Devis[] = [
  { id: '1', fournisseur_id: '1', demande_achat_id: '1', prix_propose: 15000, delai_livraison: '7 jours', conditions: 'Paiement 30 jours', status: 'VALIDATED' },
  { id: '2', fournisseur_id: '2', demande_achat_id: '2', prix_propose: 2500, delai_livraison: '3 jours', conditions: 'Paiement immédiat', status: 'RECEIVED' },
];

export const mockCommandes: Commande[] = [
  { id: '1', devis_id: '1', fournisseur_id: '1', date_emission: '2025-01-22', status: 'IN_DELIVERY' },
  { id: '2', devis_id: '2', fournisseur_id: '2', date_emission: '2025-01-25', status: 'ACCEPTED' },
];

export const mockBonsLivraison: BonLivraison[] = [
  { id: '1', commande_id: '1', date_livraison: '2025-01-28', quantite_livree: 10, conformite_stock: 'ACCEPTED' },
];

export const mockFactures: Facture[] = [
  { id: '1', bon_livraison_id: '1', montant: 15000, date_facture: '2025-01-29', status: 'RECEIVED' },
  { id: '2', bon_livraison_id: '1', montant: 8500, date_facture: '2025-01-25', status: 'VALIDATED' },
  { id: '3', bon_livraison_id: '1', montant: 22000, date_facture: '2025-01-20', status: 'PAID' },
];

export const mockStock: StockItem[] = [
  { id: '1', reference: 'STK-001', designation: 'Ordinateur portable HP', quantite: 15, prix_unitaire: 1500, seuil_alerte: 5, categorie: 'Informatique', emplacement: 'A-01' },
  { id: '2', reference: 'STK-002', designation: 'Écran 24 pouces', quantite: 8, prix_unitaire: 350, seuil_alerte: 3, categorie: 'Informatique', emplacement: 'A-02' },
  { id: '3', reference: 'STK-003', designation: 'Clavier sans fil', quantite: 25, prix_unitaire: 45, seuil_alerte: 10, categorie: 'Accessoires', emplacement: 'B-01' },
  { id: '4', reference: 'STK-004', designation: 'Souris optique', quantite: 3, prix_unitaire: 25, seuil_alerte: 10, categorie: 'Accessoires', emplacement: 'B-02' },
  { id: '5', reference: 'STK-005', designation: 'Câble HDMI 2m', quantite: 50, prix_unitaire: 15, seuil_alerte: 20, categorie: 'Câblage', emplacement: 'C-01' },
];
