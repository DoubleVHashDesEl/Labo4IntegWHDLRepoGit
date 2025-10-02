/*
  Fichier : classInfoPizza.js
  Description : Classe InfoPizza pour stocker et valider les informations d'une commande de pizza.
  Créateur : DoubleVHashDesEl
  Date de création : 23 septembre 2025
  Dernière modification : 23 septembre 2025
*/

// classInfoPizza.js
export default class InfoPizza {
  constructor(
    pizzaType = '',
    pizzaQuantity = 0,
    pizzaSize = 'moyenne',
    extras = [],
    address = '',
    codePostal = '',
    nom = '',
    prenom = '',
    telephone = '',
    email = '',
    modePaiement = ''
  ) {
    this.pizzaType = pizzaType;
    this.pizzaQuantity = Number(pizzaQuantity) || 0;
    this.pizzaSize = pizzaSize;              // <- manquait
    this.extras = Array.isArray(extras) ? extras : (extras ? [extras] : []);

    this.address = address;
    this.codePostal = codePostal;
    this.nom = nom;
    this.prenom = prenom;
    this.telephone = telephone;
    this.email = email;
    this.modePaiement = modePaiement;

    this.prixBase = '0.00';
    this.taxe = '0.00';
    this.prixTotal = '0.00';
  }

  pizzaPrixCommande() {
    const PRIX = { 'Hawaienne': 7.00, 'All Dressed': 8.10, 'Silicienne': 6.30 };
    const MULT = { 'petite': 0.8, 'moyenne': 1.0, 'grande': 1.2 };

    const qty = this.pizzaQuantity;
    const baseUnit = (PRIX[this.pizzaType] || 0) * (MULT[this.pizzaSize] || 1);

    // 0,50$ par extra et par pizza
    const extrasCount = this.extras.length;
    const extrasCost = extrasCount * 0.50 * qty;

    const sousTotal = baseUnit * qty + extrasCost;

    const TPS = 0.05;
    const TVQ = 0.09975;
    const taxes = +(sousTotal * (TPS + TVQ)).toFixed(2);
    const total = +(sousTotal + taxes).toFixed(2);

    this.prixBase = sousTotal.toFixed(2);
    this.taxe = taxes.toFixed(2);
    this.prixTotal = total.toFixed(2);
  }
}
