class InfoPizza {
    constructor(pizzaType, pizzaQuantity, 
        ingredientsExtra, address, codePostal, 
        nom, prenom, telephone, 
        courriel, modePaiement){

        
        this.pizzaType = pizzaType;
        this.pizzaQuantity = pizzaQuantity;
        this.ingredientsExtra = ingredientsExtra || [];
        this.address = address;
        this.codePostal = codePostal;
        this.nom = nom;
        this.prenom = prenom;
        this.telephone = telephone;
        this.courriel = courriel;
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
        console.log(this.pizzaSize);
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

        let extras = this.ingredientsExtra;
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

/*
    InfoPizzaVerification(){

        let returnString = "";
        let statusErreur = false;

        if(this.pizzaType == "" || this.pizzaQuantity == "" || this.address == "" || this.codePostal == "" || this.nom == "" || this.prenom == "" || this.telephone == "" || this.courriel == "" || this.modePaiement == ""){
            return ("Veuillez remplir tous les champs.\n");
        }

        const telephoneRegex = /^\d{3}-\d{3}-\d{4}$/;

        if(!telephoneRegex.test(this.telephone.trim())){
            returnString += "Le numéro de téléphone doit être au format 123-456-7890.\n";
            statusErreur = true;
        }
        
        const codePostalRegex = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;

        if(!codePostalRegex.test(this.codePostal.trim())){
            returnString += "Le code postal doit être au format A1A 1A1.";
            statusErreur = true;
        }



        if(statusErreur){
            return returnString;
        }
        return true;

    }*/
}
export default InfoPizza;