//Classe reprénsentant un monstre
class Monstre {
    constructor(id, nom, type, environnement, faiblesses, materiaux, notes) {
            this.id = id;
            this.nom = nom;
            this.type = type;
            this.environnement = environnement;
            this.faiblesses = faiblesses;
            this.materiaux = materiaux;
            this.notes = notes;
        }
    
    getId() {
        return this.id;
    }

    getNom() {
        return this.nom;
    }

    getEnvironnement() {
        return this.environnement;
    }
    
}