/*
  Fichier : classInfoPizza.js
  Description : Classe InfoPizza pour stocker et valider les informations d'une commande de pizza.
  Créateur : DoubleVHashDesEl
  Date de création : 23 septembre 2025
  Dernière modification : 23 septembre 2025
*/

class InfoPizza {
    constructor(pizzaType, pizzaQuantity, 
        extras, address, codePostal, 
        nom, prenom, telephone, 
        email, modePaiement){

        
        this.pizzaType = pizzaType;
        this.pizzaQuantity = pizzaQuantity;
        this.extras= extras || [];
        this.address = address;
        this.codePostal = codePostal;
        this.nom = nom;
        this.prenom = prenom;
        this.telephone = telephone;
        this.email = email;
        this.modePaiement = modePaiement;
        this.prixbase;
        this.prixTotal;
    }

    pizzaPrixCommande(){
        let prixTemp = 0;
        

        switch(this.pizzaType){
            case "Hawaienne":
                prixTemp = 7;
                break;
            case "All Dressed":
                prixTemp = 8.10;
                break;
            case "Silicienne":
                prixTemp = 6.30;
                break;
            default:
                prixTemp = 0;
        }
        
        switch(this.pizzaSize){
            case "petite":
                prixTemp *= 0.8;
                break;
            case "moyenne":
                prixTemp *= 1;
                break;
            case "grande":
                prixTemp *= 1.2;
                break;
            default:
                prixTemp *= 0.8;
        }
        

        prixTemp *= this.pizzaQuantity;

        let extras = this.extras;
        if (!Array.isArray(extras)) {
            extras = extras ? [extras] : [];
        }
        let nombreExtras = extras.length;
        if(nombreExtras > 0){
            prixTemp += (nombreExtras) * 0.50;
        }

        //taxes
        this.prixBase = prixTemp;
        this.prixTotal = prixTemp;
        this.prixTotal *= 1.14975;

        this.prixTotal = Math.round(this.prixTotal * 100) / 100;
        this.prixBase = Math.round(this.prixBase * 100) / 100;

        
    }
}
export default InfoPizza;