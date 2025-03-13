//Classe représentant un type de monstre
class Type{
    /**
     * @param {number} id - L'Id du monstre
     * @param {string} nom - Le nom du type
     */
    constructor(id, nom){
        this.id = id;
        this.nom = nom;
    }

    getId(){
        return this.id;
    }

    getNom(){
        return this.nom;
    }

    setId(){
        this.id = id;
    }

    setNom(){
        this.nom = nom;
    }
}

export default Type;