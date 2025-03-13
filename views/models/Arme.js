//Classe représentant une arme
class Arme{
    /**
     * @param {number} id - L'ID de l'arme
     * @param {string} nom - Le nom de l'arme
     * @param {string} type - Le type de l'arme
     * @param {number} attaque - L'attaque de l'arme
     * @param {string} element - L'élément de l'arme
     */
    constructor(id, nom, type, attaque, element){
        this.id = id;
        this.nom = nom;
        this.type = type;
        this.attaque = attaque;
        this.element = element;
    }

    getId(){
        return this.id;
    }

    getNom(){
        return this.nom;
    }

    getType(){
        return this.type;
    }

    getAttaque(){
        return this.attaque;
    }

    getElement(){
        return this.element;
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

    setAttaque(attaque){
        this.attaque = attaque;
    }

    setElement(element){
        this.element = element;
    }

}

export default Arme;