//Classe représentant un environnement
class Environnement{
    /**
     * @param {number} id - L'ID de l'environnement
     * @param {string} nom - Le nom de l'environnement
     * @param {string} zones - Les zones de l'environnement
     * @param {string} habitats - Les habitats de l'environnement
     */
    constructor(id, nom, zones, habitats){
        this.id = id;
        this.nom = nom;
        this.zones = zones;
        this.habitats = habitats;
    }

    getId(){
        return this.id;
    }

    getNom(){
        return this.nom;
    }

    getZones(){
        return this.zones;
    }

    getHabitats(){
        return this.habitats;
    }

    setId(id){
        this.id = id;
    }

    setNom(nom){
        this.nom = nom;
    }

    setZones(zones){
        this.zones = zones;
    }

    setHabitats(habitats){
        this.habitats = habitats;
    }
}

export default Environnement;