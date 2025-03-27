//Classe reprénsentant un monstre
class Monstre {
    /**
     * @param {number} id - L'ID du monstre.
     * @param {string} nom - Le nom du monstre.
     * @param {Type} type - Le type du monstre 
     * @param {Environnement} environnement - L'environnement du monstre 
     * @param {string[]} faiblesses - Liste des faiblesses du monstre 
     * @param {string[]} materiaux - Liste des matériaux que l'on peut obtenir en tuant le monstre
     * @param {number} notes - Note du monstre 
     * @param {string} lienImage - Lien de l'image du monstre
     */
    constructor(id, nom, type, environnement, faiblesses, materiaux, notes, lienImage) {
            this.id = id;
            this.nom = nom;
            this.type = type;
            this.environnement = environnement;
            this.faiblesses = faiblesses;
            this.materiaux = materiaux;
            this.notes = notes;
            this.lienImage = lienImage;
        }
    
    getId(){
        return this.id;
    }

    getNom(){
        return this.nom;
    }

    /**
     * @returns {Type} le type de monstre
     */
    getType(){
        return this.type;
    }

    getEnvironnement(){
        return this.environnement;
    }

    getFaiblesses(){
        return this.faiblesses;
    }
    
    getMateriaux(){
        return this.materiaux;
    }

    getNotes(){
        return this.notes;
    }

    getLienImage() {
        return this.lienImage;
    }

    setLienImage(lienImage) {
        this.lienImage = lienImage;
    }

    setId(id){
        this.id = id;
    }

    setNom(nom){
        this.nom = nom;
    }

    setType(type){
        this.type = type;
    }

    setEnvironnement(environnement){
        this.environnement = environnement;
    }

    setFaiblesses(faiblesses){
        this.faiblesses = faiblesses;
    }

    setMateriaux(materiaux){
        this.materiaux = materiaux;
    }

    setNotes(notes){
        this.notes = notes;
    }
}

export default Monstre;