// ERP Data Models

export interface Fournisseur {
  id: string;
  nom: string;
  adresse: string;
  email: string;
  telephone: string;
  statut: 'actif' | 'suspendu';
  documents: string[];
}

export interface DemandeAchat {
  id: string;
  reference: string;
  produit: string;
  quantite: number;
  date_creation: string;
  status: 'CREATED' | 'SENT' | 'APPROVED' | 'REJECTED';
  stock_responsable: string;
  commentaire: string;
}

export interface Devis {
  id: string;
  fournisseur_id: string;
  demande_achat_id: string;
  prix_propose: number;
  delai_livraison: string;
  conditions: string;
  status: 'SENT' | 'RECEIVED' | 'ANALYSED' | 'NEGOTIATED' | 'VALIDATED';
}

export interface Commande {
  id: string;
  devis_id: string;
  fournisseur_id: string;
  date_emission: string;
  status: 'EMITTED' | 'ACCEPTED' | 'REJECTED' | 'IN_DELIVERY';
}

export interface BonLivraison {
  id: string;
  commande_id: string;
  date_livraison: string;
  quantite_livree: number;
  conformite_stock: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export interface Facture {
  id: string;
  bon_livraison_id: string;
  montant: number;
  date_facture: string;
  status: 'RECEIVED' | 'VALIDATED' | 'PAID' | 'REJECTED';
}

export interface StockItem {
  id: string;
  reference: string;
  designation: string;
  quantite: number;
  prix_unitaire: number;
  seuil_alerte: number;
  categorie: string;
  emplacement: string;
}
