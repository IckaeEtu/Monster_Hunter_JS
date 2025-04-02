//Classe représentant un set d'amure
class Armure{
    /**
     * @param {number} id - L'ID de l'armure
     * @param {string} nom - Le nom de l'armure
     * @param {number} monstre_id - L'ID du monstre
     * @param {string[]} composants - Les composants de l'armure
     * @param {string} bonus - Les bonus de l'armure
     */
    constructor(id, nom, monstre_id, composants, bonus){
        this.id = id;
        this.nom = nom;
        this.monstre_id = monstre_id;
        this.composants = composants;
        this.bonus = bonus;
    }

    getId(){
        return this.id;
    }

    getNom(){
        return this.nom;
    }

    getMonstreId(){
        return this.monstre_id;
    }

    getComposants(){
        return this.composants;
    }

    getBonus(){
        return this.bonus;
    }

    setId(id){
        this.id = id;
    }

    setNom(nom){
        this.nom = nom;
    }

    setMonstreId(monstre_id){
        this.monstre_id = monstre_id;
    }

    setComposants(composants){
        this.composants = composants;
    }

    setBonus(bonus){
        this.bonus = bonus;
    }
}

export default Armure;