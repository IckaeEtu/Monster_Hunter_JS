// Classe représentant un chasseur
class Chasseur {
    /**
     * Crée une instance de Chasseur.
     *
     * @param {number} id - L'ID du chasseur.
     * @param {string} nom - Le nom du chasseur.
     * @param {number} rangDeChasseur - Le niveau du chasseur.
     * @param {string} specialisation - La spécialisation du chasseur.
     * @param {number} armeEquipee - L'ID de l'arme équipée.
     * @param {number[]} monstresFavoris - Un tableau des IDs des monstres favoris.
     * @param {number} notes - La note du chasseur.
     * @param {number} setArmureEquipee - L'ID du set d'armure équipé.
     */
    constructor(id, nom, rangDeChasseur, specialisation, armeEquipee, monstresFavoris, notes, setArmureEquipee) {
        this.id = id;
        this.nom = nom;
        this.rangDeChasseur = rangDeChasseur;
        this.specialisation = specialisation;
        this.armeEquipee = armeEquipee;
        this.monstresFavoris = monstresFavoris;
        this.notes = notes;
        this.setArmureEquipee = setArmureEquipee;
    }

    getId() {
        return this.id;
    }

    getNom() {
        return this.nom;
    }

    getRang() {
        return this.rangDeChasseur;
    }

    getSpecialisation() {
        return this.specialisation;
    }

    getArmeEquipee() {
        return this.armeEquipee;
    }

    getMonstresFavoris() {
        return this.monstresFavoris;
    }

    getNotes() {
        return this.notes;
    }

    getSetArmureEquipee() {
        return this.setArmureEquipee;
    }
}

export default Chasseur;